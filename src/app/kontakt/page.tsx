import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Interesse am ViGORE Club oder eine Frage zu einem Projekt? Schreib uns.",
};

export default function ContactPage() {
  return (
    <Section band="cream" className="!pt-16 md:!pt-24">
      <Container>
        <SectionHeader
          as="h1"
          label="Kontakt"
          heading="Schreib uns."
          lede="Ob dich der Club interessiert, du eine Frage zu einem Projekt hast oder wissen willst, was hier eigentlich läuft: melde dich."
        />

        {/* Direkter Draht und Standort als Reihe über die volle Inhaltsbreite –
            wie die Faktenreihe auf den Projektseiten, damit die Kontaktseite
            genauso breit auftritt wie der Rest der Website. */}
        <Reveal delay={220}>
          <div className="mt-14 flex flex-wrap justify-center gap-x-24 gap-y-8 border-y border-line py-10 text-center">
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
          <div className="mx-auto mt-14 max-w-3xl border border-line bg-surface p-6 text-left md:p-10">
            <InquiryForm topic="club" />
          </div>
        </Reveal>

        <Reveal delay={340}>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-muted">
            Wir sind wenige und lesen alles selbst. Es kann ein paar Tage dauern
            – aber es kommt eine Antwort.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
