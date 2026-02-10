# Valentine's App

Electron + React + TypeScript app with a Valentine prompt and success page.

## Requirements
- Node.js 18+
- npm

## Development
```bash
npm install
npm start
```

## Build
```bash
npm run build
```

Build output goes to `release/`:
- NSIS installer: `Valentine's App Setup <version>.exe`
- Portable app: `Valentine's App <version>.exe`

## Important Packaging Note
Do not copy only the executable from an unpacked Electron folder. That causes DLL errors (including `ffmpeg.dll` missing).
Use the installer or portable executable from `release/`.

## Project Layout
```text
public/
  electron.js
  preload.js
  index.html
src/
  App.tsx
  index.tsx
  styles.css
  pages/
    ValentinePage.tsx
    ValentinePage.css
    SuccessPage.tsx
    SuccessPage.css
```

## Quick Troubleshooting
- `ffmpeg.dll was not found`: rebuild with `npm run build` and run the generated installer or portable file from `release/`.
- Port issue: change `PORT` in `.env`.
- Clean rebuild:
  ```bash
  npm install
  npm run build
  ```
