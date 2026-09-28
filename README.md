# KONTEC-CONSTRUCT Website-Prototyp

Stand: 28.09.2026. Diese Variante ist die vereinbarte Arbeitsversion.

## Bildfassung vom 28.09.2026
- Zwei Schwerpunkte: Sanierung/Innenausbau und Rechenzentren.
- Neue Seite `sanierung.html` mit echten Projektbildern.
- Drei Galerien mit 14 ausgewählten Fotos: Böttgerstraße (6), Fürstenberger (4), Hanauer Landstraße (4).
- Vergrößerbare Bilder mit Vor/Zurück, Pfeiltasten, Escape und Rückgabe des Tastaturfokus.
- Original-Logo aus `Kontec logo.png` in Navigation, Fußbereich und Passwortdialog.
- WebP-Bilder in passenden Auflösungen und verzögertes Laden außerhalb des Einstiegsbereichs. Originaldateien bleiben unverändert.

## Bildauswahl und offene Angaben
Die 57 unterschiedlichen gelieferten Fotos wurden visuell gesichtet. Zusätzliche Dateien mit dem Präfix `._` sind macOS-Metadaten. Die Zuordnung folgt den drei bereitgestellten Projektordnern.

`assets/projekte/bildnachweise.json` dokumentiert verwendete Originaldateien und Bildbeschreibungen. Dies ist ein technischer Herkunftsnachweis, keine Bestätigung von Urheberschaft oder Nutzungsrechten. Fotografenangaben und Veröffentlichungsfreigaben sind vor einem öffentlichen Einsatz zu ergänzen. Die Böttgerstraße-Serie wurde im Ordner „Ute Hildenbeutel_AD_300px“ geliefert.

Die Texte beschreiben sichtbare Räume und Materialien. Nicht bekannte Bauzeiten, Flächen, Auftraggeber oder konkrete KONTEC-Gewerke wurden nicht ergänzt. Diese Informationen fehlen noch in den Projektsteckbriefen.

Für Rechenzentren liegen noch keine neuen Projektinformationen oder Fotos vor. Die Illustration bleibt als solche erkennbar; die konkreten Beispiel-Leistungen und Beispiel-Referenzen bleiben gekennzeichnet.

## Sicherung und Prüfung
Die Fassung vor dem Bildeinbau liegt im Projekt-Hauptordner unter `review/premium-vor-projektbildern.zip`. Andere Website-Varianten wurden nicht verändert.

Browserprüfung mit Edge bei 1440 und 390 Pixeln Breite: Passwortfehler und Freischaltung, Session-Erhalt, Bildladen, horizontales Überlaufen, mobile Navigation sowie Galeriebedienung. Bildschirmansichten und Ergebnisprotokoll liegen unter `review/` im Projekt-Hauptordner.

Hilfsskripte im Projekt-Hauptordner:
- `tools/build_project_preview.py`: erstellt die Bildfassung aus der Sicherung und `review/photos.json`, benötigt Pillow. Erzeugte HTML-Seiten werden dabei überschrieben. Bereits exportierte WebP-Dateien werden wiederverwendet.
- `tools/review_project_preview.cjs`: lokale Browserprüfung mit Node.js und installiertem Edge, ohne npm-Abhängigkeiten.

## Enthalten
- Startseite
- Leistungen
- Sanierung & Innenausbau
- Projekte mit drei Bildergalerien
- Rechenzentren mit gekennzeichneten Beispielen
- Unternehmen
- Kontakt mit Mailto-Formular
- Impressum (Entwurf)
- Datenschutz (Entwurf)
- Responsive Navigation, mobile Optimierung, lokale SVG-Illustrationen

## Fakten vs. Beispiele
Alle nicht verifizierten Leistungen, Projektangaben und Claims sind im Frontend als „Beispiel – zu bestätigen“ markiert. Diese Kennzeichnung vor Veröffentlichung erst entfernen, wenn KONTEC die jeweilige Aussage bestätigt hat.

## Vor dem Go-live ersetzen / bestätigen
1. Optional: Original-Logo als Vektordatei für größere Darstellungen (gelieferte PNG bereits eingebaut)
2. Projektsteckbriefe zu den drei Bildserien, weitere Referenzen und Bildnachweise
3. Data-Center-/Großprojekt-Referenzen und erlaubte Kundennamen
4. Leistungsumfang je Bereich
5. korrekte USt-IdNr./Steuerangaben
6. Rechtstexte
7. Formular-Backend oder CRM-/E-Mail-Anbindung
8. Domain-/Hosting-Setup

## Lokal öffnen
`index.html` doppelklicken. Für saubere Tests alternativ einen lokalen Webserver starten, z. B. `python -m http.server 8000`.


## Branding-Update
- Blaue Markenfarbe, dunkle Einstiegsbereiche und warme helle Flächen.
- Geliefertes Original-Logo als `assets/kontec-logo.png` eingebaut (204 × 147 Pixel).

## Passwortschutz der Preview

Die Website enthält einen clientseitigen Vorschau-Schutz auf allen HTML-Seiten.

- Aktuelles Vorschau-Passwort: `KONTEC2026`
- Nach erfolgreicher Eingabe bleibt die Website für die aktuelle Browser-Session entsperrt.
- Der Vergleich erfolgt gegen einen SHA-256-Hash in `script.js`; das Passwort steht dort nicht im Klartext.
- Wichtig: GitHub Pages bleibt technisch öffentlich. Dieser Schutz ist für eine Präsentations-Preview gedacht und **nicht** für vertrauliche/NDA-Inhalte. Statische Dateien und Assets können prinzipiell weiterhin direkt abgerufen werden.
