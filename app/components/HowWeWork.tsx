"use client";

import { useEffect, useRef } from "react";
import { t, type Lang } from "../i18n";
import SectionGlow from "./SectionGlow";

const phases = [
  { num: "01", title: "ph1.t", desc: "ph1.d" },
  { num: "02", title: "ph2.t", desc: "ph2.d" },
  { num: "03", title: "ph3.t", desc: "ph3.d" },
] as const;

export default function HowWeWork({ locale }: { locale: Lang }) {
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    didAnimate.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[data-phase][data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const to = parseFloat(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix;
          },
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });
    })();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "clamp(90px,12vh,150px) clamp(20px,5vw,72px)" }}
      aria-label="How we work"
    >
      <SectionGlow opacity={0.3} />
      <div className="relative mx-auto" style={{ maxWidth: 1180 }}>
        <div
          data-reveal
          className="flex items-baseline gap-5"
          style={{ marginBottom: "clamp(48px,8vh,90px)" }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#C8CDD2",
            }}
          >
            {t(locale, "how.label")}
          </span>
          <span className="flex-1" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>
        <div className="flex flex-col gap-0">
          {phases.map((phase, i) => (
            <div
              key={phase.num}
              data-reveal
              data-phase
              className="grid items-start"
              style={{
                gridTemplateColumns: "clamp(80px,12vw,140px) 1fr",
                gap: "clamp(20px,5vw,80px)",
                padding: "clamp(28px,5vh,56px) 0",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: i === 2 ? "1px solid rgba(255,255,255,0.08)" : undefined,
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: "clamp(48px,7vw,92px)",
                  lineHeight: 0.8,
                  color: "#15171c",
                  WebkitTextStroke: "1px #2a2d34",
                }}
              >
                {phase.num}
              </span>
              <div>
                <h3
                  className="m-0 font-bold"
                  style={{
                    fontSize: "clamp(26px,3.4vw,44px)",
                    letterSpacing: "-0.01em",
                    color: "#F4F5F7",
                  }}
                >
                  {t(locale, phase.title)}
                </h3>
                <p
                  style={{
                    margin: "14px 0 0",
                    maxWidth: 520,
                    fontSize: "clamp(15px,1.7vw,19px)",
                    lineHeight: 1.6,
                    color: "#8A8F98",
                  }}
                >
                  {t(locale, phase.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Stats */}
        <div
          data-reveal
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: 1,
            marginTop: "clamp(60px,9vh,110px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {([
            { count: "12", suffix: "", extra: <span style={{ color: "#4F7BFF" }}>+</span>, label: "stat1" },
            { count: "24", suffix: "/7", extra: null, label: "stat2" },
            { count: "100", suffix: "", extra: <span style={{ color: "#4F7BFF" }}>%</span>, label: "stat3" },
          ] as const).map((stat) => (
            <div key={stat.label} style={{ background: "#0a0a0a", padding: "clamp(24px,3vw,40px)" }}>
              <div
                className="font-bold"
                style={{
                  fontSize: "clamp(36px,5vw,60px)",
                  letterSpacing: "-0.02em",
                  color: "#F4F5F7",
                }}
              >
                <span data-count={stat.count} data-suffix={stat.suffix}>
                  {stat.count}{stat.suffix}
                </span>
                {stat.extra}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#6a727d",
                }}
              >
                {t(locale, stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
