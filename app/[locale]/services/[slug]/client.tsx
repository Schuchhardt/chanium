"use client";

import { useEffect, useRef } from "react";

export default function ServicePageClient() {
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    didAnimate.current = true;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll(".svc-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    })();

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      });
    };
  }, []);

  return null;
}
