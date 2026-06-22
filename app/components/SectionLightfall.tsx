"use client";

import Lightfall from "./Lightfall";

interface Props {
  opacity?: number;
  inverted?: boolean;
}

export default function SectionLightfall({ opacity = 0.15, inverted = false }: Props) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        transform: inverted ? "rotate(180deg)" : undefined,
      }}
    >
      <Lightfall
        colors={["#4F7BFF", "#1a3a8f", "#7aa0ff"]}
        backgroundColor="#000000"
        speed={0.3}
        streakCount={6}
        streakWidth={0.8}
        streakLength={1.2}
        glow={0.8}
        density={0.4}
        twinkle={0.6}
        zoom={3}
        backgroundGlow={0.4}
        opacity={opacity}
        mouseInteraction={false}
        mixBlendMode="screen"
      />
    </div>
  );
}
