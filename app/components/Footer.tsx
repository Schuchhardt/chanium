"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type Lang } from "../i18n";

export default function Footer({ locale }: { locale: Lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (newLocale: Lang) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const langSelector = document.querySelector("[data-lang-selector]");
      if (langSelector && !langSelector.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
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
        <span style={{ fontSize: 12, letterSpacing: "1px", color: "#555" }}>
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
        <div
          data-lang-selector
          className="relative"
          style={{ fontSize: 12, letterSpacing: "1px" }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-cursor=""
            className="no-underline"
            style={{
              color: "#F0F0F0",
              padding: "8px 4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#A9C0FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#F0F0F0";
            }}
          >
            {locale.toUpperCase()} ▼
          </button>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                bottom: "100%",
                right: 0,
                background: "rgba(30,30,30,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                marginBottom: 8,
                minWidth: 80,
                zIndex: 1000,
              }}
            >
              <button
                onClick={() => changeLanguage("en")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 12px",
                  background: locale === "en" ? "rgba(79,123,255,0.2)" : "transparent",
                  border: "none",
                  color: locale === "en" ? "#F0F0F0" : "#888",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 12,
                  letterSpacing: "1px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "background-color .2s",
                }}
                onMouseEnter={(e) => {
                  if (locale !== "en") {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = locale === "en" ? "rgba(79,123,255,0.2)" : "transparent";
                }}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("es")}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 12px",
                  background: locale === "es" ? "rgba(79,123,255,0.2)" : "transparent",
                  border: "none",
                  color: locale === "es" ? "#F0F0F0" : "#888",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 12,
                  letterSpacing: "1px",
                  transition: "background-color .2s",
                }}
                onMouseEnter={(e) => {
                  if (locale !== "es") {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = locale === "es" ? "rgba(79,123,255,0.2)" : "transparent";
                }}
              >
                ES
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
