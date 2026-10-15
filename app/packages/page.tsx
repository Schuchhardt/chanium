import { packagesPage, listedPackages } from "@/content/packages";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Container, H1, Section, SectionHeading } from "@/components/ui";
import { FinalCta, GuaranteePanel, PackageCard } from "@/components/sections/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata = pageMetadata({ ...packagesPage.seo, path: "/packages" });

const priceNumber = (price: string) => Number(price.replace(/[^0-9–-]/g, "").split(/[–-]/)[0]) || undefined;

export default function PackagesPage() {
  return (
    <>
      {listedPackages.map((pkg) => (
        <JsonLd
          key={pkg.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: pkg.name,
            description: pkg.outcome,
            provider: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
            areaServed: "US",
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: priceNumber(pkg.price),
              description: `${pkg.price} · ${pkg.timeline}`,
              url: absoluteUrl("/quote"),
            },
          }}
        />
      ))}
      <section className="hero-glow">
        <Container className="pt-16 pb-10 sm:pt-28 sm:pb-14">
          <H1 className="max-w-4xl">{packagesPage.h1}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{packagesPage.subline}</p>
        </Container>
      </section>
      <Section className="pt-4! sm:pt-6!">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {listedPackages.map((pkg) => (
            <li key={pkg.slug}>
              <PackageCard pkg={pkg} cta={packagesPage.cardCta} />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <GuaranteePanel heading={home.guarantee.h2} points={home.guarantee.points} />
        </div>
      </Section>
      <Section>
        <SectionHeading title="Questions" />
        <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {packagesPage.faq.map((item) => (
            <div key={item.q}>
              <dt className="text-lg font-semibold text-title">{item.q}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={home.finalCta.primary} />
      </Section>
    </>
  );
}
