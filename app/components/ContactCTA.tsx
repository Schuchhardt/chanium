"use client";

import { useEffect, useRef } from "react";
import { t, type Lang } from "../i18n";
import ContactForm from "./ContactForm";
import SectionLightfall from "./SectionLightfall";

export default function ContactCTA({ locale }: { locale: Lang }) {
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    didAnimate.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[data-contact] [data-reveal]").forEach((el) => {
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
    })();
  }, []);

  return (
    <section
      data-contact
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ padding: "clamp(90px,12vh,150px) clamp(20px,5vw,72px)" }}
      aria-label="Contact"
    >
      <SectionLightfall opacity={0.35} inverted />
      <div
        className="relative w-full mx-auto grid items-center grid-cols-1 md:grid-cols-[1.1fr_1fr]"
        style={{
          maxWidth: 1180,
          gap: "clamp(40px,7vw,100px)",
        }}
      >
        <div data-reveal>
          <h2
            className="m-0 font-bold"
            style={{
              fontSize: "clamp(34px,5vw,66px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "#F4F5F7",
            }}
          >
            {t(locale, "cta.t1")}{" "}
            <span style={{ color: "#4F7BFF" }}>{t(locale, "cta.t2")}</span>
          </h2>
          <p
            style={{
              margin: "24px 0 0",
              maxWidth: 380,
              fontSize: 16,
              lineHeight: 1.6,
              color: "#8A8F98",
            }}
          >
            {t(locale, "cta.sub")}
          </p>
        </div>
        <div data-reveal>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
