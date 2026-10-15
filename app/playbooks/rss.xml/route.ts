import { playbooksPage } from "@/content/playbooksPage";
import { publishedPlaybooks } from "@/lib/playbooks";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = publishedPlaybooks()
    .map((p) => {
      const url = absoluteUrl(`/playbooks/${p.slug}`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(`${p.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(playbooksPage.rss.title)}</title>
    <link>${absoluteUrl("/playbooks")}</link>
    <description>${esc(playbooksPage.rss.description)}</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl("/playbooks/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
