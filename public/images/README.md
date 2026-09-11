# Bilder

Hier liegen alle Fotos der Website. Solange eine Datei fehlt, zeigt die
Seite an der Stelle einen Platzhalter – **und auf dem Platzhalter steht der
Pfad, der erwartet wird.** Du musst also nichts nachschlagen: Seite öffnen,
Platzhalter lesen, Datei genau so benennen, hier ablegen, Seite neu laden.

Kein Code, keine Einstellung, kein Neustart.

---

## Die Struktur

```
images/
│
├─ allgemein/              Alles, was nicht zu einem bestimmten Projekt gehört
│  ├─ club.jpg             Breites Bild auf der Seite „Der Club" (21:9)
│  ├─ gruender.jpg         Gianluca, Leo und Mirko (3:2)
│  ├─ logo.png             Das Logo im Header – freigestellt, NICHT die Quelle
│  ├─ ViGORE_Logos.png     Quelldatei des Logos (weisser Hintergrund)
│  └─ ViGORE_Favicon.png   Quelldatei des Favicons
│
└─ projekte/               Ein Ordner pro Projekt, benannt wie in der Adresse
   │
   ├─ trueffelplantage/
   │  ├─ hero.jpg          Kopfbild – auf der Karte und oben auf der Seite
   │  ├─ galerie-01.jpg    Galerie unter dem Text
   │  ├─ galerie-02.jpg
   │  ├─ galerie-03.jpg
   │  └─ 2026-07-19-01.jpg Bilder zu einem Update, mit dem Datum des Updates
   │
   ├─ most/
   │  ├─ hero.jpg
   │  ├─ galerie-01.jpg
   │  ├─ galerie-02.jpg
   │  ├─ galerie-03.jpg
   │  ├─ 2026-09-06-01.jpg
   │  └─ 2026-09-06-02.jpg
   │
   └─ erdnuss-challenge/
      └─ hero.jpg          Liegt schon da – solange „Coming soon", nur die Karte
```

Die Ordner sind schon angelegt, du kannst die Dateien direkt hineinlegen.

**Zum Logo:** `logo.png` ist aus `ViGORE_Logos.png` erzeugt – freigestellt
und beschnitten. Die Quelldatei hat einen deckend weissen Hintergrund und
taugt nicht direkt für den Header. Falls das Logo je neu gezeichnet wird,
muss `logo.png` neu erzeugt werden (Weiss → Transparenz, Rand wegschneiden).

### Die drei Sorten Bild bei einem Projekt

| Datei | Wo sie erscheint | Format |
|---|---|---|
| `hero.jpg` | Projektkarte (hochkant beschnitten) **und** oben auf der Projektseite (sehr breit beschnitten) | Querformat, mit Luft am Rand |
| `galerie-01.jpg` … | Galerie unter dem Text der Projektseite | Hochkant (4:5) |
| `JJJJ-MM-TT-01.jpg` … | Bei einem Update im Verlauf – das Datum ist das des Updates | Querformat (4:3) |

### Ein neues Projekt

Ordner unter `projekte/` anlegen, benannt wie der `slug` in
`src/content/projects.ts` (klein, ohne Umlaute, Bindestriche statt
Leerzeichen). Die Pfade im Projekt-Eintrag zeigen dann dorthin.

### Bilder zu einem neuen Update

Datei mit dem Datum des Updates benennen, `2026-11-14-01.jpg`, und im
Update-Eintrag unter `images` eintragen. Das Datum vorne sorgt dafür, dass
die Dateien im Ordner chronologisch sortiert liegen.

---

## Worauf es bei den Fotos ankommt

Die Bilder sind der wichtigste Hebel dafür, dass der Club menschlich
rüberkommt. Ein paar Hinweise, damit sie zusammenpassen:

- **Echt statt gestellt.** Hände bei der Arbeit, Leute im Tun, Landschaft.
  Keine in die Kamera grinsenden Gruppenbilder, keine Stockfoto-Anmutung.
- **Natürliches Licht.** Morgens und am späten Nachmittag ist es am besten.
  Direkte Mittagssonne und Blitz machen die Bilder hart.
- **Warm und ruhig entwickelt.** Etwas entsättigt, warme Schatten. Wenn alle
  Bilder ähnlich entwickelt sind, wirkt die Seite wie aus einem Guss – auch
  wenn sie mit dem Handy aufgenommen wurden.
- **Luft am Rand lassen.** Kopfbilder werden sehr breit (21:9) beschnitten,
  Karten hochkant (4:5). Was am Rand liegt, kann wegfallen.

## Grösse und Format

- **JPG** für Fotos, **PNG** nur wenn Transparenz gebraucht wird.
- **Kein HEIC.** iPhones speichern Fotos standardmässig als HEIC – das kann
  kein Browser anzeigen, und die Website ignoriert solche Dateien. Vor dem
  Ablegen als JPG exportieren: auf dem iPhone in der Fotos-App teilen →
  „Optionen" → Format „Kompatibelste Version"; oder beim Übertragen auf den
  Rechner in den iPhone-Einstellungen unter Fotos → „Auf Mac oder PC
  übertragen" auf „Automatisch" stellen.
- **2400 px** an der langen Kante reicht völlig. Next.js rechnet daraus
  automatisch alle kleineren Grössen fürs Handy.
- Vorher grob auf unter ~1 MB bringen. Riesige Dateien direkt aus der Kamera
  verlangsamen nur den Build.

## Wenn Personen erkennbar sind

Kurz mit den Betroffenen abklären, ob das Bild öffentlich sein darf. Das ist
schneller geklärt als später korrigiert.
