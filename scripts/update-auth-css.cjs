/* global __dirname */
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../app/globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Find the auth section start and end markers
const authStart = css.indexOf('/* ==========================================================================\n   Masewera265 device-local dashboard access demonstration');
const authEnd = css.indexOf('\n/* Authenticated User Card in Sidebar */');

if (authStart === -1 || authEnd === -1) {
  console.error('Could not find auth section markers. start:', authStart, 'end:', authEnd);
  process.exit(1);
}

const newAuthCSS = `/* ==========================================================================
   Masewera265 device-local dashboard access demonstration
   ========================================================================== */
.auth-portal-shell {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  background: radial-gradient(circle at 50% 12%, #18283e 0%, #070c14 90%);
  position: relative;
  overflow: hidden;
}
.auth-ambient-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
}
.auth-glow-1 {
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 720px;
  height: 520px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(245, 158, 11, 0.07) 45%, transparent 70%);
  filter: blur(50px);
}
.auth-glow-2 {
  bottom: -150px;
  right: 15%;
  width: 550px;
  height: 450px;
  background: radial-gradient(circle, rgba(239, 35, 60, 0.08) 0%, transparent 65%);
  filter: blur(60px);
}
.auth-portal-card {
  width: min(560px, 100%);
  background: rgba(13, 20, 32, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 38px 32px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  color: white;
  position: relative;
  z-index: 2;
}
.auth-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  margin-bottom: 22px;
}
.auth-brand-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease;
}
.auth-brand-badge:hover {
  transform: translateY(-2px);
}
.auth-crest-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(16, 185, 129, 0.2) 100%);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45), 0 0 25px rgba(245, 158, 11, 0.15);
}
.auth-brand-text-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.auth-brand-name {
  font-family: var(--font-display);
  font-size: 27px;
  letter-spacing: 0.05em;
  font-weight: 800;
  line-height: 1;
}
.auth-brand-name strong {
  color: var(--amber);
}
.auth-brand-tagline {
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  font-weight: 600;
}
.auth-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #34d399;
  font-size: 10px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.auth-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 6px #10b981; opacity: 1; }
  50% { box-shadow: 0 0 14px #10b981; opacity: 0.8; }
}
.auth-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 12px;
  margin-bottom: 18px;
}
.auth-alert.error {
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.45);
  color: #fca5a5;
  align-items: center;
}
.auth-alert.success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.45);
  color: #6ee7b7;
  align-items: center;
}
.auth-alert.demo-boundary {
  background: rgba(245, 158, 11, 0.09);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 10px;
  padding: 13px 16px;
  margin-bottom: 20px;
  color: #fde68a;
}
.auth-alert-icon-wrap {
  color: var(--amber);
  margin-top: 1px;
  flex-shrink: 0;
}
.auth-alert-content strong {
  display: block;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fbbf24;
  margin-bottom: 3px;
}
.auth-alert-content p {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #fde68a;
}
.auth-tab-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #090f1a;
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 20px;
  gap: 6px;
}
.auth-tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 7px;
  background: transparent;
  border: 0;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
}
.auth-tab-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.04);
}
.auth-tab-btn.active {
  background: linear-gradient(135deg, #0d9488 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
}
.saved-accounts-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 18px;
}
.saved-accounts-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}
.accent-icon { color: var(--amber); }
.saved-accounts-title {
  font-size: 11px;
  color: #cbd5e1;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.saved-accounts-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.saved-account-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.16s ease;
  text-align: left;
  width: 100%;
}
.saved-account-chip:hover {
  background: rgba(16, 185, 129, 0.18);
  border-color: #10b981;
}
.chip-arrow {
  color: #94a3b8;
  transition: transform 0.15s;
}
.saved-account-chip:hover .chip-arrow {
  color: white;
  transform: translateX(2px);
}
.preset-roles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.preset-role-card {
  background: rgba(20, 32, 50, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 9px 11px;
  text-align: left;
  cursor: pointer;
  transition: all 0.16s ease;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.preset-role-card:hover {
  background: rgba(16, 185, 129, 0.16);
  border-color: rgba(16, 185, 129, 0.45);
  transform: translateY(-1px);
}
.preset-role-badge {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--amber);
}
.preset-role-name {
  font-size: 12px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.preset-role-org {
  font-size: 10px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.acc-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488, #059669);
  color: white;
  font-size: 11px;
  font-weight: 800;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.acc-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.acc-info strong { font-size: 12.5px; }
.acc-info small { font-size: 10px; color: #94a3b8; }
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 11px;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}
.input-with-icon .input-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  pointer-events: none;
  transition: color 0.18s;
}
.input-with-icon input,
.auth-select {
  width: 100%;
  height: 48px;
  background: #09101d;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: white;
  padding: 0 14px 0 44px;
  font-size: 14px;
  outline: none;
  transition: all 0.18s ease;
}
.auth-select { padding-left: 14px; }
.input-with-icon input:focus,
.auth-select:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.22), 0 0 16px rgba(16, 185, 129, 0.12);
  background: #0e1728;
}
.input-with-icon:focus-within .input-icon { color: #34d399; }
.field-hint {
  font-size: 10.5px;
  color: #8392a5;
  margin-top: 2px;
}
.channel-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.channel-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #09101d;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 11px;
  border-radius: 8px;
  color: #cbd5e1;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.16s ease;
}
.channel-pill input { display: none; }
.channel-pill:hover { border-color: rgba(255, 255, 255, 0.2); }
.channel-pill.active {
  background: rgba(16, 185, 129, 0.16);
  border-color: #10b981;
  color: white;
  font-weight: 700;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.12);
}
.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.selected-role-desc {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 11.5px;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.04);
  padding: 9px 12px;
  border-radius: 6px;
  border-left: 3px solid var(--amber);
  margin-top: 4px;
  line-height: 1.4;
}
.role-desc-icon { color: var(--amber); margin-top: 2px; flex-shrink: 0; }
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 11.5px;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1.45;
  margin-top: 4px;
}
.checkbox-label input {
  margin-top: 2px;
  accent-color: #10b981;
  width: 15px;
  height: 15px;
}
.auth-submit-btn {
  height: 50px;
  background: linear-gradient(135deg, #059669 0%, #047857 50%, #0f766e 100%);
  color: white;
  border: 0;
  border-radius: 8px;
  font-size: 14.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  transition: all 0.18s ease;
  width: 100%;
  margin-top: 8px;
  box-shadow: 0 4px 16px rgba(5, 150, 105, 0.35);
  letter-spacing: 0.02em;
}
.auth-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(5, 150, 105, 0.45);
  filter: brightness(1.06);
}
.auth-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
/* OTP Step Styling */
.otp-step-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.otp-instruction {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.otp-icon-bubble {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.45);
  color: #34d399;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}
.otp-instruction h3 {
  font-family: var(--font-display);
  font-size: 24px;
  text-transform: uppercase;
  margin: 0 0 6px;
  color: white;
}
.otp-instruction p {
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
}
.otp-instruction strong { color: white; }
.demo-otp-banner {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 10px;
  padding: 13px 15px;
  color: #fef08a;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.demo-otp-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--amber);
}
.demo-otp-banner p {
  margin: 0;
  font-size: 11.5px;
  color: #fde68a;
}
.otp-code-highlight {
  background: #09101d;
  color: var(--amber);
  padding: 3px 9px;
  border-radius: 5px;
  font-weight: 800;
  font-size: 13.5px;
  letter-spacing: 0.1em;
  border: 1px solid rgba(244, 185, 66, 0.35);
  box-shadow: 0 0 10px rgba(244, 185, 66, 0.12);
}
.auto-fill-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--amber);
  color: var(--navy);
  border: 0;
  font-size: 11px;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.15s ease;
}
.auto-fill-btn:hover {
  background: #f59e0b;
  transform: translateY(-1px);
}
.otp-inputs-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 8px 0;
}
.otp-digit-box {
  width: 54px;
  height: 60px;
  background: #09101d;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: white;
  font-family: var(--font-display);
  font-size: 28px;
  text-align: center;
  outline: none;
  transition: all 0.18s;
}
.otp-digit-box:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.28), 0 0 18px rgba(16, 185, 129, 0.18);
  background: #0e172a;
}
.otp-digit-box.filled {
  border-color: rgba(16, 185, 129, 0.65);
  background: #0d1b2f;
}
.otp-footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.resend-countdown { color: #8899ac; }
.resend-countdown strong { color: white; }
.resend-btn,
.back-step-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 0;
  color: #34d399;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 4px;
  transition: color 0.15s;
}
.back-step-btn { color: #94a3b8; }
.back-step-btn:hover { color: white; }
.resend-btn:hover { color: #6ee7b7; }
.auth-footer-meta {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.security-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;
}
.auth-back-home {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  transition: color 0.15s;
  text-decoration: none;
}
.auth-back-home:hover { color: var(--amber); }
`;

// Replace the old section with the new CSS
css = css.slice(0, authStart) + newAuthCSS + css.slice(authEnd);
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Auth CSS section replaced successfully!');
