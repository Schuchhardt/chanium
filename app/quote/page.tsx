import { Suspense } from "react";
import { quoteCopy } from "@/content/quote";
import { QuoteFlow } from "@/components/quote/QuoteFlow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...quoteCopy.seo, path: "/quote" });

export default function QuotePage() {
  return (
    // The flow reads ?step, ?segment and ?employee, so it renders on the client.
    <Suspense fallback={<div className="min-h-[calc(100dvh-88px)]" aria-busy="true" />}>
      <QuoteFlow />
    </Suspense>
  );
}
