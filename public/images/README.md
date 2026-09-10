# Bilder

Solange hier keine Datei liegt, zeigt die Website an der entsprechenden Stelle
einen Platzhalter – und auf dem Platzhalter steht der Dateiname, der erwartet
wird. **Du musst also nichts nachschlagen:** Seite öffnen, Platzhalter lesen,
Datei genau so benennen, hier ablegen, Seite neu laden. Fertig.

Kein Code, keine Einstellung, kein Neustart.

---

## Was aktuell gesucht wird

```
images/
├─ club/
│  ├─ club-gruppe.jpg                        Breites Bild auf der Seite „Der Club"
│  └─ gruender.jpg                          Gianluca, Leo und Mirko
│
└─ projekte/
   ├─ trueffelplantage-hero.jpg              Kopfbild Trüffelplantage
   ├─ trueffelplantage-01.jpg                Galerie
   ├─ trueffelplantage-02.jpg                Galerie
   ├─ trueffelplantage-03.jpg                Galerie
   ├─ most-hero.jpg                          Kopfbild Most
   ├─ most-01.jpg                            Galerie
   ├─ most-02.jpg                            Galerie
   ├─ most-03.jpg                            Galerie
   ├─ most-update-01.jpg                     Update „Ein Tag in der Mosterei"
   ├─ most-update-02.jpg                     dito
   ├─ padel-hero.jpg                         Kopfbild Padel
   └─ erdnuss-hero.jpg                       Kopfbild Erdnuss-Challenge
```

Diese Liste kommt aus `src/content/projects.ts`. Wenn du dort einen anderen
Dateinamen einträgst, gilt der.

---

## Worauf es bei den Fotos ankommt

Die Bilder sind der wichtigste Hebel dafür, dass der Club menschlich rüberkommt.
Ein paar Hinweise, damit sie zusammenpassen:

- **Echt statt gestellt.** Hände bei der Arbeit, Leute im Tun, Landschaft.
  Keine in die Kamera grinsenden Gruppenbilder, keine Stockfoto-Anmutung.
- **Natürliches Licht.** Morgens und am späten Nachmittag ist es am besten.
  Direkte Mittagssonne und Blitz machen die Bilder hart.
- **Warm und ruhig entwickelt.** Etwas entsättigt, warme Schatten. Wenn alle
  Bilder ähnlich entwickelt sind, wirkt die Seite wie aus einem Guss – auch
  wenn sie mit dem Handy aufgenommen wurden.
- **Quer für Kopfbilder, hoch für Karten.** Die Kopfbilder werden sehr breit
  beschnitten (21:9), die Projektkarten hochkant (4:5). Lass beim Fotografieren
  etwas Luft am Rand, damit beim Beschnitt nichts Wichtiges wegfällt.

## Grösse und Format

- **JPG** für Fotos, **PNG** nur wenn Transparenz gebraucht wird.
- **2400px** an der langen Kante reicht völlig. Next.js rechnet daraus
  automatisch alle kleineren Grössen fürs Handy.
- Vorher grob auf unter ~1 MB bringen. Riesige Dateien aus der Kamera
  verlangsamen nur den Build.

## Wenn Personen erkennbar sind

Kurz mit den Betroffenen abklären, ob das Bild öffentlich sein darf. Das ist
schneller geklärt als später korrigiert.
