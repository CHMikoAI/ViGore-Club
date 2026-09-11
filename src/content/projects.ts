/**
 * Die Projekte des Clubs – und alles, was dazugehört.
 *
 * Es gibt keinen getrennten Journal-Bereich mehr. Was passiert, steht als
 * Update direkt beim jeweiligen Projekt. Ein Projekt erzählt damit seine
 * eigene Geschichte von oben nach unten: worum es geht, und was seither
 * passiert ist.
 *
 * ── Ein Update schreiben ───────────────────────────────────────────────────
 * Beim passenden Projekt oben in `updates` einen Eintrag ergänzen. Sortiert
 * wird automatisch nach Datum, das Neueste steht oben. Auf der Projektseite
 * erscheint es sofort, und die Projektkarte zeigt das Datum des letzten
 * Updates.
 *
 * ── Ein neues Projekt ──────────────────────────────────────────────────────
 * Einen Eintrag unten ergänzen. Es taucht automatisch auf /projekte, auf der
 * Startseite und unter /projekte/<slug> auf. Mit Status "coming-soon" nur
 * als Karte, ohne Seite.
 *
 * Padel ist bewusst KEIN Projekt – es ist ein Rhythmus und steht auf /club
 * unter „Was fest im Kalender steht" (src/content/club.ts).
 *
 * ── Bilder ─────────────────────────────────────────────────────────────────
 * Jedes Projekt hat seinen eigenen Ordner unter public/images/projekte/<slug>/:
 *   hero.jpg              Kopfbild (Karte und Detailseite)
 *   galerie-01.jpg …      Galerie auf der Detailseite
 *   2026-09-06-01.jpg …   Bilder zu einem Update, mit dem Datum des Updates
 * Solange eine Datei fehlt, zeigt die Seite einen Platzhalter mit dem
 * erwarteten Pfad. Datei ablegen, neu laden, fertig.
 */

export type ProjectStatus = "laufend" | "bald" | "coming-soon";

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  laufend: "Laufend",
  bald: "Bald erhältlich",
  "coming-soon": "Coming soon",
};

/** Ein datierter Eintrag zu einem Projekt – das, was früher das Journal war. */
export type Update = {
  /** ISO-Format YYYY-MM-DD. */
  date: string;
  title: string;
  body: string[];
  images: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Eine Zeile unter dem Titel. Knapp, konkret, kein Werbetext. */
  tagline: string;
  status: ProjectStatus;
  /** Der Satz auf der Karte in der Übersicht. */
  summary: string;
  hero: string;
  gallery: string[];
  /** Vorspann auf der Detailseite. */
  intro: string;
  /** Der Fliesstext, Abschnitt für Abschnitt. */
  sections: { heading: string; body: string[] }[];
  /** Kleine Faktenspalte neben dem Text. Leer lassen ist erlaubt. */
  facts: { label: string; value: string }[];
  /** Was seither passiert ist. Neueste zuerst – die Sortierung macht der Code. */
  updates: Update[];
};

