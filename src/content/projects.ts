/**
 * Die Projekte des Clubs – und alles, was dazugehört.
 *
 * Jedes Projekt hat zwei Teile:
 *
 *   about     Worum es geht – zwei Absätze, nicht mehr. Was das Projekt ist
 *             und warum wir es machen. KEINE Ereignisse, die gehören unten hin.
 *   updates   Was passiert ist, datiert, neueste zuerst. Hier steht die
 *             Geschichte, und hier hängen die Fotos.
 *
 * Diese Trennung ist der Grund, warum sich nichts wiederholt: ein Ereignis
 * steht genau einmal, als Update. Es gibt bewusst keine Galerie neben den
 * Updates – jedes Foto gehört zu einem Moment, und der Moment ist ein Update.
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
 *   2026-09-06-01.jpg …   Bilder zu einem Update, mit dem Datum des Updates
 * Solange eine Datei fehlt, zeigt die Seite einen Platzhalter mit dem
 * erwarteten Pfad. Datei ablegen, neu laden, fertig.
 *
 * Ein Bild ist entweder nur ein Pfad oder ein Paar aus Pfad und Unterschrift:
 *   "/images/projekte/most/2026-09-05-01.jpg"
 *   { src: "/images/projekte/most/2026-09-05-01.jpg", caption: "Ganz oben." }
 * Die Unterschrift steht unter dem Bild und in der Vergrösserung.
 *
 * ── Ein Tag in Teilen ──────────────────────────────────────────────────────
 * Ein Update kann mit `parts` in Abschnitte gegliedert werden – etwa Vormittag
 * und Nachmittag. Jeder Teil hat Titel, Absätze und eigene Bilder; so stehen
 * die Fotos bei dem Moment, zu dem sie gehören, statt als Sammlung am Schluss.
 */

export type ProjectStatus = "laufend" | "erhaeltlich" | "bald" | "coming-soon";

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  laufend: "Laufend",
  erhaeltlich: "Erhältlich",
  bald: "Bald erhältlich",
  "coming-soon": "Coming soon",
};

/** Ein Bild – nur der Pfad, oder Pfad mit Unterschrift. */
export type Photo = string | { src: string; caption?: string };

/** Bringt beide Schreibweisen eines Bildes auf dieselbe Form. */
export function photoOf(photo: Photo): { src: string; caption?: string } {
  return typeof photo === "string" ? { src: photo } : photo;
}

/** Ein Abschnitt innerhalb eines Updates, etwa der Vormittag eines Tages. */
export type UpdatePart = {
  title: string;
  body: string[];
  images: Photo[];
};

/** Ein datierter Eintrag zu einem Projekt – das, was früher das Journal war. */
export type Update = {
  /** ISO-Format YYYY-MM-DD. */
  date: string;
  title: string;
  body: string[];
  images: Photo[];
  /** Optional: der Eintrag in Teilen. Stehen nach body und images. */
  parts?: UpdatePart[];
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
  /** Ein Satz unter dem Titel der Detailseite. */
  intro: string;
  /** Worum es geht – zwei Absätze, keine Ereignisse. */
  about: string[];
  /**
   * Optional: eine Randnotiz zu „Worum es geht" – das Detail, das man am
   * Stammtisch erzählt. Steht in einem eigenen Kasten zwischen Absätzen und
   * Fakten.
   */
  aside?: { label: string; text: string };
  /** Kurze Faktenreihe am Ende von „Worum es geht". Leer lassen ist erlaubt. */
  facts: { label: string; value: string }[];
  /**
   * Nur, wenn es etwas zu bestellen gibt (der Most). Dann bekommt die Seite
   * einen Abschnitt mit Bestellformular; `facts` steht darin als Reihe über
   * dem Formular – Gebinde, Preis, Lieferung.
   */
  order?: {
    lede: string;
    facts: { label: string; value: string }[];
  };
  /** Was seither passiert ist. Neueste zuerst – die Sortierung macht der Code. */
  updates: Update[];
};

