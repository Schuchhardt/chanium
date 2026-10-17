"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cx } from "@/lib/cx";

const REDUCED = "(prefers-reduced-motion: reduce)";
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia(REDUCED).matches;

/** Live `prefers-reduced-motion`; `true` on the server so nothing animates before hydration decides. */
function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    reducedMotion,
    () => true,
  );
}

/** Lenis smooth scrolling for the whole document. Off with reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const instance = new Lenis({ duration: 1.15, anchors: { offset: -88 }, autoRaf: true });
    lenis.current = instance;
    return () => {
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // A route change starts at the top, without easing through the old page.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

/**
 * True once the element has entered the viewport. Takes the element (from a callback ref) rather
 * than a ref object. With reduced motion the CSS shows everything regardless of this flag.
 */
function useInView(el: Element | null, rootMargin = "0px 0px -12% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el, rootMargin]);
  return inView;
}

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
  variant?: "fade" | "media";
} & Record<string, unknown>;

/** Fade-up (default) or image curtain (`variant="media"`) on first view. */
export function Reveal({ as = "div", className, delay = 0, variant = "fade", children, ...rest }: RevealProps) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const inView = useInView(el);
  return createElement(
    as,
    {
      ref: setEl,
      className: cx(variant === "media" ? "reveal-media" : "reveal", inView && "is-in", className),
      style: { "--d": `${delay}ms` } as CSSProperties,
      ...rest,
    },
    children,
  );
}

/**
 * Headline whose words rise out of a mask, one after another. `accent` is a phrase inside `text`
 * set in the italic serif accent colour.
 */
export function SplitText({
  text,
  as = "h2",
  className,
  accent,
  delay = 0,
  immediate = false,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  accent?: string;
  delay?: number;
  /** Play on mount (above the fold) instead of on scroll. */
  immediate?: boolean;
  id?: string;
}) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const inView = useInView(el, immediate ? "0px" : undefined);
  const words = splitWords(text, accent);

  return createElement(
    as,
    { ref: setEl, id, className: cx(inView && "is-in", className), style: { "--d": `${delay}ms` } as CSSProperties },
    words.map(({ word, isAccent }, i) => {
      return (
        <span key={i}>
          <span className="split-word" style={{ "--i": i } as CSSProperties}>
            <span className={isAccent ? "serif-em" : undefined}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      );
    }),
  );
}

/** Splits on whitespace and flags the words that fall inside `accent`. */
function splitWords(text: string, accent?: string) {
  const start = accent ? text.indexOf(accent) : -1;
  const end = start + (accent?.length ?? 0);
  return Array.from(text.matchAll(/\S+/g), (m) => ({
    word: m[0],
    isAccent: start >= 0 && m.index >= start && m.index < end,
  }));
}

/** Moves its child vertically as the page scrolls past it. `speed` is a fraction of the viewport. */
export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      const target = inner.current;
      if (!el || !target) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when the element's centre sits at the bottom of the viewport, +1 at the top.
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      target.style.transform = `translate3d(0, ${(progress * speed * vh).toFixed(1)}px, 0) scale(${1 + speed})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);
  return (
    <div ref={ref} className={cx("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}

/**
 * Muted, looping background film. Plays only while on screen; with reduced motion the poster
 * (rendered by the caller underneath) is all that shows.
 */
export function AmbientVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const enabled = !useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!enabled || !video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;
  return (
    <video
      ref={ref}
      className={cx("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden="true"
    />
  );
}

/** Counts a leading number up when it scrolls into view ("<60s", "100%"). Non-numeric values pass through. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const [el, setEl] = useState<HTMLSpanElement | null>(null);
  const inView = useInView(el);
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const [counted, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);
  const shown = reduced ? value : counted;

  useEffect(() => {
    if (!match || !inView || reduced) return;
    const [, pre, num, post] = match;
    const target = Number(num);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(`${pre}${Math.round(target * eased)}${post}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduced]);

  return (
    <span ref={setEl} className={className} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
