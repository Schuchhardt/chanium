import { employeesPage, employees } from "@/content/employees";
import { home } from "@/content/home";
import { Container, H1, Section } from "@/components/ui";
import { EmployeeGrid, FinalCta } from "@/components/sections/Blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...employeesPage.seo, path: "/ai-employees" });

export default function EmployeesPage() {
  const available = employees.filter((e) => e.status === "available");
  const soon = employees.filter((e) => e.status === "coming-soon");
  return (
    <>
      <section className="hero-glow">
        <Container className="pt-16 pb-10 sm:pt-28 sm:pb-14">
          <H1 className="max-w-4xl">{employeesPage.h1}</H1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{employeesPage.subline}</p>
        </Container>
      </section>
      <Section className="pt-4! sm:pt-6!" aria-labelledby="available">
        <h2 id="available" className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-subtle">
          {employeesPage.statusLabels.available}
        </h2>
        <EmployeeGrid employees={available} />
        <h2 className="mt-14 mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-subtle">
          {employeesPage.statusLabels["coming-soon"]}
        </h2>
        <EmployeeGrid employees={soon} />
      </Section>
      <Section>
        <FinalCta heading={home.finalCta.h2} body={home.finalCta.body} cta={home.finalCta.primary} />
      </Section>
    </>
  );
}
