import { Container, OutlineButton, Section, SectionHeader } from "./ui";

/**
 * Der Schlussabschnitt der Projektübersicht und jeder einzelnen Projektseite –
 * wortgleich, deshalb hier einmal statt mehrfach.
 *
 * Bewusst breiter als „Mitglied werden": hier darf sich auch melden, wer nur
 * eine Idee hat und noch gar nicht dabei ist. Deshalb „Melde dich".
 */
export default function ProjectsCta() {
  return (
    <Section band="espresso">
      <Container>
        <SectionHeader
          label="Sei dabei!"
          heading="Dabei sein – oder selbst etwas anstossen?"
          lede="Wenn du bei einem Projekt mitanpacken willst oder eine Idee hast, die zu uns passt: melde dich bei uns."
          action={
            <OutlineButton href="/kontakt" tone="light">
              Melde dich
            </OutlineButton>
          }
        />
      </Container>
    </Section>
  );
}
