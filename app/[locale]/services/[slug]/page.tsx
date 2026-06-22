import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { t, type Lang } from "../../../i18n";
import { services, getServiceBySlug } from "../../../services-data";
import Nav from "../../../components/Nav";
import ContactCTA from "../../../components/ContactCTA";
import Footer from "../../../components/Footer";
import { JsonLd } from "../../../components/JsonLd";
import ServicePageClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = (locale === "es" ? "es" : "en") as Lang;
  const svc = getServiceBySlug(slug);
  if (!svc) return {};

  return {
    title: `${t(lang, svc.pageTitleKey)} — Chanium`,
    description: t(lang, svc.pageMetaKey),
    alternates: {
      canonical: `https://chanium.com/${lang}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        es: `/es/services/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "es"]) {
    for (const svc of services) {
      params.push({ locale, slug: svc.slug });
    }
  }
  return params;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = (locale === "es" ? "es" : "en") as Lang;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: t(lang, svc.pageTitleKey),
          description: t(lang, svc.pageMetaKey),
          provider: {
            "@type": "Organization",
            name: "Chanium",
            url: "https://chanium.com",
          },
          serviceType: "Software Development",
          areaServed: "Worldwide",
        }}
      />
      <Nav locale={lang} />
      <main style={{ display: "block" }}>
        <article>
          {/* Hero */}
          <section
            className="relative flex flex-col justify-center"
            style={{
              minHeight: "60vh",
              padding: "180px clamp(20px,5vw,72px) clamp(60px,8vh,100px)",
            }}
            aria-label="Service hero"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 60%, rgba(79,123,255,0.05), rgba(5,5,5,0) 70%)",
              }}
            />
            <div className="relative mx-auto w-full" style={{ maxWidth: 1180 }}>
              <Link
                href={`/${lang}#services`}
                className="no-underline inline-block"
                style={{
                  fontSize: 13,
                  letterSpacing: "1px",
                  color: "#8A8F98",
                  marginBottom: 32,
                  transition: "color .3s",
                }}
              >
                {t(lang, "svc.back")}
              </Link>
              <div
                style={{
                  fontSize: 13,
                  color: "#3f4650",
                  letterSpacing: "1px",
                  marginBottom: 18,
                }}
              >
                {svc.num}
              </div>
              <h1
                className="m-0 font-bold"
                style={{
                  fontSize: "clamp(36px,6vw,72px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  color: "#F4F5F7",
                }}
              >
                {t(lang, svc.pageTitleKey)}
              </h1>
              <p
                style={{
                  margin: "28px 0 0",
                  maxWidth: 620,
                  fontSize: "clamp(16px,1.8vw,20px)",
                  lineHeight: 1.6,
                  color: "#8A8F98",
                }}
              >
                {t(lang, svc.pageSubKey)}
              </p>
            </div>
          </section>

          {/* Content sections */}
          {svc.sections.map((section, i) => (
            <section
              key={i}
              className="svc-section"
              style={{
                padding: "clamp(50px,8vh,90px) clamp(20px,5vw,72px)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
              aria-label={t(lang, section.titleKey)}
            >
              <div className="mx-auto" style={{ maxWidth: 1180 }}>
                <div
                  className="grid grid-cols-1 md:grid-cols-[280px_1fr] items-start"
                  style={{ gap: "clamp(24px,4vw,60px)" }}
                >
                  <h2
                    className="m-0 font-bold"
                    style={{
                      fontSize: "clamp(22px,2.6vw,32px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "#F4F5F7",
                    }}
                  >
                    {t(lang, section.titleKey)}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      maxWidth: 640,
                      fontSize: "clamp(15px,1.6vw,18px)",
                      lineHeight: 1.7,
                      color: "#8A8F98",
                    }}
                  >
                    {t(lang, section.bodyKey)}
                  </p>
                </div>
              </div>
            </section>
          ))}

          {/* Benefits */}
          <section
            style={{
              padding: "clamp(50px,8vh,90px) clamp(20px,5vw,72px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
            aria-label="Benefits"
          >
            <div className="mx-auto" style={{ maxWidth: 1180 }}>
              <h2
                className="m-0 font-bold"
                style={{
                  fontSize: "clamp(22px,2.6vw,32px)",
                  letterSpacing: "-0.01em",
                  color: "#F4F5F7",
                  marginBottom: "clamp(28px,4vh,48px)",
                }}
              >
                {t(lang, "svc.benefits")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
                {svc.benefits.map((bKey, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4"
                    style={{
                      padding: "clamp(20px,3vw,32px)",
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ color: "#4F7BFF", fontSize: 18, lineHeight: 1.4 }}>✓</span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "#C8CDD2",
                      }}
                    >
                      {t(lang, bKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>

        <ContactCTA locale={lang} />
      </main>
      <Footer locale={lang} />
      <ServicePageClient />
    </>
  );
}
