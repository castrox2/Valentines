# Valentine's?

Desktop Valentine app built with Electron + React + TypeScript.

The app supports two first-launch flows:
- `Send`: customize the Valentine experience (no-button labels, success text), then share/export it.
- `Received`: import a shared code and open the configured experience.

## For "Download-and-Run" Users

1. Go to this repo's **Releases** page on GitHub.
2. Download one of these files from the latest release:
   - `Valentine's Setup <version>.exe` (recommended)
   - `Valentine's <version>.exe` (portable, no install)
3. Run the file you downloaded.
4. On first launch, choose `Send` (If you intend to send it to someone) or `Received` (If you are receiving from someone).

Recommended distribution method:
- Use GitHub Releases as the canonical download source.
- Share only the release link (not random copied `.exe` files from other folders).

## Releases Link

Direct download page:
- https://github.com/castrox2/Valentines/releases

## For Developers

### Requirements
- Node.js 18+
- npm

### Run in Development
```bash
npm install
npm start
```

### Build Windows Executables
```bash
npm run build
```

Build output is written to `release/`:
- Installer: `Valentine's Setup <version>.exe`
- Portable: `Valentine's <version>.exe`

## Project Layout
```text
public/
  electron.js
  preload.js
  index.html
  heart-icon.svg
  heart-icon.ico
src/
  App.tsx
  index.tsx
  styles.css
  config/
    appConfig.ts
  pages/
    SetupPage.tsx
    SetupPage.css
    ValentinePage.tsx
    ValentinePage.css
    SuccessPage.tsx
    SuccessPage.css
```

## Packaging Notes
- Do **not** copy executables out of temporary/unpacked build folders and send those.
- Use the generated installer or portable executable from `release/`.
- If you see file lock messages like `output file is locked for writing`, close running app instances and pause sync/scanning tools (for example OneDrive/antivirus) during build.

## Troubleshooting
- `ffmpeg.dll was not found`:
  - Rebuild with `npm run build`
  - Run the installer/portable from `release/` (not a partial copied binary)
- Build cache issues:
  ```bash
  npm install
  npm run build
  ```
