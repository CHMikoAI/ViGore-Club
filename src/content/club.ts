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
    when: "Mehrmals im Jahr",
    what: "Projektwochenenden",
    body: "Ein bis zwei Tage draussen, an einem echten Vorhaben. Das ist der Kern des Ganzen.",
  },
];

/**
 * Abgrenzung. Das war auf der alten Seite gut und bleibt: es schärft das
 * Profil und schützt die, die eigentlich etwas anderes brauchen.
 */
export const notThis: string[] = [
  "Kein Therapieangebot",
  "Kein Coaching-Programm",
  "Kein Netzwerk zum Visitenkartentausch",
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
