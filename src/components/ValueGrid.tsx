import Reveal from "./Reveal";
import type { Value } from "@/content/club";

/**
 * Das Raster der Werte – auf der Startseite und auf /club dasselbe, deshalb
 * hier einmal statt zweimal.
 *
 * Über jedem Wert steht eine kurze Messinglinie: dasselbe Motiv wie das
 * Ornament der Abschnittsmarken, nur einzeln und kleiner. Ohne sie waren die
 * sechs Einträge eine Wand aus gleich aussehenden Textblöcken; die Linien
 * geben dem Raster einen Takt und binden es an die Bildsprache der Seite.
 *
 * Beim Überfahren wächst die Linie ein Stück. Ein kleiner Gruss, mehr nicht –
 * die Einträge sind bewusst nicht anklickbar.
 */
export default function ValueGrid({ values }: { values: Value[] }) {
  return (
    <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value, i) => (
        <Reveal key={value.title} delay={i * 70} className="value-item text-center">
          <span
            aria-hidden
            className="ornament-rule ornament-rule--center mx-auto block"
          />
          <h3 className="display-4 mt-5">{value.title}</h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {value.body}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
