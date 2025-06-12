# 📘 Playwright E2E Setup-Anleitung für `playwright_2/testing`

Diese Anleitung beschreibt Schritt für Schritt, wie Playwright mit TypeScript für End-to-End-Tests in eurem Projekt eingerichtet wird. Die Tests werden im Verzeichnis `playwright_2/testing` abgelegt.

---

## Schritt 1: Playwright mit TypeScript initialisieren

Im Terminal ausführen:

```bash
cd playwright_2/testing
npm init playwright@latest
```


Bestätigt hier alle Abfragen mit den Standardeinstellungen.

Dies erstellt:
- Einen `tests/`-Ordner mit Beispieltests
- Die Datei `playwright.config.ts`
- Einträge in der `package.json`
- Alle benötigten Abhängigkeiten

---

## Schritt 2: Autogenerierte Beispieltests löschen

Die voreingestellten Beispieltests entfernen:

```bash
rm tests/example.spec.ts
rm tests-examples/demo-todo-app.spec.ts
```

---

## Schritt 3: `playwright.config.ts` anpassen

In der Datei `playwright.config.ts` folgendes konfigurieren, damit die Anwendung manuell gestartet werden kann:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: undefined // Anwendung wird manuell gestartet
});
```

Damit nutzt Playwright eure lokal gestartete Anwendung, ohne sie automatisch zu starten.

---

## Schritt 4: Backend und Frontend manuell starten

### Anwendung bauen

Baut zu Beginn die gesamte Anwendung, indem ihr im Root-Verzeichnis des Repositories den maven-build startet:

```shell
mvn clean install -DskipTests
```

### Backend & Frontend starten

Nutzt IntelliJ oder eure Konsole, um das Backend im Ordner `backend/SqsTestingApplication.jar` zu starten (Wichtig: Damit das Backend läuft, müssen auch die Docker-Container im docker-compose.yaml im backend Modul laufen). Started danach das Frontend, indem ihr im Ordner `frontend` den folgenden Befehl ausführt:

```
npm run dev
```


Stellt sicher, dass das Frontend unter [http://localhost:5173](http://localhost:5173) erreichbar ist und überprüft einmal manuell, dass auch Requests an das Backend geschickt werden, indem ihr bpsw. die Suchfunktion testet.

---

## Schritt 5: Playwright im UI-Modus starten

In einem neuen Terminal:

```bash
cd playwright_2/testing
npx playwright test --ui
```

Damit öffnet sich die grafische Oberfläche von Playwright Test. Hier könnt ihr:
- Alle Tests sehen
- Einzelne Tests ausführen
- Testverläufe visuell nachverfolgen

---

## Schritt 6: Ersten eigenen Test schreiben

Erstelle eine Datei `tests/library.spec.ts` mit folgendem Inhalt:

```ts
import { test, expect } from '@playwright/test';

test('sollte den Seitentitel anzeigen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '📚 Library Dashboard' })).toBeVisible();
});
```

### 📌 Hinweis:
- Die Seite muss bereits über `npm run dev` im Frontend verfügbar sein.
- Der Test prüft, ob der Haupttitel korrekt angezeigt wird.

---

Starte jetzt noch einmal die playwright UI und lasse dort deine Tests laufen:

```shell
npx playwright test --ui
```

Jetzt könnt ihr mit weiteren Tests beginnen, z. B. um die Buchlisten und Suchfunktion zu testen.
