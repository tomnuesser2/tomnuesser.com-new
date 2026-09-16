# tomnuesser.com — Portfolio (Next.js, statisch, GitHub Pages)

Re-Design deiner Portfoliobox-Seite als eigenständiges, kostenlos auf **GitHub Pages**
gehostetes Projekt. Look & Struktur (Monospace, Schwarz/Weiß, große Radien) sind aus
deinen Screenshots übernommen, dazu kommen verspielte Scroll-Animationen und acht
unterschiedlich animierte Projektseiten-Vorlagen.

## Wichtig zu den React-Bits-Komponenten

Die im Prompt verlinkten Komponenten `ScrollExpand`, `ScrollPortal`, `ScrollStack`,
`Device` und `Comparison Slider` stammen teils aus **React Bits Pro** (kostenpflichtig).
Damit die Seite komplett kostenlos bleibt und ohne Abo auskommt, habe ich alle fünf
Effekte **selbst nachgebaut** (reines React + Tailwind + Framer Motion, keine
Fremdbibliothek, kein Lizenzrisiko):

- **Landing-Overlay** (`src/components/LandingOverlay.tsx`) – eigene ScrollExpand-Ankunftsanimation.
- **PageTransition** (`src/components/PageTransition.tsx`) – eigener ScrollPortal-Wipe beim Seitenwechsel.
- **ScrollStack-Template** (`src/components/templates/ScrollStack.tsx`).
- **DeviceMockup-Template** (`src/components/templates/DeviceMockup.tsx`) – eigenes CSS-Handygehäuse.
- **ComparisonSlider-Template** (`src/components/templates/ComparisonSlider.tsx`) – eigener Drag-Vergleichsslider.

Wenn du später doch ein React-Bits-Pro-Abo hast, lassen sich diese Dateien 1:1 gegen
die Pro-Komponenten austauschen, ohne den Rest der Seite anzufassen.

## Projektstruktur

```
src/
  app/
    layout.tsx              Grundgerüst: Fonts, Brand, PillNav, Landing-Overlay
    page.tsx                Startseite (work / contact / impressum, eine Scroll-Seite)
    not-found.tsx            404-Seite
    work/[slug]/page.tsx     Einzelne Projektseiten (statisch generiert)
  components/
    templates/               Die 8 Projekt-Layouts/Animationen
    ...                       Wiederverwendbare Bausteine (Nav, Medien, Formular, ...)
  data/
    projects.json            <-- HIER trägst du deine echten Projekte ein
    projects.ts               Lädt/typisiert projects.json
    types.ts                  Beschreibt, welche Felder ein Projekt haben kann
public/
  media/                      Hier legst du deine echten Bilder/Videos ab
  CNAME                       Enthält "tomnuesser.com" für die eigene Domain
```

## Lokal starten

```bash
npm install
npm run dev
```

