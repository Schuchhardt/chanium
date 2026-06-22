"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { t, type Lang } from "../i18n";
import { services } from "../services-data";

export default function ServicesGrid({ locale }: { locale: Lang }) {
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    didAnimate.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[data-reveal]").forEach((el) => {
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

      const servicesGrid = document.querySelector("[data-services-grid]");
      if (servicesGrid) {
        gsap.fromTo(
          "[data-service]",
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-services-grid]", start: "top 80%" },
          }
        );
      }
    })();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-service]");
    const handlers: Array<{ enter: () => void; leave: () => void }> = [];
    cards.forEach((card, i) => {
      const arrow = card.querySelector<HTMLElement>("[data-arrow]");
      if (!arrow) return;
      handlers[i] = {
        enter: () => {
          arrow.style.transform = "translateX(8px)";
          arrow.style.color = "#4F7BFF";
        },
        leave: () => {
          arrow.style.transform = "translateX(0)";
          arrow.style.color = "#5a626d";
        },
      };
      card.addEventListener("mouseenter", handlers[i].enter);
      card.addEventListener("mouseleave", handlers[i].leave);
    });
    return () => {
      cards.forEach((card, i) => {
        if (handlers[i]) {
          card.removeEventListener("mouseenter", handlers[i].enter);
          card.removeEventListener("mouseleave", handlers[i].leave);
        }
      });
    };
  }, []);

  return (
    <section
      style={{ padding: "clamp(90px,12vh,150px) clamp(20px,5vw,72px)" }}
      aria-label="Services"
    >
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div
          data-reveal
          className="flex items-baseline gap-5"
          style={{ marginBottom: "clamp(40px,7vh,80px)" }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#C8CDD2",
            }}
          >
            {t(locale, "services.label")}
          </span>
          <span className="flex-1" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>
        <div
          data-services-grid
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {services.map((svc) => (
            <Link
              key={svc.num}
              href={`/${locale}/services/${svc.slug}`}
              data-service
              data-cursor="open"
              className="flex flex-col no-underline"
              style={{
                position: "relative",
                background: "#0a0a0a",
                padding: "clamp(28px,4vw,52px)",
                minHeight: 288,
                transition: "background-color .4s",
                color: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0f0f12"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#0a0a0a"; }}
            >
              <span style={{ fontSize: 13, color: "#3f4650", letterSpacing: "1px" }}>
                {svc.num}
              </span>
              <h3
                className="m-0 font-bold"
                style={{
                  marginTop: 18,
                  fontSize: "clamp(22px,2.6vw,32px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  color: "#F4F5F7",
                }}
              >
                {t(locale, svc.nameKey)}
              </h3>
              <p
                style={{
                  margin: "16px 0 0",
                  maxWidth: 360,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#8A8F98",
                }}
              >
                {t(locale, svc.descKey)}
              </p>
              <div className="mt-auto flex items-center justify-end" style={{ paddingTop: 28 }}>
                <span
                  data-arrow
                  style={{
                    fontSize: 20,
                    color: "#5a626d",
                    transition: "transform .35s cubic-bezier(.2,.8,.2,1), color .35s",
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
