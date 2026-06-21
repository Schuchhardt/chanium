"use client";

import { useEffect, useRef, useState, useCallback, type FormEvent } from "react";
import Image from "next/image";
import Lightfall from "./components/Lightfall";
import { dict, type Lang, type DictKey } from "./i18n";

function t(lang: Lang, key: DictKey) {
  return dict[lang][key];
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [submitted, setSubmitted] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(false);

  const switchLang = useCallback(
    (newLang: Lang) => {
      if (newLang === lang) return;
      const main = mainRef.current;
      if (reduceMotion.current || !main) {
        setLang(newLang);
        return;
      }
      main.style.transition = "opacity .28s ease";
      main.style.opacity = "0";
      setTimeout(() => {
        setLang(newLang);
        main.style.opacity = "1";
        ScrollTrigger.refresh();
      }, 260);
    },
    [lang]
  );

  const scrollTo = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({
      top: y,
      behavior: reduceMotion.current ? "auto" : "smooth",
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Cursor
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const dot = document.querySelector<HTMLDivElement>("[data-cursor-dot]");
    const ring = document.querySelector<HTMLDivElement>("[data-cursor-ring]");
    if (!dot || !ring) return;
    dot.style.display = "block";
    ring.style.display = "flex";
    let mx = innerWidth / 2,
      my = innerHeight / 2;
    let dx = mx,
      dy = my,
      rx = mx,
      ry = my;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const loop = () => {
      dx += (mx - dx) * 0.4;
      dy += (my - dy) * 0.4;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactives =
      document.querySelectorAll<HTMLElement>("[data-cursor]");
    const enterHandlers: Array<() => void> = [];
    const leaveHandlers: Array<() => void> = [];
    interactives.forEach((el, i) => {
      const label = el.getAttribute("data-cursor") || "";
      enterHandlers[i] = () => {
        ring.style.width = label ? "62px" : "46px";
        ring.style.height = label ? "62px" : "46px";
        ring.style.borderColor = "#4F7BFF";
        ring.style.backgroundColor = "rgba(79,123,255,0.08)";
        ring.textContent = label;
        dot.style.opacity = "0";
      };
      leaveHandlers[i] = () => {
        ring.style.width = "34px";
        ring.style.height = "34px";
        ring.style.borderColor = "rgba(255,255,255,0.32)";
        ring.style.backgroundColor = "transparent";
        ring.textContent = "";
        dot.style.opacity = "1";
      };
      el.addEventListener("mouseenter", enterHandlers[i]);
      el.addEventListener("mouseleave", leaveHandlers[i]);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el, i) => {
        el.removeEventListener("mouseenter", enterHandlers[i]);
        el.removeEventListener("mouseleave", leaveHandlers[i]);
      });
    };
  }, []);

  // Magnetic buttons
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const els = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const handlers: Array<{
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];
    els.forEach((el, i) => {
      const strength = 0.32;
      handlers[i] = {
        move: (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        },
        leave: () => {
          el.style.transform = "translate(0,0)";
        },
      };
      el.addEventListener("mousemove", handlers[i].move);
      el.addEventListener("mouseleave", handlers[i].leave);
    });
    return () => {
      els.forEach((el, i) => {
        el.removeEventListener("mousemove", handlers[i].move);
        el.removeEventListener("mouseleave", handlers[i].leave);
      });
    };
  }, []);

  // Service arrows
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-service]");
    const handlers: Array<{
      enter: () => void;
      leave: () => void;
    }> = [];
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

  // Nav scroll
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 30) {
        nav.style.background = "rgba(5,5,5,0.72)";
        nav.style.backdropFilter = "blur(14px)";
        nav.style.setProperty("-webkit-backdrop-filter", "blur(14px)");
        nav.style.borderBottomColor = "rgba(255,255,255,0.06)";
      } else {
        nav.style.background = "rgba(5,5,5,0)";
        nav.style.backdropFilter = "blur(0px)";
        nav.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
        nav.style.borderBottomColor = "rgba(255,255,255,0)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    reduceMotion.current = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

    // Hero intro
    const heroWords = document.querySelectorAll("[data-hero] [data-word]");
    if (heroWords.length) {
      gsap.fromTo(
        heroWords,
        { opacity: 0, yPercent: 115 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
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

    // Reveal animations
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

    // Services stagger
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
          scrollTrigger: {
            trigger: "[data-services-grid]",
            start: "top 80%",
          },
        }
      );
    }

    // Statement word reveal
    const stWords = document.querySelectorAll(
      "[data-statement] [data-word]"
    );
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

    // Pinned horizontal products
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
    }

    // Count up
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

    ScrollTrigger.refresh();

    cleanup = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    })();

    return () => { cleanup?.(); };
  }, []);

  const d = dict[lang];
  const marqueeText =
    "AI Agents  ·  Automation  ·  Full-Stack  ·  Security  ·  AI Content  ·  SaaS Products  ·  Infrastructure  ·  ";

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#050505", color: "#F0F0F0" }}
    >
      {/* Grain overlay */}
      <div
        className="grain-overlay fixed pointer-events-none"
        style={{
          inset: "-50%",
          width: "200%",
          height: "200%",
          zIndex: 9991,
          opacity: 0.05,
          mixBlendMode: "screen",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          animation: "chGrain 0.4s steps(3) infinite",
        }}
      />

      {/* Custom cursor */}
      <div
        data-cursor-dot
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: 7,
          height: 7,
          background: "#4F7BFF",
          zIndex: 10000,
          display: "none",
          willChange: "transform",
        }}
      />
      <div
        data-cursor-ring
        className="fixed top-0 left-0 rounded-full pointer-events-none items-center justify-center"
        style={{
          width: 34,
          height: 34,
          border: "1px solid rgba(255,255,255,0.32)",
          zIndex: 9999,
          display: "none",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "#9FB6FF",
          transition:
            "width .28s cubic-bezier(.2,.8,.2,1), height .28s cubic-bezier(.2,.8,.2,1), border-color .28s, background-color .28s",
          willChange: "transform",
        }}
      />

      {/* NAV */}
      <nav
        data-nav
        className="fixed top-0 left-0 right-0 flex items-center justify-between"
        style={{
          zIndex: 200,
          padding: "18px clamp(20px,5vw,72px)",
          transition:
            "background-color .4s, border-color .4s, backdrop-filter .4s",
          borderBottom: "1px solid rgba(255,255,255,0)",
          background: "rgba(5,5,5,0)",
        }}
      >
        <a
          data-load
          href="#top"
          data-cursor="top"
          className="flex items-center gap-[13px] no-underline"
          style={{ color: "#F0F0F0" }}
        >
          <Image
            src="/assets/chanium-icon.png"
            alt="Chanium"
            width={27}
            height={27}
            className="block"
            style={{ height: 27, width: "auto" }}
          />
          <Image
            src="/assets/chanium-wordmark.png"
            alt="CHANIUM"
            width={100}
            height={14}
            className="block"
            style={{ height: 14, width: "auto", opacity: 0.96, marginTop: 1 }}
          />
        </a>
        <div
          className="flex items-center"
          style={{ gap: "clamp(16px,3vw,34px)" }}
        >
          <div
            className="flex items-center gap-2"
            style={{ fontSize: 12, letterSpacing: "1px" }}
          >
            <span
              data-cursor=""
              onClick={() => switchLang("en")}
              className="cursor-pointer"
              style={{ color: lang === "en" ? "#F0F0F0" : "#555" }}
            >
              EN
            </span>
            <span style={{ color: "#333" }}>/</span>
            <span
              data-cursor=""
              onClick={() => switchLang("es")}
              className="cursor-pointer"
              style={{ color: lang === "es" ? "#F0F0F0" : "#555" }}
            >
              ES
            </span>
          </div>
          <button
            data-magnetic
            data-cursor="contact"
            onClick={() => scrollTo("[data-contact]")}
            className="inline-block cursor-pointer"
            style={{
              background: "transparent",
              border: "1px solid rgba(79,123,255,0.55)",
              color: "#A9C0FF",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.02em",
              padding: "11px 20px",
              borderRadius: 2,
              transition:
                "transform .18s ease, background-color .3s, color .3s, border-color .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#4F7BFF";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "#4F7BFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#A9C0FF";
              e.currentTarget.style.borderColor = "rgba(79,123,255,0.55)";
            }}
          >
            {t(lang, "nav.cta")}
          </button>
        </div>
      </nav>

      <main ref={mainRef} style={{ display: "block" }}>
        {/* HERO */}
        <section
          id="top"
          data-hero
          className="relative min-h-screen flex flex-col justify-center overflow-hidden"
          style={{ padding: "140px clamp(20px,5vw,72px) 0" }}
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
                {t(lang, "hero.l1").split(/(\s+)/).map((word, i) =>
                  word.trim() ? (
                    <span key={i} data-word className="inline-block">
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word}</span>
                  )
                )}
              </span>
              <span className="block overflow-hidden" style={{ paddingBottom: "0.06em" }}>
                {t(lang, "hero.l2.pre").split(/(\s+)/).map((word, i) =>
                  word.trim() ? (
                    <span key={i} data-word className="inline-block">
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word}</span>
                  )
                )}
                <span data-word className="inline-block" style={{ color: "#4F7BFF" }}>
                  {t(lang, "hero.l2.accent")}
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
              {t(lang, "hero.sub")}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#A9C0FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#F0F0F0";
              }}
            >
              {t(lang, "hero.cta")}
            </button>
          </div>
          {/* Marquee */}
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
              <span
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
              <span
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
            </div>
          </div>
        </section>

        {/* STATEMENT */}
        <section
          data-statement
          className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ padding: "120px clamp(20px,5vw,72px)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(46% 42% at 50% 50%, rgba(79,123,255,0.06), rgba(5,5,5,0) 70%)",
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
              {t(lang, "st.l1").split(/(\s+)/).map((word, i) =>
                word.trim() ? (
                  <span key={i} data-word className="inline-block">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word}</span>
                )
              )}
            </span>
            <span className="inline">
              {t(lang, "st.l2.pre").split(/(\s+)/).map((word, i) =>
                word.trim() ? (
                  <span key={i} data-word className="inline-block">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word}</span>
                )
              )}
              <span data-word className="inline-block" style={{ color: "#4F7BFF" }}>
                {t(lang, "st.l2.accent")}
              </span>
            </span>
          </p>
        </section>

        {/* SERVICES */}
        <section style={{ padding: "clamp(90px,12vh,150px) clamp(20px,5vw,72px)" }}>
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
                {t(lang, "services.label")}
              </span>
              <span
                className="flex-1"
                style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
              />
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
              {(
                [
                  { num: "01", name: "s1.name", desc: "s1.desc" },
                  { num: "02", name: "s2.name", desc: "s2.desc" },
                  { num: "03", name: "s3.name", desc: "s3.desc" },
                  { num: "04", name: "s4.name", desc: "s4.desc" },
                ] as const
              ).map((svc) => (
                <div
                  key={svc.num}
                  data-service
                  data-cursor="open"
                  className="flex flex-col cursor-pointer"
                  style={{
                    position: "relative",
                    background: "#0a0a0a",
                    padding: "clamp(28px,4vw,52px)",
                    minHeight: 288,
                    transition: "background-color .4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#0f0f12";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0a0a0a";
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "#3f4650",
                      letterSpacing: "1px",
                    }}
                  >
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
                    {t(lang, svc.name)}
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
                    {t(lang, svc.desc)}
                  </p>
                  <div
                    className="mt-auto flex items-center justify-end"
                    style={{ paddingTop: 28 }}
                  >
                    <span
                      data-arrow
                      style={{
                        fontSize: 20,
                        color: "#5a626d",
                        transition:
                          "transform .35s cubic-bezier(.2,.8,.2,1), color .35s",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS (pinned horizontal) */}
        <section
          ref={productsRef}
          data-products
          className="relative overflow-hidden"
          style={{ height: "100vh" }}
        >
          <div
            ref={stageRef}
            className="h-full flex items-center"
          >
            <div
              ref={trackRef}
              className="flex items-center"
              style={{
                gap: 32,
                padding: "0 clamp(20px,5vw,72px)",
                willChange: "transform",
              }}
            >
              <div className="flex-none" style={{ width: "min(78vw,420px)" }}>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#C8CDD2",
                  }}
                >
                  {t(lang, "products.label")}
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
                  {t(lang, "products.title")}
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
                  {t(lang, "products.sub")}
                </p>
              </div>

              {(
                [
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
                ] as const
              ).map((product) => (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={product.num}
                  data-product
                  data-cursor="open"
                  className="flex-none flex flex-col justify-between cursor-pointer relative overflow-hidden no-underline"
                  style={{
                    width: "min(86vw,500px)",
                    height: "62vh",
                    background: "#0c0d10",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 6,
                    padding: "clamp(28px,3.4vw,48px)",
                    transition:
                      "transform .45s cubic-bezier(.2,.8,.2,1), border-color .45s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.borderColor = "rgba(79,123,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span style={{ fontSize: 12, color: "#555" }}>
                      {product.num}
                    </span>
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
                      {t(lang, product.desc)}
                    </p>
                  </div>
                </a>
              ))}
              <div
                className="flex-none"
                style={{ width: "clamp(20px,5vw,72px)" }}
              />
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section style={{ padding: "clamp(90px,12vh,150px) clamp(20px,5vw,72px)" }}>
          <div className="mx-auto" style={{ maxWidth: 1180 }}>
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
                {t(lang, "how.label")}
              </span>
              <span
                className="flex-1"
                style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
              />
            </div>
            <div className="flex flex-col gap-0">
              {(
                [
                  { num: "01", title: "ph1.t", desc: "ph1.d" },
                  { num: "02", title: "ph2.t", desc: "ph2.d" },
                  { num: "03", title: "ph3.t", desc: "ph3.d" },
                ] as const
              ).map((phase, i) => (
                <div
                  key={phase.num}
                  data-reveal
                  data-phase
                  className="grid items-start"
                  style={{
                    gridTemplateColumns: "140px 1fr",
                    gap: "clamp(20px,5vw,80px)",
                    padding: "clamp(28px,5vh,56px) 0",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderBottom:
                      i === 2
                        ? "1px solid rgba(255,255,255,0.08)"
                        : undefined,
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
                      {t(lang, phase.title)}
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
                      {t(lang, phase.desc)}
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
              <div
                style={{
                  background: "#0a0a0a",
                  padding: "clamp(24px,3vw,40px)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(36px,5vw,60px)",
                    letterSpacing: "-0.02em",
                    color: "#F4F5F7",
                  }}
                >
                  <span data-count="12" data-suffix="">
                    12
                  </span>
                  <span style={{ color: "#4F7BFF" }}>+</span>
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
                  {t(lang, "stat1")}
                </div>
              </div>
              <div
                style={{
                  background: "#0a0a0a",
                  padding: "clamp(24px,3vw,40px)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(36px,5vw,60px)",
                    letterSpacing: "-0.02em",
                    color: "#F4F5F7",
                  }}
                >
                  <span data-count="24" data-suffix="/7">
                    24/7
                  </span>
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
                  {t(lang, "stat2")}
                </div>
              </div>
              <div
                style={{
                  background: "#0a0a0a",
                  padding: "clamp(24px,3vw,40px)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(36px,5vw,60px)",
                    letterSpacing: "-0.02em",
                    color: "#F4F5F7",
                  }}
                >
                  <span data-count="100" data-suffix="">
                    100
                  </span>
                  <span style={{ color: "#4F7BFF" }}>%</span>
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
                  {t(lang, "stat3")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section
          data-contact
          className="min-h-screen flex items-center"
          style={{ padding: "clamp(90px,12vh,150px) clamp(20px,5vw,72px)" }}
        >
          <div
            className="w-full mx-auto grid items-center"
            style={{
              maxWidth: 1180,
              gridTemplateColumns: "1.1fr 1fr",
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
                {t(lang, "cta.t1")}{" "}
                <span style={{ color: "#4F7BFF" }}>{t(lang, "cta.t2")}</span>
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
                {t(lang, "cta.sub")}
              </p>
            </div>
            <form
              data-reveal
              onSubmit={handleSubmit}
              className="flex flex-col gap-[18px]"
            >
              {!submitted ? (
                <>
                  <div className="flex flex-col gap-[18px]">
                    <input
                      data-cursor=""
                      name="name"
                      required
                      placeholder={t(lang, "f.name")}
                      className="focus:border-[#4F7BFF]"
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                        color: "#F0F0F0",
                        fontSize: 16,
                        padding: "14px 2px",
                        outline: "none",
                        transition: "border-color .3s",
                      }}
                    />
                    <input
                      data-cursor=""
                      name="email"
                      type="email"
                      required
                      placeholder={t(lang, "f.email")}
                      className="focus:border-[#4F7BFF]"
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                        color: "#F0F0F0",
                        fontSize: 16,
                        padding: "14px 2px",
                        outline: "none",
                        transition: "border-color .3s",
                      }}
                    />
                    <select
                      data-cursor=""
                      name="service"
                      required
                      defaultValue=""
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                        color: "#8A8F98",
                        fontSize: 16,
                        padding: "14px 2px",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option
                        value=""
                        style={{ background: "#0a0a0a", color: "#8A8F98" }}
                      >
                        {t(lang, "f.serviceph")}
                      </option>
                      <option
                        value="ai"
                        style={{ background: "#0a0a0a", color: "#F0F0F0" }}
                      >
                        {t(lang, "f.svc1")}
                      </option>
                      <option
                        value="dev"
                        style={{ background: "#0a0a0a", color: "#F0F0F0" }}
                      >
                        {t(lang, "f.svc2")}
                      </option>
                      <option
                        value="content"
                        style={{ background: "#0a0a0a", color: "#F0F0F0" }}
                      >
                        {t(lang, "f.svc3")}
                      </option>
                      <option
                        value="security"
                        style={{ background: "#0a0a0a", color: "#F0F0F0" }}
                      >
                        {t(lang, "f.svc4")}
                      </option>
                      <option
                        value="product"
                        style={{ background: "#0a0a0a", color: "#F0F0F0" }}
                      >
                        {t(lang, "f.svc5")}
                      </option>
                    </select>
                    <textarea
                      data-cursor=""
                      name="project"
                      rows={3}
                      required
                      placeholder={t(lang, "f.project")}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                        color: "#F0F0F0",
                        fontSize: 16,
                        padding: "14px 2px",
                        outline: "none",
                        resize: "none",
                        transition: "border-color .3s",
                      }}
                    />
                  </div>
                  <button
                    data-magnetic
                    data-cursor="send"
                    type="submit"
                    className="cursor-pointer"
                    style={{
                      marginTop: 8,
                      background: "#4F7BFF",
                      border: "none",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: 15,
                      letterSpacing: "0.02em",
                      padding: "16px 24px",
                      borderRadius: 2,
                      transition: "transform .18s ease, background-color .3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#3D67E8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#4F7BFF";
                    }}
                  >
                    {t(lang, "f.submit")}
                  </button>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 11,
                      letterSpacing: "0.5px",
                      color: "#555",
                    }}
                  >
                    {t(lang, "f.note")}
                  </p>
                </>
              ) : (
                <div style={{ padding: "8px 0" }}>
                  <p
                    className="m-0 font-bold"
                    style={{ fontSize: 22, color: "#4F7BFF" }}
                  >
                    {t(lang, "f.success")}
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "clamp(40px,6vh,64px) clamp(20px,5vw,72px)",
          }}
        >
          <div
            className="mx-auto flex flex-wrap items-center justify-between"
            style={{ maxWidth: 1180, gap: 24 }}
          >
            <div className="flex items-center gap-[11px]">
              <Image
                src="/assets/chanium-icon.png"
                alt="Chanium"
                width={23}
                height={23}
                style={{ height: 23, width: "auto" }}
              />
              <Image
                src="/assets/chanium-wordmark.png"
                alt="CHANIUM"
                width={80}
                height={12}
                style={{ height: 12, width: "auto", opacity: 0.92, marginTop: 1 }}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                letterSpacing: "1px",
                color: "#555",
              }}
            >
              Chanium LLC
            </span>
            <a
              href="mailto:hello@chanium.com"
              data-cursor="email"
              className="no-underline"
              style={{
                fontSize: 13,
                letterSpacing: "0.5px",
                color: "#F0F0F0",
                borderBottom: "1px solid rgba(79,123,255,0.45)",
                paddingBottom: 2,
              }}
            >
              hello@chanium.com
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
