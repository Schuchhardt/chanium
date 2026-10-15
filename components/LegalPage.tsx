import type { LegalDoc } from "@/content/legal";
import { Container, H1 } from "./ui";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Container className="max-w-3xl! py-16 sm:py-24">
      <H1>{doc.title}</H1>
      <p className="mt-4 text-sm text-subtle">Last updated {doc.updatedAt}</p>
      <div className="prose-ch mt-10">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Container>
  );
}
