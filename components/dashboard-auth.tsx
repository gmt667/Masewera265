"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/src/platform/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  Copy,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { MaseweraCrest } from "./masewera-logo";

export type Role =
  | "supporter"
  | "athlete"
  | "manager"
  | "organizer"
  | "reporter"
  | "editor"
  | "administrator";

export interface AuthUser {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  role: Role;
  organization?: string;
  demoStartedAt: string;
  demoChannel: "sms" | "whatsapp";
}

const ROLE_OPTIONS: { id: Role; label: string; desc: string; badge: string; color: string }[] = [
  {
    id: "supporter",
    label: "Supporter / Fan",
    desc: "Follow clubs, personalized fixtures, Flames & Scorchers updates",
    badge: "Demo",
    color: "#10b981",
  },
  {
    id: "athlete",
    label: "Athlete / Player",
    desc: "Preview profile, affiliation and performance-request interfaces",
    badge: "Demo",
    color: "#3b82f6",
  },
  {
    id: "manager",
    label: "Club & Team Manager",
    desc: "Official squad lists, match lineups & club transfer submissions",
    badge: "Demo",
    color: "#f59e0b",
  },
  {
    id: "organizer",
    label: "Association / Organizer",
    desc: "Tournament editions, season scheduling & venue allocations",
    badge: "Demo",
    color: "#8b5cf6",
  },
  {
    id: "reporter",
    label: "Sports Reporter",
    desc: "Field assignments, real-time match events & press notes",
    badge: "Demo",
    color: "#06b6d4",
  },
  {
    id: "editor",
    label: "Editor & Verifier",
    desc: "Result audit queues, evidence verification & archive governance",
    badge: "Demo",
    color: "#ec4899",
  },
  {
    id: "administrator",
    label: "System Administrator",
    desc: "Entity hierarchy, user governance, API feeds & security audit",
    badge: "Demo",
    color: "#ef4444",
  },
];

const PRESET_DEMO_ACCOUNTS = [
  {
    fullName: "Chimwemwe Phiri",
    identifier: "+265 991 265 001",
    role: "supporter" as Role,
    roleName: "Supporter",
    org: "Nyasa Big Bullets Fan",
  },
  {
    fullName: "Tamika Gondwe",
    identifier: "+265 888 265 002",
    role: "manager" as Role,
    roleName: "Team Manager",
    org: "Silver Strikers FC",
  },
  {
    fullName: "Blessings Banda",
    identifier: "+265 992 265 003",
    role: "reporter" as Role,
    roleName: "Sports Reporter",
    org: "Malawi Sports Press",
  },
  {
    fullName: "Tionge Kaunda",
    identifier: "+265 995 265 004",
    role: "editor" as Role,
    roleName: "Editor & Verifier",
    org: "Masewera Editorial Bureau",
  },
];

const DEMO_OTP = "265265";
const AUTH_STORAGE_KEY = "m265-demo-profile";
const ACCOUNTS_STORAGE_KEY = "m265-demo-profiles";

