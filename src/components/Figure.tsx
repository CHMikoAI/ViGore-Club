import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "./Reveal";

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
 * Der Existenz-Check läuft auf dem Server zur Renderzeit. Damit er auch auf
 * Vercel funktioniert, ist public/images in next.config.ts unter
 * `outputFileTracingIncludes` eingetragen.
 */

/** "fill" füllt das übergeordnete Element aus – für Vollbild-Abschnitte. */
type Ratio = "16/9" | "3/2" | "4/3" | "1/1" | "4/5" | "3/4" | "21/9" | "fill";

type Props = {
  /** Pfad ab public/, also mit führendem Slash: "/images/…". */
  src: string;
  alt: string;
  ratio?: Ratio;
  className?: string;
  /** Für das erste Bild über der Falz – lädt bevorzugt, keine Lazy-Ladung. */
  priority?: boolean;
  /** Breiten-Hinweis für die Bildauswahl. Standard passt für halbe Breite. */
  sizes?: string;
  /** Auf false setzen, wenn das Bild ohne Einblenden erscheinen soll. */
  reveal?: boolean;
  delay?: number;
};

const RATIO_CLASS: Record<Ratio, string> = {
  "16/9": "aspect-[16/9] relative",
  "3/2": "aspect-[3/2] relative",
  "4/3": "aspect-[4/3] relative",
  "1/1": "aspect-square relative",
  "4/5": "aspect-[4/5] relative",
  "3/4": "aspect-[3/4] relative",
  "21/9": "aspect-[21/9] relative",
  fill: "absolute inset-0",
};

function imageExists(src: string): boolean {
  // Nur Pfade aus den eigenen Inhaltsdateien, trotzdem eng gehalten.
  if (!src.startsWith("/") || src.includes("..")) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/**
 * Vier warme Töne, deterministisch aus dem Pfad gewählt. Eine Galerie aus
 * Platzhaltern soll nach Bildern aussehen, nicht nach einer grauen Wand.
 */
const PLACEHOLDER_TONES = ["#efe6d7", "#e9dccb", "#e4dbcd", "#ece2d2"];

function toneFor(src: string): string {
  let hash = 0;
  for (let i = 0; i < src.length; i++) hash = (hash * 31 + src.charCodeAt(i)) | 0;
  return PLACEHOLDER_TONES[Math.abs(hash) % PLACEHOLDER_TONES.length];
}

export default function Figure({
  src,
  alt,
  ratio = "3/2",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  reveal = true,
  delay = 0,
}: Props) {
  const exists = imageExists(src);
  const shape = `${RATIO_CLASS[ratio]} overflow-hidden`;

  const inner = exists ? (
    <div className={`${shape} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className={`${shape} ${className} flex items-center justify-center border border-dashed border-brass/35`}
      style={{ backgroundColor: toneFor(src) }}
      role="img"
      aria-label={`Platzhalter für: ${alt}`}
    >
      {/* Feine Diagonalschraffur – gibt der Fläche Textur statt Leere. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #332419 0 1px, transparent 1px 9px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#332419"
          strokeWidth="1"
          className="h-6 w-6 opacity-40"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m3 16 5-4 4 3 3.5-3L21 16" />
        </svg>
        <span
          className="text-[10px] leading-relaxed tracking-wide text-espresso/55"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          {src.replace(/^\//, "")}
        </span>
      </div>
    </div>
  );

  if (!reveal) return inner;

  return (
    <Reveal variant="image" delay={delay}>
      {inner}
    </Reveal>
  );
}
