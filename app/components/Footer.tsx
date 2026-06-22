import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "clamp(40px,6vh,64px) clamp(20px,5vw,72px)",
      }}
    >
      <div
        className="mx-auto flex flex-wrap items-center justify-between"
        style={{ maxWidth: 1180, gap: 24 }}
      >
        <div className="flex items-center gap-[11px]">
          <Image
            src="/assets/chanium-icon.png"
            alt="Chanium"
            width={23}
            height={23}
            style={{ height: 23, width: "auto" }}
          />
          <Image
            src="/assets/chanium-wordmark.png"
            alt="CHANIUM"
            width={80}
            height={12}
            style={{ height: 12, width: "auto", opacity: 0.92, marginTop: 1 }}
          />
        </div>
        <span style={{ fontSize: 12, letterSpacing: "1px", color: "#555" }}>
          Chanium LLC
        </span>
        <a
          href="mailto:hello@chanium.com"
          data-cursor="email"
          className="no-underline"
          style={{
            fontSize: 13,
            letterSpacing: "0.5px",
            color: "#F0F0F0",
            borderBottom: "1px solid rgba(79,123,255,0.45)",
            paddingBottom: 2,
          }}
        >
          hello@chanium.com
        </a>
      </div>
    </footer>
  );
}
