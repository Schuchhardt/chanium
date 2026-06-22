"use client";

import { useState, type FormEvent } from "react";
import { t, type Lang } from "../i18n";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ locale }: { locale: Lang }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xgojwgaa", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ padding: "8px 0" }}>
        <p className="m-0 font-bold" style={{ fontSize: 22, color: "#4F7BFF" }}>
          {t(locale, "f.success")}
        </p>
      </div>
    );
  }

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.14)",
    color: "#F0F0F0",
    fontSize: 16,
    padding: "14px 2px",
    outline: "none",
    transition: "border-color .3s",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <input type="hidden" name="_language" value={locale} />
      <div className="flex flex-col gap-[18px]">
        <input
          data-cursor=""
          name="name"
          required
          placeholder={t(locale, "f.name")}
          className="focus:border-[#4F7BFF]"
          style={inputStyle}
        />
        <input
          data-cursor=""
          name="email"
          type="email"
          required
          placeholder={t(locale, "f.email")}
          className="focus:border-[#4F7BFF]"
          style={inputStyle}
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
          <option value="" style={{ background: "#0a0a0a", color: "#8A8F98" }}>
            {t(locale, "f.serviceph")}
          </option>
          <option value="ai" style={{ background: "#0a0a0a", color: "#F0F0F0" }}>
            {t(locale, "f.svc1")}
          </option>
          <option value="dev" style={{ background: "#0a0a0a", color: "#F0F0F0" }}>
            {t(locale, "f.svc2")}
          </option>
          <option value="content" style={{ background: "#0a0a0a", color: "#F0F0F0" }}>
            {t(locale, "f.svc3")}
          </option>
          <option value="security" style={{ background: "#0a0a0a", color: "#F0F0F0" }}>
            {t(locale, "f.svc4")}
          </option>
          <option value="product" style={{ background: "#0a0a0a", color: "#F0F0F0" }}>
            {t(locale, "f.svc5")}
          </option>
        </select>
        <textarea
          data-cursor=""
          name="project"
          rows={3}
          required
          placeholder={t(locale, "f.project")}
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />
      </div>
      <button
        data-magnetic
        data-cursor="send"
        type="submit"
        disabled={status === "submitting"}
        className="cursor-pointer"
        style={{
          marginTop: 8,
          background: status === "submitting" ? "#3D67E8" : "#4F7BFF",
          border: "none",
          color: "#FFFFFF",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "0.02em",
          padding: "16px 24px",
          borderRadius: 2,
          transition: "transform .18s ease, background-color .3s",
          opacity: status === "submitting" ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (status !== "submitting") e.currentTarget.style.background = "#3D67E8";
        }}
        onMouseLeave={(e) => {
          if (status !== "submitting") e.currentTarget.style.background = "#4F7BFF";
        }}
      >
        {status === "submitting" ? t(locale, "f.sending") : t(locale, "f.submit")}
      </button>
      {status === "error" && (
        <p style={{ margin: "2px 0 0", fontSize: 13, color: "#ff6b6b" }}>
          {t(locale, "f.error")}
        </p>
      )}
      {status === "idle" && (
        <p style={{ margin: "2px 0 0", fontSize: 11, letterSpacing: "0.5px", color: "#555" }}>
          {t(locale, "f.note")}
        </p>
      )}
    </form>
  );
}