export const projects: Project[] = [
  {
    slug: "trueffelplantage",
    title: "Trüffelplantage",
    tagline: "Bündner Trüffel, von uns gesetzt",
    status: "laufend",
    summary:
      "Unser erstes Projekt. Eine Plantage in Graubünden, von Hand gepflanzt – " +
      "mit einem Ergebnis, auf das wir Jahre warten.",
    hero: "/images/projekte/trueffelplantage/hero.jpg",
    gallery: [
      "/images/projekte/trueffelplantage/galerie-01.jpg",
      "/images/projekte/trueffelplantage/galerie-02.jpg",
      "/images/projekte/trueffelplantage/galerie-03.jpg",
    ],
    intro: "Trüffel belohnen keine Ungeduld. Genau deshalb standen sie am Anfang.",
    sections: [
      {
        heading: "Warum ausgerechnet Trüffel",
        body: [
          "Wir wollten kein Projekt, das man an einem Wochenende abhaken kann. Sondern eines, bei dem sich Sorgfalt erst Jahre später auszeigt – und bei dem man in der Zwischenzeit trotzdem regelmässig hinfahren muss.",
          "Eine Trüffelplantage ist genau das. Zwischen dem Setzen und der ersten Ernte liegt eine lange Strecke, auf der es nichts zu feiern gibt. Wer da dranbleibt, meint es ernst.",
        ],
      },
      {
        heading: "Was steht",
        body: [
          "Eine Fläche in Graubünden, Boden untersucht und vorbereitet, Bäume von Hand gesetzt. An einem Wochenende, an das sich jeder erinnert.",
          "Seither gehört die Plantage zum Takt des Clubs. Einer fährt raus, schaut nach dem Rechten, schickt Bilder in die Gruppe. Unspektakulär – und genau deshalb verbindend.",
        ],
      },
      {
        heading: "Wie es weitergeht",
        body: [
          "Die nächsten Jahre gehören dem Pflegen und dem Beobachten. Was passiert, halten wir unten fest. Auch das, was schiefgeht.",
          "Und irgendwann steht die erste Ernte an. Bündner Trüffel, von uns gesetzt.",
        ],
      },
    ],
    facts: [
      { label: "Stand", value: "Laufend" },
      { label: "Ort", value: "Graubünden" },
      { label: "Rolle", value: "Erstes Clubprojekt" },
      { label: "Horizont", value: "Mehrere Jahre" },
    ],
    updates: [
      {
        date: "2026-07-19",
        title: "Zwischenstand auf der Plantage",
        body: [
          "Es gibt Projekte, bei denen man nach einem Jahr etwas vorzeigen kann. Und es gibt Trüffel.",
          "Wir waren draussen, haben nach den Bäumen geschaut, dokumentiert, nachkorrigiert. Von aussen betrachtet: wenig. Für uns: der Beleg, dass wir immer noch hinfahren, auch wenn niemand zuschaut.",
        ],
        images: [],
      },
    ],
  },
  {
    slug: "most",
    title: "Der Most",
    tagline: "Äpfel gelesen, traditionell gepresst",
    status: "bald",
    summary:
      "Ein Wochenende in der Mosterei. Nach alter Art gepresst, bald im " +
      "Verkauf – der Erlös geht in die Clubkasse.",
    hero: "/images/projekte/most/hero.jpg",
    gallery: [
      "/images/projekte/most/galerie-01.jpg",
      "/images/projekte/most/galerie-02.jpg",
      "/images/projekte/most/galerie-03.jpg",
    ],
    intro:
      "Am Morgen auf der Wiese, am Nachmittag an der Presse. Ein Tag, an dem " +
      "niemand aufs Handy geschaut hat.",
    sections: [
      {
        heading: "Das Wochenende",
        body: [
          "Zu Gast in einer Mosterei, den Tag verbracht wie früher: vormittags Äpfel gelesen – gebückt, geschleppt, sortiert. Nachmittags an die Presse.",
          "Gemostet wurde nach traditioneller Art. Kein Knopfdruck, sondern Handarbeit, bei der man sieht und riecht, was passiert. Am Abend stand da etwas, das vorher nicht existiert hat.",
        ],
      },
      {
        heading: "Warum das kein Ausflug war",
        body: [
          "Gemeinsame Arbeit macht mit einer Gruppe etwas, das gemeinsames Reden nicht schafft. Man steht nebeneinander statt gegenüber, die Hände sind beschäftigt – und plötzlich laufen Gespräche, die am Tisch nie zustande gekommen wären.",
          "Das Projekt ist der Anlass. Was dabei zwischen uns entsteht, ist der Ertrag.",
        ],
      },
      {
        heading: "Bald erhältlich",
        body: [
          "Den Most verkaufen wir als Club. Der Erlös fliesst in die Kasse und damit direkt ins nächste Projekt.",
          "Wir sind in den letzten Zügen. Wenn du welchen willst, trag dich unten ein – wir melden uns, sobald er bereitsteht.",
        ],
      },
    ],
    facts: [
      { label: "Stand", value: "Bald erhältlich" },
      { label: "Machart", value: "Traditionell gepresst" },
      { label: "Erlös", value: "Geht in die Clubkasse" },
    ],
    updates: [
      {
        // ENTWURF – bitte in eure Worte bringen. Das Bild ist das Original.
        date: "2026-09-08",
        title: "Abgefüllt",
        body: [
          "Etikett drauf, Kisten gepackt, zurück über die Kantonsgrenze. Der Most steht jetzt da, wo er hingehört – in Graubünden.",
          "Was noch fehlt: der Weg zu euch. Bald.",
        ],
        images: ["/images/projekte/most/2026-09-08-01.jpg"],
      },
      {
        date: "2026-09-06",
        title: "Ein Tag in der Mosterei",
        body: [
          "Der Wecker war unangenehm früh, das Wetter unentschieden. Trotzdem standen alle da.",
          "Äpfel lesen ist eine Arbeit, die niemanden beeindruckt und trotzdem gemacht werden muss. Nach zwei Stunden redet man anders miteinander als nach zwei Stunden am Tisch.",
          "Am Abend stand der Most da. Und die Erkenntnis, dass gemeinsame Arbeit eine Gruppe schneller zusammenbringt als jedes Gespräch über Zusammenhalt.",
        ],
        images: [
          "/images/projekte/most/2026-09-06-01.jpg",
          "/images/projekte/most/2026-09-06-02.jpg",
        ],
      },
    ],
  },
  {
    // Nur angeteasert: Status "coming-soon" heisst Karte ohne eigene Seite.
    // Sobald es losgeht, Status ändern und Text unten ausformulieren.
    slug: "erdnuss-challenge",
    title: "Erdnuss-Challenge",
    tagline: "Gleiche Pflanze. Sechs Monate. Ein Sieger.",
    status: "coming-soon",
    summary:
      "Jeder zieht dieselbe Pflanze auf. Nach einem halben Jahr wird " +
      "verglichen. Mehr verraten wir noch nicht.",
    hero: "/images/projekte/erdnuss-challenge/hero.jpg",
    gallery: [],
    intro: "Gleicher Start für alle. Den Rest macht jeder selbst.",
    sections: [
      {
        heading: "Was geplant ist",
        body: [
          "Jeder im Club bekommt dieselbe Ausgangslage: eine Erdnusspflanze. Was daraus wird, hängt allein daran, wer sich wie kümmert. Nach sechs Monaten wird verglichen.",
          "Wir begleiten das öffentlich – mit allem, was dazugehört: den stolzen Zwischenständen und den Pflanzen, die es nicht geschafft haben.",
          "Details folgen.",
        ],
      },
    ],
    facts: [
      { label: "Stand", value: "In Vorbereitung" },
      { label: "Dauer", value: "Sechs Monate" },
    ],
    updates: [],
  },
];

