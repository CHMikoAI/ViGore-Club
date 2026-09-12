/**
 * Inhalte des Mitgliederbereichs – genauer: seiner Tür unter /mitglieder.
 * Der geschützte Bereich dahinter kommt später; was hier steht, betrifft
 * die Anmeldung und die Bewerbung.
 */

/**
 * So läuft eine Bewerbung ab. Steht auf /mitglieder neben dem Login, damit
 * niemand ins Leere schreibt: Wer sich meldet, weiss vorher, was folgt.
 */
export const applicationSteps: { title: string; body: string }[] = [
  {
    title: "Du schreibst uns",
    body: "Wer du bist, was dich hierher bringt, was du anpacken willst. Ein paar ehrliche Sätze – kein Lebenslauf.",
  },
  {
    title: "Wir lernen uns kennen",
    body: "Wir melden uns persönlich und treffen uns. Am liebsten bei einem Projekt, nicht im Sitzungszimmer.",
  },
  {
    title: "Dann entscheiden beide",
    body: "Passt es für dich und für uns, bist du dabei. Wenn nicht, sagen wir es dir ehrlich – und du uns auch.",
  },
];
