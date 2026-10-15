import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { integrations } from "@/content/integrations";
import { CodeBlock } from "./CodeBlock";
import { CtaBlock } from "./CtaBlock";

function Callout({ type = "note", title, children }: { type?: "note" | "tip" | "warning"; title?: string; children: ReactNode }) {
  const tone = {
    note: "border-line-strong bg-card",
    tip: "border-accent/40 bg-accent-tint",
    warning: "border-danger/50 bg-danger/5",
  }[type];
  return (
    <aside className={`my-6 rounded-lg border p-4 sm:p-5 ${tone}`}>
      {title && <p className="m-0 mb-1 font-semibold text-title">{title}</p>}
      <div className="text-[0.98rem] [&>p]:m-0">{children}</div>
    </aside>
  );
}

/** Wrap an ordered list: <Steps>1. … 2. …</Steps> renders numbered step cards. */
function Steps({ children }: { children: ReactNode }) {
  return <div className="steps-ch my-6">{children}</div>;
}

function ToolLogo({ name }: { name: string }) {
  const tool = integrations.find((t) => t.name.toLowerCase() === name.toLowerCase());
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-0.5 align-middle text-sm font-semibold text-title">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {tool?.logo && <img src={tool.logo} alt="" width={16} height={16} />}
      {tool?.name ?? name}
    </span>
  );
}

export function mdxComponents(slug: string): MDXComponents {
  return {
    pre: CodeBlock,
    Callout,
    Steps,
    CodeBlock,
    ToolLogo,
    CTA: (props: Parameters<typeof CtaBlock>[0]) => <CtaBlock {...props} slug={slug} />,
  };
}
