import Reveal from "./Reveal";
import { CheckIcon, CrossIcon } from "./icons";
import { Container, Section, SectionHeader } from "./ui";
import { fit } from "@/content/club";

/**
 * „Ob das etwas für dich ist" – die Gegenüberstellung.
 *
 * Steht auf der Startseite und auf /club jeweils als zweitletzter Abschnitt,
 * deshalb hier einmal statt zweimal. Nur die Nummer der Abschnittsmarke
 * unterscheidet sich; Überschrift, Vorspann und Inhalt sind auf beiden Seiten
 * gleich und sollen es auch bleiben.
 *
 * Zwei Spalten nebeneinander, auf dem Handy untereinander. Die Überschriften
 * sitzen auf der Mittelachse, die Punkte selbst sind linksbündig –
 * Aufzählungen liest man am Rand, nicht mittig.
 */
export default function FitSection({ number }: { number?: string }) {
  const spalten = [
    { ...fit.yes, Icon: CheckIcon, ton: "text-forest" },
    { ...fit.no, Icon: CrossIcon, ton: "text-muted" },
  ];

  return (
    <Section band="paper">
      <Container>
        <SectionHeader
          number={number}
          label="Für wen"
          heading="Ob das etwas für dich ist"
          lede="Wir sind nicht für jeden – das ist keine Koketterie, sondern spart beiden Seiten Zeit. Hier die ehrliche Fassung."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {spalten.map((spalte, i) => (
            <Reveal key={spalte.title} delay={i * 90}>
              <div className="flex h-full flex-col border border-line bg-surface p-7 md:p-9">
                <div className="flex items-center justify-center gap-3">
                  <spalte.Icon className={`h-5 w-5 shrink-0 ${spalte.ton}`} />
                  <h3 className="display-4">{spalte.title}</h3>
                </div>

                <ul className="mt-8 space-y-5 text-left">
                  {spalte.items.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-3 h-px w-4 shrink-0 bg-accent/50"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
