import Link from "@/src/platform/link";

interface MaseweraLogoProps {
  className?: string;
  crestSize?: number;
  showText?: boolean;
  linkToHome?: boolean;
}

export function MaseweraCrest({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`brand-crest ${className}`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
      }}
      aria-hidden="true"
    >
      <img
        src="/images/masewera265-logo.png"
        alt="Masewera265 Crest"
        width={size}
        height={size}
        className="brand-crest-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45))",
          borderRadius: "8px",
        }}
        loading="eager"
      />
    </div>
  );
}

export function MaseweraLogo({
  className = "",
  crestSize = 36,
  showText = true,
  linkToHome = true,
}: MaseweraLogoProps) {
  const content = (
    <div className={`brand-logo-wrap ${className}`}>
      <MaseweraCrest size={crestSize} />
      {showText && (
        <div className="brand-text">
          <span className="brand-title">
            <b>MASEWERA</b>
            <strong className="brand-code">265</strong>
          </span>
          <small className="brand-sub">MALAWI&apos;S DIGITAL HOME FOR SPORT</small>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="brand" aria-label="Masewera265 home">
        {content}
      </Link>
    );
  }

  return content;
}
