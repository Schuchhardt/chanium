"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "../i18n";

export default function Nav({ locale }: { locale: Lang }) {

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 10;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

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

  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const els = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const handlers: Array<{ move: (e: MouseEvent) => void; leave: () => void }> = [];
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

  return (
    <nav
      data-nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between"
      style={{
        zIndex: 200,
        padding: "18px clamp(20px,5vw,72px)",
        transition: "background-color .4s, border-color .4s, backdrop-filter .4s",
        borderBottom: "1px solid rgba(255,255,255,0)",
        background: "rgba(5,5,5,0)",
      }}
    >
      <Link
        data-load
        href={`/${locale}`}
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
      </Link>
      <div className="flex items-center" style={{ gap: "clamp(16px,3vw,34px)" }}>
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
            transition: "transform .18s ease, background-color .3s, color .3s, border-color .3s",
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
          {t(locale, "nav.cta")}
        </button>
      </div>
    </nav>
  );
}