Danach [http://localhost:3000](http://localhost:3000) öffnen.

## Eigene Inhalte statt Platzhalter einfügen

Alle Projekte inkl. Platzhaltertexte liegen in **`src/data/projects.json`**. Diese Datei
kannst du (auch per Copy-Paste in ein KI-Tool) beliebig erweitern – der Code selbst muss
dafür nicht angefasst werden.

Ein Eintrag sieht so aus:

```json
{
  "slug": "mein-projekt",
  "title": "Mein Projekt",
  "year": "2026",
  "role": ["Kamera", "Schnitt"],
  "client": "Kundenname (optional)",
  "summary": "Kurzer Satz für die Kachel auf der Startseite.",
  "description": ["Erster Absatz Fließtext.", "Zweiter Absatz."],
  "template": "parallax-scroll",
  "cover": { "type": "video", "label": "Beschreibung", "ratio": "16/9", "vimeoId": "123456789" },
  "gallery": [
    { "type": "image", "label": "Beschreibung", "ratio": "16/9", "src": "/media/mein-projekt/01.jpg" }
  ],
  "published": true
}
```

**Bilder einfügen:** Datei in `public/media/<slug>/` ablegen und den Pfad (z. B.
`/media/mein-projekt/01.jpg`) im Feld `src` eintragen. Ohne `src` wird automatisch ein
Platzhalter mit dem `label`-Text angezeigt – so siehst du sofort, welche Slots noch
befüllt werden müssen.

**Videos einfügen (Vimeo):** Video privat/unlisted auf Vimeo hochladen, die Video-ID aus
der URL (`vimeo.com/123456789` → `123456789`) in `vimeoId` eintragen. Der Clip wird erst
geladen, wenn jemand aktiv auf Play klickt (schnelle Ladezeiten, siehe unten). Optional
ein eigenes Vorschaubild über `poster` angeben, sonst erscheint der Platzhalter mit
Play-Symbol.

**Neues Projekt anlegen:**
1. Neues Objekt in das Array in `projects.json` einfügen, `slug` muss eindeutig sein.
2. `template` auf eine der 8 Vorlagen setzen (siehe unten) – oder eine bestehende
   Vorlage kopieren/anpassen in `src/components/templates/`, in `templates/index.tsx`
   registrieren und in `types.ts` bei `ProjectTemplate` ergänzen.
3. `npm run dev` prüfen, danach committen & pushen (siehe unten) – GitHub baut & deployed automatisch.

**Projekt vorübergehend ausblenden:** `"published": false` setzen.

### Die 8 Vorlagen (`template`-Werte)

| Wert | Vorlage | Gut geeignet für |
|---|---|---|
| `parallax-scroll` | Video-Hero mit Parallax, zentrierter Text, ruhige Bildstrecke | Live-Sessions, Musikvideos (siehe „LEONA") |
| `festival-grid` | Grain-Overlay, unregelmäßiges Masonry-Grid | Festivals, dokumentarisches Material (siehe „Gården Festival") |
| `device-mockup` | Eigenes Handy-Gehäuse, swipebare Vertikal-Clips | Instagram Reels / TikTok / Shortform |
| `comparison-slider` | Ziehbarer Vorher/Nachher-Vergleich | Color Grading, Vorher/Nachher-Bearbeitung |
| `scroll-stack` | Scroll-gekoppelter Bilderstapel | Setfotos, viele ähnliche Standbilder |
| `cinematic-hero` | Riesiger Hero, der beim Scrollen auf Normalgröße „einrastet" | Einzelnes starkes Bild/Video als Opener |
| `split-showcase` | Fixierter Text links, Bilder scrollen rechts vorbei | Behind-the-Scenes, Setfoto ↔ Ergebnis |
| `timeline-story` | Vertikale, sich beim Scrollen aufbauende Zeitleiste | Jahresrückblicke, mehrstufige Projekte |

## Warum lädt die Seite Videos so schnell?

- Vimeo-Videos werden als **Facade** dargestellt (Vorschaubild/Platzhalter + Play-Button).
  Der eigentliche, schwere iframe-Embed wird erst geladen, wenn jemand draufklickt.
- Bilder nutzen natives `loading="lazy"` + IntersectionObserver – es wird nur geladen,
  was gerade in den sichtbaren Bereich scrollt.
- `<link rel="preconnect">` zu Vimeo im `<head>` (siehe `layout.tsx`) baut die Verbindung
  schon im Hintergrund auf, bevor überhaupt geklickt wird.

## Landing-Overlay: wann kommt der "enter"-Screen wieder?

Siehe `src/lib/useShouldShowLanding.ts`. Kurzfassung:

- Solange derselbe Browser-Tab offen bleibt, wird der Screen nicht erneut gezeigt.
- Wird der Tab/das Fenster geschlossen **oder** sind seit dem letzten Besuch mehr als
  **30 Minuten** vergangen, kommt der "enter"-Screen beim nächsten Aufruf wieder.
- Die 30 Minuten lassen sich über die Konstante `REVEAL_AGAIN_AFTER_MS` in derselben
  Datei anpassen.

## Kontaktformular

Da GitHub Pages rein statisch ist (kein eigener Server), öffnet der "Send"-Button aktuell
den E-Mail-Client vorausgefüllt (`mailto:`). Wenn das Formular Nachrichten direkt ohne
Mail-Client verschicken soll, kannst du kostenlos z. B. **Formspree** oder **Getform**
einbinden – dazu in `src/components/ContactSection.tsx` im `handleSubmit` statt der
`mailto:`-Weiterleitung einen `fetch()`-POST an den jeweiligen Endpoint schicken.

## Auf GitHub veröffentlichen (einmalig)

```bash
git init
git add .
git commit -m "Initial commit: tomnuesser.com Next.js Redesign"
git branch -M main
git remote add origin https://github.com/<dein-username>/<repo-name>.git
git push -u origin main
```

Danach in den GitHub-Repo-Einstellungen:

1. **Settings → Pages → Build and deployment → Source** auf **"GitHub Actions"** stellen
   (der Workflow unter `.github/workflows/deploy.yml` übernimmt den Rest automatisch
   bei jedem Push auf `main`).
2. Falls du die Seite unter `tomnuesser.com` (eigene Domain) statt
   `https://<username>.github.io/<repo>` betreiben willst:
   - Die Datei `public/CNAME` enthält bereits `tomnuesser.com`.
   - Bei deinem Domain-Registrar/DNS-Anbieter einen `CNAME`-Eintrag für `tomnuesser.com`
     (bzw. `A`-Records für die Apex-Domain, siehe GitHub-Docs "Setting up an apex domain")
     auf `<dein-username>.github.io` anlegen.
   - In **Settings → Pages → Custom domain** `tomnuesser.com` eintragen und auf "Enforce
     HTTPS" warten (kann etwas dauern).
3. Falls die Seite stattdessen unter `https://<username>.github.io/<repo-name>/` laufen
   soll (keine eigene Domain), in `next.config.mjs` die Zeile `basePath` aktivieren und
   den Repo-Namen eintragen, sowie `public/CNAME` löschen.

Ab dann reicht für jede Änderung: Inhalte in `projects.json` anpassen → committen →
`git push` → GitHub baut & veröffentlicht automatisch (Fortschritt im "Actions"-Tab
des Repos sichtbar).

## Ideen für später (noch nicht umgesetzt)

- Echtes Formular-Backend (Formspree/Getform) statt `mailto:`.
- Automatisches Sitemap/OG-Image pro Projekt.
- Suchleiste/Filter über `role`/`year`, falls die Projektliste größer wird.

Sag einfach Bescheid, falls eine dieser Ideen (oder etwas anderes) noch mit rein soll.
