"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { t, type Lang } from "../i18n";
import SectionGlow from "./SectionGlow";

export default function StatementSection({ locale }: { locale: Lang }) {
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    didAnimate.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const stWords = document.querySelectorAll("[data-statement] [data-word]");
      if (stWords.length) {
        gsap.set(stWords, { opacity: 0.12 });
        gsap.to(stWords, {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 72%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        });
      }
    })();

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((st) => {
          if ((st.vars as { trigger?: string }).trigger === "[data-statement]") st.kill();
        });
      });
    };
  }, []);

  return (
    <section
      data-statement
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: "120px clamp(20px,5vw,72px)" }}
      aria-label="Statement"
    >
      <SectionGlow opacity={0.5} inverted />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(46% 42% at 50% 50%, rgba(79,123,255,0.06), rgba(5,5,5,0) 70%)",
        }}
      />
      <Image
        src="/assets/chanium-icon.png"
        alt=""
        aria-hidden
        width={540}
        height={540}
        className="absolute pointer-events-none select-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-54%)",
          width: "min(58vw,540px)",
          height: "auto",
          opacity: 0.06,
        }}
      />
      <p
        className="relative m-0 font-bold"
        style={{
          maxWidth: 1100,
          fontSize: "clamp(30px,5.6vw,74px)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#F4F5F7",
        }}
      >
        <span className="inline">
          {t(locale, "st.l1").split(/(\s+)/).map((word, i) =>
            word.trim() ? (
              <span key={i} data-word className="inline-block">{word}</span>
            ) : (
              <span key={i}>{word}</span>
            )
          )}
        </span>
        <span className="inline">
          {t(locale, "st.l2.pre").split(/(\s+)/).map((word, i) =>
            word.trim() ? (
              <span key={i} data-word className="inline-block">{word}</span>
            ) : (
              <span key={i}>{word}</span>
            )
          )}
          <span data-word className="inline-block" style={{ color: "#4F7BFF" }}>
            {t(locale, "st.l2.accent")}
          </span>
        </span>
      </p>
    </section>
  );
}
