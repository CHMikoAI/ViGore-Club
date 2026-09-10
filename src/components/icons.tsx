/**
 * Die paar Icons, die die Seite braucht – als Strichzeichnungen im gleichen
 * Duktus wie der Rest (1.5px, runde Enden).
 *
 * Bewusst von Hand statt aus einer Icon-Bibliothek: Marken-Icons sind aus
 * lucide entfernt worden, und für zwei Symbole lohnt keine Abhängigkeit.
 */

type IconProps = { className?: string };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** Häkchen für die „passt"-Spalte. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}

/** Kreuz für die „passt eher nicht"-Spalte. */
export function CrossIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}
