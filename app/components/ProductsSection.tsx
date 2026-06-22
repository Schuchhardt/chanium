"use client";

import { useEffect, useRef, useState } from "react";
import { t, type Lang, type DictKey } from "../i18n";
import SectionGlow from "./SectionGlow";

const products = [
  {
    num: "01",
    name: "Depando",
    desc: "p1.desc" as DictKey,
    badge: "● Live · depando.cl",
    badgeColor: "#A9C0FF",
    badgeBorder: "rgba(79,123,255,0.35)",
    href: "https://depando.cl",
  },
  {
    num: "02",
    name: "AI Tickets",
    desc: "p2.desc" as DictKey,
    badge: "● Live · aitickets.cl",
    badgeColor: "#A9C0FF",
    badgeBorder: "rgba(79,123,255,0.35)",
    href: "https://aitickets.cl",
  },
  {
    num: "03",
    name: "Kefy",
    desc: "p3.desc" as DictKey,
    badge: "○ Building · kefy.app",
    badgeColor: "#8A8F98",
    badgeBorder: "rgba(255,255,255,0.12)",
    href: "https://kefy.app",
  },
] as const;

export default function ProductsSection({ locale }: { locale: Lang }) {
  const productsRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(matchMedia("(pointer: coarse)").matches && window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const panel = productsRef.current;
      const stage = stageRef.current;
      if (track && panel && stage) {
        const getDist = () => Math.max(0, track.scrollWidth - stage.offsetWidth);
        gsap.to(track, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        ScrollTrigger.refresh();
      }

      cleanup = () => {
        ScrollTrigger.getAll().forEach((st) => {
          if ((st.vars as { trigger?: unknown }).trigger === panel) st.kill();
        });
      };
    })();

    return () => { cleanup?.(); };
  }, [isTouch]);

  const cardStyle = (product: typeof products[number]) => ({
    width: isTouch ? "85vw" : "min(86vw,500px)",
    height: isTouch ? "auto" : "62vh",
    minHeight: isTouch ? 360 : undefined,
    flexShrink: 0,
    background: "#0c0d10",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 6,
    padding: "clamp(28px,3.4vw,48px)",
    transition: "transform .45s cubic-bezier(.2,.8,.2,1), border-color .45s",
    scrollSnapAlign: isTouch ? ("start" as const) : undefined,
    color: "inherit" as const,
    textDecoration: "none" as const,
  });

  return (
    <section
      ref={productsRef}
      data-products
      className="relative overflow-hidden"
      style={isTouch ? { padding: "clamp(90px,12vh,150px) 0" } : { height: "100vh" }}
      aria-label="Products"
    >
      <SectionGlow opacity={0.35} inverted />
      <div
        ref={stageRef}
        className={isTouch ? "relative" : "relative h-full flex items-center"}
      >
        <div
          ref={trackRef}
          className={isTouch ? "" : "flex items-center"}
          style={
            isTouch
              ? {
                  display: "flex",
                  gap: 20,
                  padding: "0 clamp(20px,5vw,72px)",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }
              : {
                  gap: 32,
                  padding: "0 clamp(20px,5vw,72px)",
                  willChange: "transform",
                }
          }
        >
          <div className="flex-none" style={{ width: isTouch ? "min(78vw,340px)" : "min(78vw,420px)" }}>
            <span
              style={{
                fontSize: 12,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#C8CDD2",
              }}
            >
              {t(locale, "products.label")}
            </span>
            <h2
              className="m-0 font-bold"
              style={{
                marginTop: 18,
                fontSize: "clamp(40px,6vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                color: "#F4F5F7",
              }}
            >
              {t(locale, "products.title")}
            </h2>
            <p
              style={{
                margin: "22px 0 0",
                maxWidth: 300,
                fontSize: 15,
                lineHeight: 1.6,
                color: "#777e88",
              }}
            >
              {t(locale, "products.sub")}
            </p>
          </div>

          {products.map((product) => (
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              key={product.num}
              data-product
              data-cursor="open"
              className="flex flex-col justify-between cursor-pointer relative overflow-hidden"
              style={cardStyle(product)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = "rgba(79,123,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="flex justify-between items-start">
                <span style={{ fontSize: 12, color: "#555" }}>{product.num}</span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "1px",
                    color: product.badgeColor,
                    border: `1px solid ${product.badgeBorder}`,
                    borderRadius: 100,
                    padding: "5px 12px",
                  }}
                >
                  {product.badge}
                </span>
              </div>
              <div>
                <h3
                  className="m-0 font-bold"
                  style={{
                    fontSize: "clamp(34px,4.4vw,58px)",
                    letterSpacing: "-0.02em",
                    color: "#F4F5F7",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    margin: "16px 0 0",
                    maxWidth: 380,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "#8A8F98",
                  }}
                >
                  {t(locale, product.desc)}
                </p>
              </div>
            </a>
          ))}
          {!isTouch && (
            <div className="flex-none" style={{ width: "clamp(20px,5vw,72px)" }} />
          )}
        </div>
      </div>
    </section>
  );
}
