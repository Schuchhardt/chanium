import type { Metadata } from "next";
import { dict, type Lang } from "../i18n";
import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import StatementSection from "../components/StatementSection";
import ServicesGrid from "../components/ServicesGrid";
import ProductsSection from "../components/ProductsSection";
import HowWeWork from "../components/HowWeWork";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";
import { JsonLd } from "../components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locale === "es" ? "es" : "en") as Lang;
  return {
    title:
      lang === "es"
        ? "Chanium — Construye una vez. Escala para siempre."
        : "Chanium — Build once. Scale forever.",
    description: dict[lang]["hero.sub"],
    alternates: {
      canonical: `https://chanium.com/${lang}`,
      languages: { en: "/en", es: "/es" },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "es" ? "es" : "en") as Lang;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Chanium",
          url: "https://chanium.com",
          description: dict[lang]["hero.sub"],
          contactPoint: {
            "@type": "ContactPoint",
            email: "hello@chanium.com",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Chanium",
          url: "https://chanium.com",
          inLanguage: lang,
        }}
      />
      <Nav locale={lang} />
      <main style={{ display: "block" }}>
        <HeroSection locale={lang} />
        <StatementSection locale={lang} />
        <ServicesGrid locale={lang} />
        <ProductsSection locale={lang} />
        <HowWeWork locale={lang} />
        <ContactCTA locale={lang} />
      </main>
      <Footer />
    </>
  );
}