/**
 * Projekte im Status "coming-soon" werden nur angeteasert: Karte in der
 * Übersicht, aber keine eigene Seite. Sobald das Projekt läuft, den Status
 * umstellen – die Seite erscheint dann von selbst.
 */
export function hasPage(project: Project): boolean {
  return project.status !== "coming-soon";
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Updates eines Projekts, neueste zuerst. */
export function sortedUpdates(project: Project): Update[] {
  return [...project.updates].sort((a, b) => b.date.localeCompare(a.date));
}

/** Datum des jüngsten Updates – für die Projektkarte. Null, wenn es keins gibt. */
export function lastUpdatedAt(project: Project): string | null {
  return sortedUpdates(project)[0]?.date ?? null;
}

/** „6. September 2026" – wie man ein Datum auf Deutsch schreibt. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Ein Update samt dem Projekt, zu dem es gehört. */
export type UpdateWithProject = Update & { project: Project };

/**
 * Die neuesten Updates über alle Projekte hinweg – für „Aktuelles" auf der
 * Projektübersicht. Solange es wenige gibt, zeigt die Seite eben wenige;
 * das ist ehrlicher als Füllmaterial.
 */
export function latestUpdates(limit = 3): UpdateWithProject[] {
  return projects
    .flatMap((project) => project.updates.map((update) => ({ ...update, project })))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

/**
 * Woran wir neue Ideen messen. Nicht jede wird ein Projekt – damit eine
 * durchkommt, muss sie zu dem passen, worauf wir uns verlassen, und zu dem,
 * was uns Freude macht.
 */
export const criteria: { title: string; body: string }[] = [
  {
    title: "Sinnvoll",
    body: "Am Ende soll etwas dastehen, das jemand braucht oder das bleibt. Beschäftigung um der Beschäftigung willen haben wir genug.",
  },
  {
    title: "Nachhaltig",
    body: "Gedacht für Jahre, nicht für ein Wochenende. Und wenn es doch kurz ist, dann ohne Schaden für Ort und Leute.",
  },
  {
    title: "Macht Freude",
    body: "Wir machen das freiwillig und nach Feierabend. Wenn es keinen Spass macht, machen wir es nicht – so einfach.",
  },
  {
    title: "Mit Leidenschaft",
    body: "Mindestens einer von uns muss dafür brennen. Sonst trägt es niemand durch die zähe Phase, und die kommt immer.",
  },
  {
    title: "Etwas Neues",
    body: "Wir wollen dabei etwas lernen, das wir vorher nicht konnten. Trüffel setzen konnte vorher auch keiner.",
  },
  {
    title: "Weg vom Alltag",
    body: "Idealerweise hat es nichts mit dem zu tun, womit wir unser Geld verdienen. Der Kopf soll anders arbeiten als im Büro.",
  },
];
