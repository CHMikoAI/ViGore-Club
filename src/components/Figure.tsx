import FigureView, { type FigureViewProps } from "./FigureView";
import Reveal from "./Reveal";
import { imageExists } from "@/lib/images";

/**
 * Ein Bild – oder, solange es noch keines gibt, ein Platzhalter, auf dem der
 * erwartete Dateiname steht.
 *
 * ── So fügst du ein Bild ein ───────────────────────────────────────────────
 * Auf dem Platzhalter steht ein Pfad, zum Beispiel
 *     images/projekte/most-hero.jpg
 * Leg die Datei genau dort ab (also in public/images/projekte/most-hero.jpg)
 * und lade die Seite neu. Mehr ist nicht nötig – kein Code, keine Einstellung.
 *
 * Figure prüft auf dem Server, ob die Datei da ist (src/lib/images.ts), und
 * blendet das Bild beim Erscheinen ein. Die Darstellung selbst steckt in
 * FigureView – die Galerie im Verlauf benutzt sie direkt, weil sie ihre
 * Bilder anklickbar macht und dafür im Browser laufen muss.
 */

type Props = Omit<FigureViewProps, "exists"> & {
  /** Auf false setzen, wenn das Bild ohne Einblenden erscheinen soll. */
  reveal?: boolean;
  delay?: number;
};

export default function Figure({ reveal = true, delay = 0, ...view }: Props) {
  const inner = <FigureView {...view} exists={imageExists(view.src)} />;

  if (!reveal) return inner;

  return (
    <Reveal variant="image" delay={delay}>
      {inner}
    </Reveal>
  );
}
