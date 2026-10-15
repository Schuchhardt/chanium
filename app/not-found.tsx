import { ButtonLink, Container, H1 } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-sm text-subtle">404</p>
      <H1 className="mt-3">This page moved or never existed.</H1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        Chanium now builds AI operations for real estate teams. Start from the home page or get a fixed quote.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/quote" variant="secondary">
          Get a fixed quote
        </ButtonLink>
      </div>
    </Container>
  );
}
