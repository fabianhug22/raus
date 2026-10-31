# RAUS – Sportoutfit-PWA

Welche Kleidung passt zum Wetter? RAUS empfiehlt sie für Rennvelo, Joggen und Schwimmen. Die Logik ist 1:1 aus dem Scriptable-Widget übernommen. Wetterdaten: Open-Meteo, ohne API-Key.

## Deploy auf Vercel
1. Diesen Ordner in ein GitHub-Repo legen (oder `npx vercel` im Ordner ausführen).
2. Auf vercel.com «Add New → Project» wählen und das Repo importieren. Framework: «Other». Build Command und Output-Ordner leer lassen.
3. Deploy starten. Fertig, ein Build-Schritt ist nicht nötig.

## Aufs iPhone
Die Vercel-URL in Safari öffnen, auf «Teilen» tippen, dann «Zum Home-Bildschirm».

## Dateien
- `index.html` – komplette App (UI und Logik)
- `sw.js` – Offline-App-Shell; die letzte Prognose speichert die App selbst
- `manifest.webmanifest`, Icons – Installation als App
- `vercel.json` – richtige Header für Service Worker und Manifest

## Später
Strava-Wochenziel: als Vercel-Function (`/api/strava`) mit Token in den Environment Variables, nie im Frontend.
