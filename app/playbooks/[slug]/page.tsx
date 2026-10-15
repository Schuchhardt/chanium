import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { playbooksPage } from "@/content/playbooksPage";
import { getEmployee } from "@/content/employees";
import { getSegment } from "@/content/segments";
import { site } from "@/content/site";
import { ButtonLink, Chip, Container } from "@/components/ui";
import { EmployeeCard } from "@/components/sections/Blocks";
import { mdxComponents } from "@/components/mdx";
import { JsonLd } from "@/components/JsonLd";
import { getPlaybook, getPlaybooks } from "@/lib/playbooks";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPlaybooks().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/playbooks/[slug]">) {
  const p = getPlaybook((await params).slug);
  if (!p) return {};
  return {
    ...pageMetadata({ title: p.title, description: p.description, path: `/playbooks/${p.slug}`, keywords: p.tags, type: "article", noindex: p.draft }),
    other: { "article:published_time": p.publishedAt, "article:modified_time": p.updatedAt },
  };
}

const fmtDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default async function PlaybookPage({ params }: PageProps<"/playbooks/[slug]">) {
  const p = getPlaybook((await params).slug);
  if (!p) notFound();
  const employee = p.employee ? getEmployee(p.employee) : undefined;
  const quoteHref = employee ? `/quote?employee=${employee.slug}` : `/quote${p.segment.length === 1 ? `?segment=${p.segment[0]}` : ""}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.publishedAt,
          dateModified: p.updatedAt,
          keywords: p.tags.join(", "),
          image: absoluteUrl(`/playbooks/${p.slug}/opengraph-image`),
          author: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/android-chrome-512x512.png") } },
          mainEntityOfPage: absoluteUrl(`/playbooks/${p.slug}`),
        }}
      />
      <Container className="py-12 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-subtle">
          <Link href="/playbooks" className="hover:text-title">
            Playbooks
          </Link>
        </nav>
        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <header>
              <div className="flex flex-wrap gap-2">
                {p.segment.map((s) => (
                  <Chip key={s} tone="accent">
                    {getSegment(s).name}
                  </Chip>
                ))}
              </div>
              <h1 className="mt-5 text-3xl leading-tight font-bold text-title text-balance sm:text-4xl">{p.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{p.description}</p>
              <p className="mt-4 text-sm text-subtle">
                Updated <time dateTime={p.updatedAt}>{fmtDate(p.updatedAt)}</time>
                {p.readingTime && p.readingTime !== "TBD" && <> · {p.readingTime}</>}
              </p>
            </header>
            {p.draft && (
              <p className="mt-8 rounded-lg border border-line-strong bg-card p-4 text-fg">{playbooksPage.draftNotice}</p>
            )}
            <div className="prose-ch mt-10 max-w-[68ch]">
              <MDXRemote source={p.body} components={mdxComponents(p.slug)} />
            </div>
            <section className="mt-14 rounded-2xl border border-line p-6 hero-glow sm:p-10">
              <h2 className="font-display text-xl font-bold text-title sm:text-2xl">{playbooksPage.endCta.heading}</h2>
              <p className="mt-3 text-muted">{playbooksPage.endCta.body}</p>
              <ButtonLink href={quoteHref} className="mt-6">
                {playbooksPage.endCta.quote}
              </ButtonLink>
            </section>
          </article>
          {employee && (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">{playbooksPage.sidebarHeading}</h2>
              <EmployeeCard employee={employee} />
            </aside>
          )}
        </div>
      </Container>
    </>
  );
}
