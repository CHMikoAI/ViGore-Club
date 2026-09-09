import { ButtonLink, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section band="cream" className="!pt-24 md:!pt-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="display-2 mt-6">Diese Seite gibt es nicht.</h1>
          <p className="lede mx-auto mt-6">
            Vielleicht ist sie umgezogen, vielleicht hat sie nie existiert.
            Zurück auf festen Boden:
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/">Zur Startseite</ButtonLink>
            <ButtonLink href="/projekte" variant="ghost">
              Projekte
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
