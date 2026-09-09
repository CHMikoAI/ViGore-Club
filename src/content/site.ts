/**
 * Globale Angaben zur Seite – Kontakt, Navigation, Social Media.
 * Alles, was an mehreren Stellen auftaucht, steht hier genau einmal.
 */

export const site = {
  name: "ViGORE Club",
  /* Wird als <title>-Zusatz und in der Suchmaschine verwendet. */
  tagline: "Männerclub in Graubünden",
  description:
    "Ein Kreis von Männern aus Graubünden. Wir nehmen uns echte Projekte vor – " +
    "und bauen dabei ein Vertrauen auf, das trägt.",
  url: "https://www.vigore-club.ch",
  email: "hallo@vigore-club.ch",
  location: "7000 Chur, Graubünden",
} as const;

/**
 * Social Media. `href: null` heisst: Icon wird angezeigt, ist aber noch nicht
 * verlinkt. Sobald die Kanäle stehen, hier einfach die URL eintragen – der
 * Rest passiert von selbst.
 */
export const socials: { name: "instagram" | "linkedin"; label: string; href: string | null }[] = [
  { name: "instagram", label: "Instagram", href: null },
  { name: "linkedin", label: "LinkedIn", href: null },
];

/**
 * Hauptnavigation. Steht rechts im Header, das Logo links – auf dem Handy
 * als Vollflächen-Menü.
 */
export const navigation = [
  { href: "/club", label: "Der Club" },
  { href: "/projekte", label: "Projekte" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;
