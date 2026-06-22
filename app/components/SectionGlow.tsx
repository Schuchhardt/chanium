"use client";

interface Props {
  opacity?: number;
  inverted?: boolean;
  emphasis?: boolean;
}

export default function SectionGlow({
  opacity = 0.15,
  inverted = false,
  emphasis = false,
}: Props) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        transform: inverted ? "rotate(180deg)" : undefined,
      }}
    >
      <div
        className="section-glow-orb"
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          opacity,
          background: emphasis
            ? "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(79,123,255,0.4) 0%, rgba(26,58,143,0.15) 40%, transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(79,123,255,0.25) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 70% 70%, rgba(26,58,143,0.2) 0%, transparent 50%)",
          animation: "sectionGlowDrift 12s ease-in-out infinite alternate",
        }}
      />
      {emphasis && (
        <div
          className="section-glow-orb-secondary"
          style={{
            position: "absolute",
            width: "80%",
            height: "80%",
            bottom: "-20%",
            right: "-10%",
            opacity: opacity * 0.6,
            background:
              "radial-gradient(ellipse 60% 50% at 60% 60%, rgba(122,160,255,0.3) 0%, transparent 60%)",
            animation: "sectionGlowDrift 15s ease-in-out infinite alternate-reverse",
          }}
        />
      )}
      <style jsx>{`
        @keyframes sectionGlowDrift {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(3%, 5%) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
