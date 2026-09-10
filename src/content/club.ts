/**
 * Inhalte rund um den Club selbst – Werte, Rhythmus, Haltung.
 * Wird auf der Startseite (Auszug) und auf /club (vollständig) verwendet.
 */

export type Value = {
  title: string;
  body: string;
};

export const values: Value[] = [
  {
    title: "Verantwortung",
    body: "Für das eigene Leben, die eigenen Entscheidungen, die eigenen Ergebnisse. Auch dann, wenn es unbequem wird.",
  },
  {
    title: "Ehrlichkeit",
    body: "Wir sagen, was ist. Freundlich im Ton, klar in der Sache – auch wenn Schweigen einfacher wäre.",
  },
  {
    title: "Verlässlichkeit",
    body: "Zugesagt heisst gekommen. Ein Club steht und fällt damit, dass man sich aufeinander verlassen kann.",
  },
  {
    title: "Mut",
    body: "Sich dem stellen, was Mühe macht. Und zugeben dürfen, dass es Mühe macht.",
  },
  {
    title: "Brüderlichkeit",
    body: "Ehrliches Feedback, wenn es nötig ist. Und jemand, der mitanpackt, wenn es nötig ist.",
  },
  {
    title: "Wachstum",
    body: "Nicht in allem und nicht sofort. Aber stetig, und so, dass man es nach einem Jahr sieht.",
  },
];

/**
 * Der Rhythmus macht den Club greifbar: kein Programm, sondern ein Takt.
 */
export const rhythm: { when: string; what: string; body: string }[] = [
  {
    when: "Wöchentlich",
    what: "Padel",
    body: "Fixer Termin auf dem Platz. Kein Anlass nötig, keine Anmeldung, keine Agenda.",
  },
  {
    when: "Monatlich",
    what: "Clubabend",
    body: "Wir setzen uns zusammen. Es gibt ein Thema – und keinen Zwang, etwas vorzuweisen.",
  },
  {
    when: "Je nach Bedarf",
    what: "Projektarbeit",
    body: "Wenn ein Projekt etwas braucht, wird angepackt. Mal ein Nachmittag, mal ein ganzes Wochenende – der Kern des Ganzen.",
  },
  {
    when: "Einmal im Jahr",
    what: "Clubausflug",
    body: "Mindestens einmal jährlich mehrere Tage weg. Genug Zeit, dass die Gespräche über den Small Talk hinauskommen.",
  },
];

/**
 * Abgrenzung. Ehrlich, aber nicht defensiv: kurze Feststellungen statt einer
 * Liste von Absagen, und danach in eigenen Worten, was der Club stattdessen
 * ist.
 */
export const notThis: string[] = [
  "Keine Therapie",
  "Kein Coaching",
  "Kein Business-Netzwerk",
];

/** Steht unter der Abgrenzungsliste. */
export const notThisNote: string[] = [
  "Wir sind keine Fachleute und tun auch nicht so. Wenn es jemandem richtig schlecht geht, gehört er zu jemandem, der das gelernt hat. Das auszusprechen ist für uns keine Schwäche, sondern der ehrlichere Weg.",
  "Was wir sind: eine Handvoll Männer, die sich regelmässig sehen, gemeinsam etwas auf die Beine stellen und mitbekommen, wenn es beim anderen gerade nicht läuft. Das klingt unspektakulär. Es ist erstaunlich selten.",
];

/**
 * Die drei Schritte des Ansatzes – auf der Startseite mit grossen Ziffern.
 */
export const approach: { title: string; body: string }[] = [
  {
    title: "Anpacken",
    body: "Projekte, die man anfassen kann. Die Zeit kosten, dreckig machen und ohne uns nicht entstehen würden.",
  },
  {
    title: "Vertrauen",
    body: "Wer stundenlang nebeneinander arbeitet, redet irgendwann anders miteinander. Nicht, weil es jemand vorgibt.",
  },
  {
    title: "Rückhalt",
    body: "Und dann ist da ein Kreis, in dem man auch sagen kann, dass es gerade nicht läuft. Darum geht es am Ende.",
  },
];

export const quote = {
  text: "Waste no more time arguing what a good man should be. Be one.",
  author: "Marcus Aurelius",
  role: "Römischer Kaiser",
};

/**
 * Die harten Zahlen. Bewusst knapp – vier Mitglieder sind keine Schwäche,
 * sondern genau die Aussage, die der Club treffen will.
 *
 * Bitte aktuell halten: die Mitgliederzahl ist das Erste, was auffällt, wenn
 * sie nicht mehr stimmt.
 */
export const facts: { label: string; value: string }[] = [
  { label: "Mitglieder", value: "4" },
  { label: "Gegründet", value: "2026" },
  { label: "Region", value: "Graubünden" },
];

/**
 * Die Gründer. Bild und Text stehen auf /club.
 */
export const founders = {
  names: ["Gianluca", "Leo", "Mirko"],
  image: "/images/club/gruender.jpg",
  vision: [
    "Wir drei kannten dasselbe Gefühl: viele Leute um sich herum – und trotzdem niemanden, mit dem man über das redet, was einen wirklich beschäftigt. Nicht aus bösem Willen. Es ergibt sich einfach nicht.",
    "Irgendwann haben wir aufgehört, darauf zu warten, dass es sich ergibt. Der ViGORE Club ist das, was daraus geworden ist: ein fester Kreis, in dem man sich kennt, weil man miteinander arbeitet – und in dem gefragt wird, wie es einem geht, auch wenn die Antwort länger dauert als ein Satz.",
    "Wir wollen keinen grossen Club. Wir wollen einen, auf den Verlass ist.",
  ],
};
