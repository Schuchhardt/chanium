"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Lightfall from "./Lightfall";
import { t, type Lang } from "../i18n";

export default function HeroSection({ locale }: { locale: Lang }) {
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    didAnimate.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;

      const heroWords = document.querySelectorAll("[data-hero] [data-word]");
      if (heroWords.length) {
        gsap.fromTo(
          heroWords,
          { opacity: 0, yPercent: 115 },
          { opacity: 1, yPercent: 0, duration: 0.85, stagger: 0.08, ease: "power3.out", delay: 0.15 }
        );
      }
      gsap.fromTo(
        "[data-load]",
        { opacity: 0, filter: "blur(14px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        "[data-hero-sub]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(
        "[data-hero-cta]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.65 }
      );
    })();
  }, []);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const marqueeText =
    "AI Agents  ·  Automation  ·  Full-Stack  ·  Security  ·  AI Content  ·  SaaS Products  ·  Infrastructure  ·  ";

  return (
    <section
      id="top"
      data-hero
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ padding: "140px clamp(20px,5vw,72px) 0" }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Lightfall
          colors={["#4F7BFF", "#1a3a8f", "#7aa0ff"]}
          backgroundColor="#050510"
          speed={0.3}
          streakCount={6}
          streakWidth={0.8}
          streakLength={1.2}
          glow={0.6}
          density={0.4}
          twinkle={0.8}
          zoom={3}
          backgroundGlow={0.3}
          opacity={0.45}
          mouseInteraction={true}
          mouseStrength={0.4}
          mouseRadius={0.8}
          mixBlendMode="screen"
        />
      </div>
      <Image
        src="/assets/chanium-icon.png"
        alt=""
        aria-hidden
        width={640}
        height={640}
        className="absolute pointer-events-none select-none"
        style={{
          right: "-9%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "min(52vw,640px)",
          height: "auto",
          opacity: 0.045,
        }}
      />
      <div className="relative w-full mx-auto" style={{ maxWidth: 1180 }}>
        <h1
          className="m-0 font-bold"
          style={{
            fontSize: "clamp(46px,9.2vw,112px)",
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: "#F4F5F7",
          }}
        >
          <span className="block overflow-hidden" style={{ paddingBottom: "0.06em" }}>
            {t(locale, "hero.l1").split(/(\s+)/).map((word, i) =>
              word.trim() ? (
                <span key={i} data-word className="inline-block">{word}</span>
              ) : (
                <span key={i}>{word}</span>
              )
            )}
          </span>
          <span className="block overflow-hidden" style={{ paddingBottom: "0.06em" }}>
            {t(locale, "hero.l2.pre").split(/(\s+)/).map((word, i) =>
              word.trim() ? (
                <span key={i} data-word className="inline-block">{word}</span>
              ) : (
                <span key={i}>{word}</span>
              )
            )}
            <span data-word className="inline-block" style={{ color: "#4F7BFF" }}>
              {t(locale, "hero.l2.accent")}
            </span>
          </span>
        </h1>
        <p
          data-hero-sub
          style={{
            maxWidth: 540,
            margin: "38px 0 0",
            fontSize: "clamp(15px,1.6vw,18px)",
            lineHeight: 1.6,
            color: "#8A8F98",
            fontWeight: 400,
          }}
        >
          {t(locale, "hero.sub")}
        </p>
        <button
          data-hero-cta
          data-magnetic
          data-cursor="scroll"
          onClick={() => scrollTo("[data-statement]")}
          className="cursor-pointer"
          style={{
            marginTop: 46,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "transparent",
            border: "none",
            color: "#F0F0F0",
            fontSize: 13,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: 0,
            transition: "transform .18s ease, color .3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#A9C0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#F0F0F0"; }}
        >
          {t(locale, "hero.cta")}
        </button>
      </div>
      <div
        className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 0",
        }}
      >
        <div
          className="marquee-track flex"
          style={{
            width: "max-content",
            animation: "chMarquee 34s linear infinite",
            willChange: "transform",
          }}
        >
          {[0, 1].map((k) => (
            <span
              key={k}
              className="flex items-center"
              style={{
                fontSize: 13,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#56606e",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