export const projects: Project[] = [
  {
    // ENTWURF – Texte und Bildunterschriften bitte in eure Worte bringen.
    // Die Daten der Updates stammen aus den Kameradaten der Fotos.
    slug: "trueffelplantage",
    title: "Trüffelplantage",
    tagline: "Haselnusssträucher, mit Trüffel geimpft",
    status: "laufend",
    summary:
      "Unser erstes Projekt. Haselnusssträucher, an den Wurzeln mit Trüffelpilz " +
      "geimpft, von Hand gesetzt – und ein Ergebnis, auf das wir Jahre warten.",
    hero: "/images/projekte/trueffelplantage/hero.jpg",
    intro: "Trüffel belohnen keine Ungeduld. Genau deshalb standen sie am Anfang.",
    about: [
      "Wir wollten kein Projekt, das man an einem Wochenende abhaken kann. Eine Trüffelplantage ist das Gegenteil: Zwischen dem Setzen und der ersten Ernte liegen Jahre, in denen es nichts zu feiern gibt – und in denen man trotzdem regelmässig hinfahren muss. Wer da dranbleibt, meint es ernst.",
      "Was da auf dem Hang wächst, sind übrigens keine Trüffel, sondern Haselnusssträucher. Ihre Wurzeln sind mit dem Trüffelpilz geimpft; der Pilz lebt mit dem Strauch, und irgendwann, wenn alles stimmt, wächst unter der Erde das, worauf wir warten. Wann genau, sagt einem niemand. Man erfährt es, wenn man gräbt.",
    ],
    aside: {
      label: "Nebenbei",
      text:
        "Am Pflanztag hat sich jeder von uns einen Strauch ausgesucht. Seither gehört er ihm – zumindest in der Diskussion. Bei jedem Besuch wird verglichen: Wessen Strauch hat mehr Blätter, wessen lässt sie hängen, wer hat beim letzten Mal zu wenig gegossen. Wissenschaftlich ist das wertlos. Unterhaltsam ist es sehr.",
    },
    facts: [
      { label: "Ort", value: "Graubünden" },
      { label: "Pflanzen", value: "Haselnuss, mit Trüffel geimpft" },
      { label: "Gepflanzt", value: "April 2026" },
      { label: "Horizont", value: "Mehrere Jahre" },
    ],
    updates: [
      {
        date: "2026-08-08",
        title: "Noch einmal Wasser",
        body: [
          "Der Sommer hat nicht aufgehört. Das Gras ist braun, die Sträucher stehen im Vlies und warten auf jeden Liter. Also wieder rauf mit der Kanne – diesmal reicht einer, die anderen hatten gute Ausreden.",
          "Die Sträucher halten durch. Wir auch.",
        ],
        images: [
          {
            src: "/images/projekte/trueffelplantage/2026-08-08-01.jpg",
            caption: "August, braunes Gras, eine Giesskanne. Der Strauch ist froh.",
          },
        ],
      },
      {
        date: "2026-07-11",
        title: "Der heisse Sommer",
        body: [
          "Es ist heiss, seit Wochen, und ein Haselnussstrauch im ersten Jahr hat noch keine tiefen Wurzeln. Also giessen. Nicht einmal – immer wieder. Man fährt hoch, schleppt Wasser, hebt das Vlies, schaut nach.",
          "Meistens sieht es gut aus. Manchmal sieht es so aus, als hätte der Strauch des Kollegen weniger Wasser bekommen als der eigene. Sagt man aber nicht. Oder doch.",
        ],
        images: [
          {
            src: "/images/projekte/trueffelplantage/2026-07-11-01.jpg",
            caption: "Die Sträucher im Vlies, zwei von uns am Nachsehen.",
          },
          {
            src: "/images/projekte/trueffelplantage/2026-07-11-02.jpg",
            caption: "Vlies hoch, Kanne rein, schauen, ob er noch lebt. Er lebt.",
          },
        ],
      },
      {
        date: "2026-05-14",
        title: "Erster Kontrollgang",
        body: [
          "Sechs Wochen nach dem Pflanzen: Die Wiese blüht, als hätte sie es eilig, und jeder Strauch steht in seinem Vlies – ein weisser Mantel gegen Wind, Wild und Übermut. Von aussen sieht die Plantage aus wie eine Reihe kleiner Zelte.",
          "Von innen sieht es aus wie Hoffnung: grüne Blätter, die es ernst meinen.",
        ],
        images: [
          {
            src: "/images/projekte/trueffelplantage/2026-05-14-01.jpg",
            caption: "Blick ins Vlies: Er lebt, er treibt, er hat Ambitionen.",
          },
          {
            src: "/images/projekte/trueffelplantage/2026-05-14-02.jpg",
            caption: "Kontrollgang mit Margeriten.",
          },
        ],
      },
      {
        date: "2026-04-04",
        title: "Gepflanzt",
        body: [
          "Ein Samstag im April, Schnee noch auf den Bergen, der Boden gerade weich genug. Im Korb: Haselnusssträucher, kaum kniehoch, an den Wurzeln mit Trüffelpilz geimpft. Dazu Spaten, Pfähle, Vlies – und drei Männer, die vorher noch nie eine Trüffelplantage angelegt haben.",
          "Loch graben, Strauch rein, Pfahl daneben, Erde fest, giessen. Klingt einfach, ist es auch – nur dass man bei jedem Strauch weiss, dass man ihn die nächsten Jahre wiedersehen wird. Am Schluss hat sich jeder einen ausgesucht. Seither ist es persönlich.",
          "Ernte: frühestens in ein paar Jahren. Es gibt Projekte, bei denen man am Abend etwas in der Hand hat. Dieses ist keines davon. Genau deshalb.",
        ],
        images: [
          {
            src: "/images/projekte/trueffelplantage/2026-04-04-01.jpg",
            caption: "Spaten, Pfähle, Vlies – und im Korb die Hauptdarsteller.",
          },
          {
            src: "/images/projekte/trueffelplantage/2026-04-04-02.jpg",
            caption: "Einer gräbt, einer hält, einer fotografiert.",
          },
          {
            src: "/images/projekte/trueffelplantage/2026-04-04-03.jpg",
            caption: "Der erste steht. Kniehoch, zwischen zwei Pfählen, mit Etikett.",
          },
          {
            src: "/images/projekte/trueffelplantage/2026-04-04-04.jpg",
            caption: "Drei Männer, eine Giesskanne, viel Zuversicht.",
          },
          {
            src: "/images/projekte/trueffelplantage/2026-04-04-05.jpg",
            caption: "Die ersten Blätter. Der Umzug ist gut gegangen.",
          },
        ],
      },
    ],
  },
  {
    slug: "most",
    // Der Jahrgang im Titel: Der Most ist ein Produkt, und wenn es nächstes
    // Jahr wieder einen gibt, heisst er „Most 2027" – so bleibt die Reihe lesbar.
    title: "Most 2026",
    tagline: "Von Hand gepresst, jetzt erhältlich",
    status: "erhaeltlich",
    summary:
      "Ein Tag in der Mosterei: vormittags Äpfel gelesen, nachmittags nach " +
      "alter Art gepresst. Jetzt erhältlich – der Erlös geht in die Clubkasse.",
    hero: "/images/projekte/most/hero.jpg",
    intro:
      "Am Morgen auf der Wiese, am Nachmittag an der Presse. Ein Tag, an dem " +
      "niemand aufs Handy geschaut hat.",
    about: [
      "Ein Samstag in einer Mosterei: vormittags Äpfel gelesen, nachmittags nach alter Art gepresst – Handarbeit, bei der man sieht und riecht, was passiert. Am Abend stand da etwas, das vorher nicht existiert hat.",
      "Den Most verkaufen wir als Club, der Erlös fliesst in die Kasse und damit ins nächste Projekt. Und nebenbei: Wer stundenlang nebeneinander Äpfel schleppt, redet anders miteinander als am Tisch. Das war der eigentliche Grund.",
    ],
    facts: [
      { label: "Machart", value: "Von Hand gepresst" },
      { label: "Erlös", value: "Geht in die Clubkasse" },
    ],
    // Preis und Gebinde stehen nur hier – ändert sich etwas, dann an dieser
    // Stelle. Das Formular und die E-Mail rechnen nichts nach.
    order: {
      lede:
        "Sag uns, wie viele du willst. Wir melden uns mit allem Weiteren – " +
        "keine Vorauszahlung, kein Shop.",
      facts: [
        { label: "Gebinde", value: "5-Liter-Container" },
        { label: "Preis", value: "20 Franken" },
        { label: "Lieferung", value: "Nach Hause, wenn du in der Nähe wohnst" },
      ],
    },
    updates: [
      {
        // ENTWURF – bitte in eure Worte bringen. Das Bild ist das Original.
        date: "2026-09-08",
        title: "Abgefüllt",
        body: [
          "Etikett drauf, Kisten gepackt, zurück über die Kantonsgrenze. Der Most steht jetzt da, wo er hingehört – in Graubünden.",
          "Ab sofort erhältlich. Bestellen kannst du ihn oben auf dieser Seite.",
        ],
        images: [
          {
            src: "/images/projekte/most/2026-09-08-01.jpg",
            caption: "Zurück in Graubünden – die Kisten auf dem Steinbock.",
          },
        ],
      },
      {
        // Datum aus den Kameradaten der Fotos: Samstag, 5. September.
        // ENTWURF – Texte und Bildunterschriften bitte in eure Worte bringen.
        // Von den neun Fotos des Tages sind sechs hier; 04, 05 und 08 liegen
        // weiterhin im Ordner, falls ihr tauschen wollt.
        date: "2026-09-05",
        title: "Ein Tag in der Mosterei",
        body: [
          "Ein Samstag im September, in zwei Hälften: vormittags auf der Wiese, nachmittags an der Presse.",
        ],
        images: [],
        parts: [
          {
            title: "Vormittag – Äpfel lesen",
            body: [
              "Der Wecker war unangenehm früh, das Wetter unentschieden. Trotzdem standen alle da.",
              "Äpfel lesen ist eine Arbeit, die niemanden beeindruckt: bücken, aufheben, Kiste füllen, nächste Kiste. Einer auf der Leiter, die anderen darunter. Nach zwei Stunden tut der Rücken weh – und trotzdem hat keiner aufgehört zu lachen. Ein richtiger Krampf, und genau deshalb hat es Spass gemacht.",
            ],
            images: [
              {
                src: "/images/projekte/most/2026-09-05-01.jpg",
                caption: "Ganz oben hängen die besten – sagt der auf der Leiter.",
              },
              {
                src: "/images/projekte/most/2026-09-05-02.jpg",
                caption: "Der Obstgarten über der Stadt, der Himmel noch unentschieden.",
              },
              {
                src: "/images/projekte/most/2026-09-05-03.jpg",
                caption: "Kiste um Kiste. Was am Boden lag, kam auch mit.",
              },
            ],
          },
          {
            title: "Nachmittag – an der Presse",
            body: [
              "Kofferraum voll, ab in die Mosterei. Die Äpfel werden gewaschen und gemahlen, die Maische kommt ins Tuch, Schicht um Schicht, dann drückt die Presse. Was unten herausläuft, ist erstaunlich viel – und schmeckt nach dem Vormittag.",
              "Am Abend stand der Most da: in Beuteln, in Kisten, bereit für den Weg nach Graubünden.",
              "Ein Dank an die Mosterei, die uns ihre Presse, ihren Platz und ihre Geduld überlassen hat. Ohne sie gäbe es diesen Most nicht.",
            ],
            images: [
              {
                src: "/images/projekte/most/2026-09-05-06.jpg",
                caption: "Die Presse der Mosterei.",
              },
              {
                src: "/images/projekte/most/2026-09-05-07.jpg",
                caption: "Die Maische kommt ins Tuch, Schicht um Schicht.",
              },
              {
                src: "/images/projekte/most/2026-09-05-09.jpg",
                caption: "Am Abend: der Most, abgefüllt und kistenweise.",
              },
            ],
          },
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
    intro: "Gleicher Start für alle. Den Rest macht jeder selbst.",
    about: [
      "Jeder im Club bekommt dieselbe Ausgangslage: eine Erdnusspflanze. Was daraus wird, hängt allein daran, wer sich wie kümmert. Nach sechs Monaten wird verglichen.",
      "Wir begleiten das öffentlich – mit allem, was dazugehört: den stolzen Zwischenständen und den Pflanzen, die es nicht geschafft haben.",
    ],
    facts: [{ label: "Dauer", value: "Sechs Monate" }],
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
 * Das neueste Update über alle Projekte hinweg – für „Aktuelles" auf der
 * Startseite und der Projektübersicht. Genau eines: Was zuletzt passiert
 * ist, bekommt die ganze Bühne. Null, solange es noch kein Update gibt.
 */
export function latestUpdate(): UpdateWithProject | null {
  return (
    projects
      .flatMap((project) =>
        project.updates.map((update) => ({ ...update, project })),
      )
      .sort((a, b) => b.date.localeCompare(a.date))[0] ?? null
  );
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
