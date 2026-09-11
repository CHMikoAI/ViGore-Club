# ViGORE Club – Website

Next.js 16 (App Router), React 19, Tailwind v4. Deutsch, mehrseitig, ohne CMS –
Inhalte stehen als TypeScript-Dateien unter `src/content/` und werden im Code
gepflegt.

## Loslegen

```bash
npm install
npm run dev
```

Dann im Browser **http://localhost:3100** öffnen.

Der Port ist bewusst auf 3100 festgelegt und nicht auf dem üblichen 3000:
auf diesem Rechner läuft dort ein anderes Projekt. So kommen sich die beiden
nie in die Quere.

Zum Beenden im Terminal `Strg + C`.

---

## Die vier Dinge, die du am häufigsten machen wirst

### 1. Ein Bild einfügen

Auf jedem Platzhalter steht der Pfad, der dort erwartet wird – zum Beispiel
`images/projekte/most/hero.jpg`. Leg die Datei unter `public/` genau so ab
(also `public/images/projekte/most/hero.jpg`) und lade die Seite neu.

Die Ordner sind angelegt: `allgemein/` für alles, was zu keinem Projekt
gehört, und unter `projekte/` ein Ordner pro Projekt. Details, die
vollständige Liste und Hinweise zu Format und Grösse:
[`public/images/README.md`](public/images/README.md)

### 2. Ein Update schreiben

Es gibt keinen getrennten Journal-Bereich. Was passiert, steht direkt beim
Projekt. In `src/content/projects.ts` beim passenden Projekt oben in `updates`
einen Eintrag ergänzen:

```ts
{
  date: "2026-11-14",            // YYYY-MM-DD, sortiert sich von selbst
  title: "Der erste Frost",
  body: ["Erster Absatz.", "Zweiter Absatz."],
  images: ["/images/projekte/trueffelplantage/2026-11-14-01.jpg"],
}
```

Es erscheint sofort auf der Projektseite, und die Projektkarte zeigt das Datum
als Lebenszeichen an.

### 3. Ein Projekt ergänzen oder ändern

Ebenfalls `src/content/projects.ts`. Jedes Projekt bekommt automatisch eine
eigene Seite unter `/projekte/<slug>`.

Status-Möglichkeiten: `"laufend"`, `"bald"`, `"coming-soon"`, `"woechentlich"`.

### 4. Etwas an der Gestaltung ändern

Farben, Schriftgrössen und Animationen stehen alle in `src/app/globals.css`,
ganz oben im `@theme`-Block. Das ist der eine Ort dafür.

Die Schriften – Cormorant Garamond für Überschriften, Inter für den Fliesstext –
werden in `src/lib/fonts.ts` geladen. Wenn dort je eine andere Schrift kommt,
muss auch `--wordmark-ratio` in `globals.css` neu gemessen werden: daraus
rechnet der grosse ViGORE-Schriftzug im Footer seine Grösse, damit er exakt so
breit ist wie der Inhalt.

---

## Wo was liegt

```
src/
├─ app/                    Die Seiten (eine Datei = eine Adresse)
│  ├─ page.tsx             Startseite
│  ├─ club/                /club
│  ├─ projekte/            /projekte und /projekte/<slug>
│  ├─ kontakt/             /kontakt
│  ├─ api/kontakt/         nimmt die Formulare entgegen
│  └─ globals.css          ← Farben, Schriftgrössen, Animationen
│
├─ content/                ← die Inhalte, ohne Code
│  ├─ site.ts              E-Mail, Adresse, Navigation, Social Media
│  ├─ projects.ts          Projekte samt ihren Updates
│  └─ club.ts              Werte, Rhythmus, Zitat
│
├─ components/             Bausteine (Header, Footer, Karten, Formular)
└─ lib/fonts.ts            ← Schriftwahl
```

**Farben ändern:** `src/app/globals.css`, ganz oben im `@theme`-Block. Von dort
kommt alles – Creme, Espresso, das Messing des Akzents, die dunklen Bänder.

---

## Social Media verlinken

In `src/content/site.ts` steht bei Instagram und LinkedIn aktuell `href: null`.
Solange das so ist, werden die Icons abgedunkelt angezeigt, aber nicht verlinkt.
Sobald die Kanäle stehen, einfach die URL eintragen – der Rest passiert von
selbst.

---

## Formulare: E-Mail-Versand einschalten

Ohne Konfiguration funktionieren Kontakt- und Vormerkformular bereits: sie
öffnen das Mailprogramm mit fertig ausgefülltem Text. Es geht also nichts
verloren.

Für echten Versand direkt vom Server ein Konto bei [Resend](https://resend.com)
anlegen, die Domain `vigore-club.ch` verifizieren und zwei Umgebungsvariablen
setzen (lokal in `.env.local`, auf Vercel unter Settings → Environment
Variables):

```
RESEND_API_KEY=re_...
CONTACT_FROM=website@vigore-club.ch
```

Mehr ist nicht nötig. Details in `src/app/api/kontakt/route.ts`.

---

## Veröffentlichen (Vercel)

Der Code liegt auf GitHub: https://github.com/CHMikoAI/ViGore-Club

1. Auf [vercel.com](https://vercel.com) mit GitHub anmelden und das
   Repository `CHMikoAI/ViGore-Club` importieren – Next.js wird automatisch
   erkannt, es sind keine Einstellungen nötig.
2. Unter Settings → Domains `vigore-club.ch` und `www.vigore-club.ch`
   hinzufügen und die DNS-Einträge beim Domain-Anbieter anpassen.
3. Falls Mailversand gewünscht: die beiden Variablen von oben eintragen.

Danach baut Vercel bei jedem Push auf `main` automatisch neu. Vor dem Push
lokal einmal `npm run build` laufen lassen – das findet Fehler, bevor es
jemand anderes tut.

---

## Noch zu erledigen

- [ ] Echte Fotos einsetzen (siehe `public/images/README.md`)
- [ ] Alle Texte gegenlesen – die Entwürfe in `src/content/` stammen von mir
      und sollten in eure eigene Sprache
- [ ] `src/app/datenschutz/page.tsx`: Hosting steht jetzt auf Vercel und der
      Formular-Abschnitt beschreibt das neue Formular statt Google Forms.
      Bitte vor dem Livegang prüfen.
- [ ] Instagram- und LinkedIn-Links eintragen
- [ ] Entscheiden, ob Mitglieder mit Namen und Gesicht auftauchen
- [x] Schrift gesetzt: Cormorant Garamond wie auf der bisherigen Website
