# Lightweight Movie App mit Axios und Tailwind CSS

Dieses Projekt ist eine einfache React-Anwendung, die Filmdaten von einer API mit Axios abruft und sie in einem einfachen Frontend darstellt. Das Styling erfolgt mit Tailwind CSS.

## Voraussetzungen

Stelle sicher, dass du Node.js und npm installiert hast, um dieses Projekt auszuführen.

- Node.js
- npm (Node Package Manager), empfohlene Node Version 20

## Installation

1. **Projekt klonen oder herunterladen:**

   ```bash
   git clone https://github.com/beephotography/moviedb.git
   cd moviedb
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

## API-Keys

Kopiere die Datei **.env.dist** und füge sie als **.env** ein, ändere darin die Einträge entsprechend ab:

   ```env
    REACT_APP_OMDB_API_KEY=your-omdb-api-key
    REACT_APP_OPENAI_API_KEY=your-open-api-key
   ```
Ersetze "your-omdb-api-key" mit deinem OMDb API key und "your-open-api-key" mit deinem API key von OpenAI.

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
