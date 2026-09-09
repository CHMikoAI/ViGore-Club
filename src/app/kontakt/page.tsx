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

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal delay={180}>
              <div className="space-y-6 border-t border-line pt-8">
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
                  <p className="mt-2 text-[1.0625rem] text-muted">
                    {site.location}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-10 max-w-lg text-sm leading-relaxed text-muted">
                Wir sind wenige und lesen alles selbst. Es kann ein paar Tage
                dauern – aber es kommt eine Antwort.
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="border border-line bg-surface p-6 md:p-9">
              <InquiryForm topic="club" />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
