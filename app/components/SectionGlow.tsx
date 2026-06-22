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
  const scale = emphasis ? 1.4 : 1;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        transform: inverted ? "rotate(180deg)" : undefined,
      }}
    >
      <div
        className="glow-orb-1"
        style={{
          position: "absolute",
          width: `${70 * scale}%`,
          height: `${70 * scale}%`,
          top: "-15%",
          left: "-10%",
          opacity,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(79,123,255,${emphasis ? 0.55 : 0.4}) 0%, rgba(26,58,143,${emphasis ? 0.2 : 0.12}) 40%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "glowOrb1 8s ease-in-out infinite alternate",
        }}
      />
      <div
        className="glow-orb-2"
        style={{
          position: "absolute",
          width: `${55 * scale}%`,
          height: `${55 * scale}%`,
          bottom: "-10%",
          right: "-15%",
          opacity: opacity * 0.7,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(122,160,255,${emphasis ? 0.45 : 0.3}) 0%, rgba(79,123,255,0.08) 50%, transparent 70%)`,
          filter: "blur(50px)",
          animation: "glowOrb2 10s ease-in-out infinite alternate",
        }}
      />
      <div
        className="glow-orb-3"
        style={{
          position: "absolute",
          width: `${35 * scale}%`,
          height: `${35 * scale}%`,
          top: "30%",
          left: "40%",
          opacity: opacity * 0.5,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(79,123,255,${emphasis ? 0.35 : 0.2}) 0%, transparent 60%)`,
          filter: "blur(40px)",
          animation: "glowOrb3 6s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
