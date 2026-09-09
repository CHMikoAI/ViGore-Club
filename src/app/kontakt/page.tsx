import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Interesse am ViGORE Club oder eine Frage zu einem Projekt? Schreib uns – ein paar Zeilen reichen.",
};

export default function ContactPage() {
  return (
    <Section band="cream" className="!pt-16 md:!pt-24">
      <Container>
        <SectionHeader
          as="h1"
          label="Kontakt"
          heading="Schreib uns."
          lede="Ob dich der Club interessiert, du eine Frage zu einem Projekt hast oder wissen willst, was hier eigentlich läuft: melde dich. Ein paar Zeilen reichen."
        />

        {/* Direkter Draht und Standort als mittige Reihe über dem Formular –
            statt einer Spalte daneben, die die Achse gebrochen hätte. */}
        <Reveal delay={220}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-x-16 gap-y-8 border-y border-line py-8 text-center">
            <div>
              <p className="eyebrow">Direkt</p>
              <a
                href={`mailto:${site.email}`}
                className="link-quiet mt-2 inline-block text-[1.0625rem]"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">Wo wir sind</p>
              <p className="mt-2 text-[1.0625rem] text-muted">{site.location}</p>
            </div>
          </div>
        </Reveal>

        {/* Das Formular bleibt linksbündig gesetzt: Beschriftungen über Feldern
            liest man am Rand, nicht auf einer Achse. Nur die Spalte selbst
            sitzt mittig. */}
        <Reveal delay={280}>
          <div className="mx-auto mt-14 max-w-xl border border-line bg-surface p-6 text-left md:p-9">
            <InquiryForm topic="club" />
          </div>
        </Reveal>

        <Reveal delay={340}>
          <p className="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-muted">
            Wir sind wenige und lesen alles selbst. Es kann ein paar Tage dauern
            – aber es kommt eine Antwort.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
