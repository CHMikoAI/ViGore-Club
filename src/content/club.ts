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
 * Für wen der Club ist – und für wen eher nicht.
 *
 * Der Gedanke stammt von der bisherigen Website, der Ton nicht: dort stand
 * eine feierliche Eignungsprüfung. Hier darf durchscheinen, dass das Ganze
 * auch Spass machen soll. Die inhaltlich wichtigen Punkte sind trotzdem alle
 * drin – vor allem die Grenze zur Therapie, die klar und ohne Zwinkern
 * dasteht.
 */
export const fit = {
  yes: {
    title: "Du passt zu uns, wenn …",
    items: [
      "du gern anpackst – auch wenn es regnet und niemand zuschaut.",
      "du zuverlässig bist. Zusagen sind bei uns keine Absichtserklärungen.",
      "du auch mal sagen kannst, dass es gerade nicht läuft.",
      "du dich für Trüffel, Most und das, was als Nächstes kommt, begeistern kannst.",
      "du eine ehrliche Rückfrage aushältst, ohne sie krummzunehmen.",
    ],
  },
  no: {
    title: "… eher nicht, wenn …",
    items: [
      "du gerade eine Therapie brauchst. Dafür gibt es Fachleute, und die können das besser als wir.",
      "du auf ein Programm wartest, das dich in zwölf Wochen umbaut.",
      "du lieber zuschaust. Zuschauer hat jeder von uns genug im Leben.",
      "du hier Visitenkarten verteilen möchtest.",
      "dir Erde unter den Fingernägeln grundsätzlich zuwider ist.",
    ],
  },
};

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
  names: ["Gianluca", "Leonardo", "Mirko"],
  image: "/images/allgemein/gruender.jpg",
  vision: [
    "Wir drei kannten dasselbe Gefühl: viele Leute um sich herum – und trotzdem niemanden, mit dem man über das redet, was einen wirklich beschäftigt. Nicht aus bösem Willen. Es ergibt sich einfach nicht.",
    "Irgendwann haben wir aufgehört, darauf zu warten, dass es sich ergibt. Der ViGORE Club ist das, was daraus geworden ist: ein fester Kreis, in dem man sich kennt, weil man miteinander arbeitet – und in dem gefragt wird, wie es einem geht, auch wenn die Antwort länger dauert als ein Satz.",
    "Wir wollen keinen grossen Club. Wir wollen einen, auf den Verlass ist.",
  ],
};
