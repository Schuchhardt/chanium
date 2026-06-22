"use client";

import { useEffect } from "react";

export default function CustomCursor() {
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

    const scan = () => {
      const interactives = document.querySelectorAll<HTMLElement>("[data-cursor]");
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
        interactives.forEach((el, i) => {
          el.removeEventListener("mouseenter", enterHandlers[i]);
          el.removeEventListener("mouseleave", leaveHandlers[i]);
        });
      };
    };

    let cleanupScan = scan();
    const observer = new MutationObserver(() => {
      cleanupScan();
      cleanupScan = scan();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      cleanupScan();
      observer.disconnect();
    };
  }, []);

  return (
    <>
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
    </>
  );
}
