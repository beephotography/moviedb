# Lightweight React App mit Axios und Tailwind CSS

Dieses Projekt ist eine einfache React-Anwendung, die Wetterdaten von einer API mit Axios abruft und sie in einem einfachen Frontend darstellt. Das Styling erfolgt mit Tailwind CSS.

## Voraussetzungen

Stelle sicher, dass du Node.js und npm installiert hast, um dieses Projekt auszuführen.

- Node.js
- npm (Node Package Manager)

## Installation

1. **Projekt klonen oder herunterladen:**

   ```bash
   git clone https://github.com/beephotography/weddr.git
   cd weddr
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

## Verwendung

1. **Starte die Entwicklungsserver:**

   ```bash
   npm start
   ```

   Öffne deinen Webbrowser und gehe zu [http://localhost:1234](http://localhost:1234) (oder einer anderen Adresse, die von Parcel bereitgestellt wird), um die Anwendung zu sehen.

2. **Bau der Produktionsversion:**

   ```bash
   npm run build
   ```

   Dieser Befehl erstellt eine optimierte Version der Anwendung im `dist`-Verzeichnis, die für die Bereitstellung bereit ist.

## Anpassung

- **API-Endpunkt ändern:** Bearbeite `src/App.js` und passe den API-Endpunkt an, um andere Datenquellen zu verwenden.
- **Styling ändern:** Bearbeite `src/index.css` und `tailwind.config.js`, um das Erscheinungsbild der Anwendung anzupassen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht. Siehe [LICENSE](./LICENSE) für weitere Details.