export function getStoredDemoProfile(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearDemoProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

interface DashboardAuthProps {
  onDemoStarted: (user: AuthUser) => void;
  defaultRole?: Role;
}

export function DashboardAuth({ onDemoStarted, defaultRole = "supporter" }: DashboardAuthProps) {
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [step, setStep] = useState<"details" | "otp">("details");

  // Registration state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(defaultRole);
  const [organization, setOrganization] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Sign In state
  const [signInIdentifier, setSignInIdentifier] = useState("");
  const [otpChannel, setOtpChannel] = useState<"sms" | "whatsapp">("sms");

  // OTP Verification state
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [targetDisplay, setTargetDisplay] = useState("");

  const digitRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Load saved accounts for quick sign in
  const [savedAccounts, setSavedAccounts] = useState<AuthUser[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (raw) {
        setSavedAccounts(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  // OTP Countdown timer
  useEffect(() => {
    if (step !== "otp") return;
    setCountdown(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  // Clean phone input formatting for Malawi numbers
  const formatMalawiPhone = (val: string) => {
    return val.replace(/[^\d+ ]/g, "");
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    let target = "";
    if (tab === "signin") {
      if (!signInIdentifier.trim()) {
        setErrorMsg("Please enter your registered phone number or email.");
        return;
      }
      target = signInIdentifier.trim();
    } else {
      if (!fullName.trim()) {
        setErrorMsg("Please provide your full name.");
        return;
      }
      if (!phone.trim()) {
        setErrorMsg("Please provide a sample mobile phone number for the demonstration.");
        return;
      }
      if (!agreeTerms) {
        setErrorMsg("Please acknowledge that this is a device-local demonstration.");
        return;
      }
      target = phone.trim();
    }

    setTargetDisplay(target);
    setStep("otp");
    setOtpDigits(["", "", "", "", "", ""]);
    setTimeout(() => {
      digitRefs.current[0]?.focus();
    }, 150);
  };

  const handleQuickSignIn = (acc: { fullName: string; identifier?: string; phone?: string; email?: string; role: Role; organization?: string }) => {
    const idVal = acc.identifier || acc.phone || acc.email || acc.fullName;
    setSignInIdentifier(idVal);
    setTargetDisplay(idVal);
    setRole(acc.role);
    setFullName(acc.fullName);
    setOrganization(acc.organization || "");
    setStep("otp");
    setOtpDigits(["", "", "", "", "", ""]);
    setTimeout(() => {
      digitRefs.current[0]?.focus();
    }, 150);
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    setErrorMsg("");
    const cleaned = value.replace(/\D/g, "");

    // Handling paste of full 6-digit code
    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 6).split("");
      const nextDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        nextDigits[i] = pasted[i] || "";
      }
      setOtpDigits(nextDigits);
      const lastIndex = Math.min(pasted.length, 5);
      digitRefs.current[lastIndex]?.focus();
      if (nextDigits.every((d) => d !== "")) {
        verifyCode(nextDigits.join(""));
      }
      return;
    }

    const nextDigits = [...otpDigits];
    nextDigits[index] = cleaned;
    setOtpDigits(nextDigits);

    if (cleaned && index < 5) {
      digitRefs.current[index + 1]?.focus();
    }

    if (nextDigits.every((d) => d !== "")) {
      verifyCode(nextDigits.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      digitRefs.current[index - 1]?.focus();
    }
  };

  const autoFillDemoOtp = () => {
    const digits = DEMO_OTP.split("");
    setOtpDigits(digits);
    verifyCode(DEMO_OTP);
  };

  const verifyCode = (code: string) => {
    setIsVerifying(true);
    setErrorMsg("");

    setTimeout(() => {
      if (code === DEMO_OTP) {
        setSuccessMsg("Demo code accepted. Opening the local workspace preview...");

        // Construct a device-local demo profile. This is not an authenticated identity.
        const user: AuthUser = {
          id: `usr_${Date.now().toString(36)}`,
          fullName: tab === "register" ? fullName : (savedAccounts.find(a => a.phone === signInIdentifier || a.email === signInIdentifier)?.fullName || fullName || "Demo User"),
          phone: tab === "register" ? phone : (signInIdentifier.includes("@") ? "+265 991 265 000" : signInIdentifier),
          email: tab === "register" ? email : (signInIdentifier.includes("@") ? signInIdentifier : undefined),
          role: role,
          organization: organization || (tab === "register" ? undefined : "Malawi Sports Network"),
          demoStartedAt: new Date().toISOString(),
          demoChannel: otpChannel,
        };

        // Persist session
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem("m265-demo-role", user.role);

        // Update saved accounts list
        try {
          const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
          const current: AuthUser[] = raw ? JSON.parse(raw) : [];
          const filtered = current.filter((a) => a.phone !== user.phone && a.email !== user.email);
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([user, ...filtered].slice(0, 5)));
        } catch {
          // ignore
        }

        setTimeout(() => {
          setIsVerifying(false);
          onDemoStarted(user);
        }, 600);
      } else {
        setIsVerifying(false);
        setErrorMsg("That code does not match the published demonstration code 265265.");
      }
    }, 450);
  };

  return (
    <div className="auth-portal-shell">
      {/* Background ambient lighting */}
      <div className="auth-ambient-glow auth-glow-1" aria-hidden="true" />
      <div className="auth-ambient-glow auth-glow-2" aria-hidden="true" />

      <div className="auth-portal-card">
        {/* Header / Brand with New High-Res Logo */}
        <header className="auth-header">
          <Link href="/" className="auth-brand-badge" aria-label="Return to Masewera265 Home">
            <div className="auth-crest-container">
              <MaseweraCrest size={56} />
            </div>
            <div className="auth-brand-text-block">
              <span className="auth-brand-name">
                MASEWERA<strong>265</strong>
              </span>
              <span className="auth-brand-tagline">Malawi&apos;s Digital Home for Sport</span>
            </div>
          </Link>

          <div className="auth-badge-pill" role="status">
            <span className="auth-pulse-dot" aria-hidden="true" />
            <Sparkles size={13} className="text-amber-400" />
            <span>Device-local access demonstration</span>
          </div>
        </header>

        {/* Security & Access Boundary Note */}
        <div className="auth-alert demo-boundary" role="note">
          <div className="auth-alert-icon-wrap">
            <ShieldAlert size={18} />
          </div>
          <div className="auth-alert-content">
            <strong>Access Preview Boundary</strong>
            <p>
              This preview creates no account, sends no code, verifies no identity and grants no protected access. Use sample information only.
            </p>
          </div>
        </div>

        {/* Global Error / Success Notices */}
        {errorMsg && (
          <div className="auth-alert error" role="alert">
            <AlertCircle size={17} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="auth-alert success" role="status">
            <CheckCircle2 size={17} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* STEP 1: ENTER DETAILS */}
        {step === "details" && (
          <>
            {/* Tabs */}
            <div className="auth-tab-switch" role="tablist" aria-label="Sign in mode">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "signin"}
                className={`auth-tab-btn ${tab === "signin" ? "active" : ""}`}
                onClick={() => {
                  setTab("signin");
                  setErrorMsg("");
                }}
              >
                <KeyRound size={15} />
                <span>Preview sign-in</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "register"}
                className={`auth-tab-btn ${tab === "register" ? "active" : ""}`}
                onClick={() => {
                  setTab("register");
                  setErrorMsg("");
                }}
              >
                <User size={15} />
                <span>Create demo profile</span>
              </button>
            </div>

            {/* Quick-Access Demo Profiles Selector */}
            {tab === "signin" && (
              <div className="saved-accounts-box">
                <div className="saved-accounts-header">
                  <Zap size={14} className="accent-icon" />
                  <span className="saved-accounts-title">Quick demo roles &amp; saved profiles:</span>
                </div>
                <div className="saved-accounts-list">
                  {/* Previous local sessions if any */}
                  {savedAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      className="saved-account-chip"
                      onClick={() => handleQuickSignIn(acc)}
                    >
                      <span className="acc-avatar">{acc.fullName.slice(0, 2).toUpperCase()}</span>
                      <div className="acc-info">
                        <strong>{acc.fullName}</strong>
                        <small>{acc.role.toUpperCase()} • {acc.phone || acc.email}</small>
                      </div>
                      <ArrowRight size={14} className="chip-arrow" />
                    </button>
                  ))}

                  {/* Preset quick test accounts if none or fewer */}
                  {savedAccounts.length === 0 && (
                    <div className="preset-roles-grid">
                      {PRESET_DEMO_ACCOUNTS.map((p) => (
                        <button
                          key={p.role}
                          type="button"
                          className="preset-role-card"
                          onClick={() => handleQuickSignIn({
                            fullName: p.fullName,
                            identifier: p.identifier,
                            role: p.role,
                            organization: p.org,
                          })}
                        >
                          <span className="preset-role-badge">{p.roleName}</span>
                          <strong className="preset-role-name">{p.fullName}</strong>
                          <small className="preset-role-org">{p.org}</small>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SIGN IN FORM */}
            {tab === "signin" && (
              <form onSubmit={handleRequestOtp} className="auth-form">
                <div className="form-group">
                  <label htmlFor="signin-id">
                    Sample phone or email
                  </label>
                  <div className="input-with-icon">
                    <Smartphone size={18} className="input-icon" />
                    <input
                      id="signin-id"
                      type="text"
                      placeholder="e.g. +265 991 234 567 or supporter@masewera.mw"
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      required
                      autoComplete="username"
                    />
                  </div>
                  <small className="field-hint">
                    Demonstration only. Do not enter real personal or account information.
                  </small>
                </div>

                <div className="form-group">
                  <label id="delivery-label">Preview delivery channel</label>
                  <div className="channel-selector" role="radiogroup" aria-labelledby="delivery-label">
                    <label className={`channel-pill ${otpChannel === "sms" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="channel"
                        value="sms"
                        checked={otpChannel === "sms"}
                        onChange={() => setOtpChannel("sms")}
                      />
                      <Smartphone size={15} />
                      <span>SMS preview</span>
                    </label>
                    <label className={`channel-pill ${otpChannel === "whatsapp" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="channel"
                        value="whatsapp"
                        checked={otpChannel === "whatsapp"}
                        onChange={() => setOtpChannel("whatsapp")}
                      />
                      <span>WhatsApp preview</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                  <span>Continue to demo code</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === "register" && (
              <form onSubmit={handleRequestOtp} className="auth-form">
                <div className="form-group">
                  <label htmlFor="reg-name">Full Name *</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="e.g. Christopher Ngoma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="reg-phone">Sample phone number *</label>
                    <div className="input-with-icon">
                      <Smartphone size={18} className="input-icon" />
                      <input
                        id="reg-phone"
                        type="tel"
                        placeholder="+265 991 234 567"
                        value={phone}
                        onChange={(e) => setPhone(formatMalawiPhone(e.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-email">Sample email (optional)</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
                      <input
                        id="reg-email"
                        type="email"
                        placeholder="user@organization.mw"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-role">Platform Role *</label>
                  <select
                    id="reg-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="auth-select"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} ({r.badge})
                      </option>
                    ))}
                  </select>
                  <div className="selected-role-desc">
                    <ShieldCheck size={14} className="role-desc-icon" />
                    <span>{ROLE_OPTIONS.find((r) => r.id === role)?.desc}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-org">
                    Club / Association / Media Affiliation
                  </label>
                  <div className="input-with-icon">
                    <Building size={18} className="input-icon" />
                    <input
                      id="reg-org"
                      type="text"
                      placeholder="e.g. Silver Strikers FC / FAM / Zodiak"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    I understand this is a browser-only demonstration, does not verify my identity, and should not contain real personal information.
                  </span>
                </label>

                <button type="submit" className="auth-submit-btn">
                  <span>Create demo profile</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}
          </>
        )}

        {/* STEP 2: ENTER OTP CODE */}
        {step === "otp" && (
          <div className="otp-step-wrap">
            <div className="otp-instruction">
              <div className="otp-icon-bubble">
                <KeyRound size={26} />
              </div>
              <h3>Enter the demonstration code</h3>
              <p>
                No message was sent. The identifier <strong>{targetDisplay}</strong> is used only for this local preview.
              </p>
            </div>

            {/* Sandbox Demo helper card */}
            <div className="demo-otp-banner">
              <div className="demo-otp-header">
                <Sparkles size={16} />
                <strong>Published demonstration code</strong>
              </div>
              <p>
                This fixed code does not authenticate or verify anyone:{" "}
                <kbd className="otp-code-highlight">{DEMO_OTP}</kbd>
              </p>
              <button
                type="button"
                className="auto-fill-btn"
                onClick={autoFillDemoOtp}
              >
                <Copy size={13} />
                <span>Auto-fill Code ({DEMO_OTP})</span>
              </button>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="otp-inputs-row">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    digitRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={`otp-digit-box ${digit ? "filled" : ""}`}
                  aria-label={`Digit ${idx + 1}`}
                />
              ))}
            </div>

            {/* Action Button */}
            <button
              type="button"
              className="auth-submit-btn"
              disabled={isVerifying || otpDigits.some((d) => d === "")}
              onClick={() => verifyCode(otpDigits.join(""))}
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={17} className="spin-icon" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <Check size={17} />
                  <span>Enter workspace preview</span>
                </>
              )}
            </button>

            {/* Timer & Resend */}
            <div className="otp-footer-actions">
              {canResend ? (
                <button
                  type="button"
                  className="resend-btn"
                  onClick={() => {
                    setCountdown(60);
                    setCanResend(false);
                    setErrorMsg("");
                    setSuccessMsg("Demo timer restarted. No message was sent.");
                  }}
                >
                  <RefreshCw size={13} /> Restart demo timer
                </button>
              ) : (
                <span className="resend-countdown">
                  Resend code in <strong>0:{countdown < 10 ? `0${countdown}` : countdown}</strong>
                </span>
              )}

              <button
                type="button"
                className="back-step-btn"
                onClick={() => {
                  setStep("details");
                  setErrorMsg("");
                }}
              >
                <ArrowLeft size={13} /> Change sample identifier
              </button>
            </div>
          </div>
        )}

        {/* Demo boundary & return to public site */}
        <footer className="auth-footer-meta">
          <div className="security-tag">
            <Lock size={12} />
            <span>No authentication, message delivery, encryption gateway or protected session is connected.</span>
          </div>
          <Link href="/" className="auth-back-home">
            &larr; Return to Masewera265 Public Website
          </Link>
        </footer>
      </div>
    </div>
  );
}
