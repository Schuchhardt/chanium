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
  const base = emphasis ? 0.6 : 0.35;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        transform: inverted ? "rotate(180deg)" : undefined,
      }}
    >
      <div
        className="glow-aurora"
        style={{
          position: "absolute",
          inset: "-50%",
          opacity,
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              rgba(79,123,255,${base}) 0deg,
              transparent 60deg,
              rgba(26,58,143,${base * 0.7}) 120deg,
              transparent 180deg,
              rgba(122,160,255,${base * 0.8}) 240deg,
              transparent 300deg,
              rgba(79,123,255,${base}) 360deg
            )
          `,
          filter: emphasis ? "blur(80px)" : "blur(100px)",
          animation: "auroraRotate 20s linear infinite",
        }}
      />
      <div
        className="glow-pulse"
        style={{
          position: "absolute",
          width: emphasis ? "80%" : "60%",
          height: emphasis ? "80%" : "60%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: opacity * 0.6,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(79,123,255,${emphasis ? 0.4 : 0.25}) 0%, transparent 70%)`,
          filter: "blur(40px)",
          animation: "glowPulse 4s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
