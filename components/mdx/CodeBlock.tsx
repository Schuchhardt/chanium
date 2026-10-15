"use client";

import { useRef, useState, type ComponentProps } from "react";

/** Replaces MDX <pre>: monospace block with a copy button. */
export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className="relative">
      <pre
        ref={ref}
        {...props}
        className="overflow-x-auto rounded-lg border border-line bg-bg-elevated p-4 pr-16 font-mono text-[0.85rem] leading-relaxed text-fg"
      />
      <button
        type="button"
        onClick={copy}
        className="absolute top-2 right-2 min-h-9 rounded-md border border-line-strong bg-card px-2.5 text-xs font-semibold text-muted hover:text-title"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
