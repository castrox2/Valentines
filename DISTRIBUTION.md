# Valentine's Day App 💕

A charming interactive web-based app asking "Will You Be My Valentine?" with an evasive "No" button and a celebration page for "Yes" responses.

## 📦 Distribution

Two ways to get and run the app:

### Option 1: Standalone Executable (Easiest)
1. Download `Valentine's App.exe` from the dist2 folder
2. Double-click to run - no installation needed!

### Option 2: ZIP File  
1. Download `Valentines-App.zip` from the dist2 folder
2. Extract the ZIP file
3. Run `Valentine's App.exe` from the extracted folder

## 🎮 How to Use

1. **Question Page**: The app displays "Will You Be My Valentine?" with Yes and No buttons
2. **Evasive No Button**: Try clicking the "No" button - it will evade your cursor!
3. **Attempt Counter**: The "No" button text changes based on attempts:
   - 3 attempts: First placeholder message
   - 6 attempts: Second placeholder message  
   - 9 attempts: Third placeholder message
   - 12 attempts: Fourth placeholder message
4. **Success Page**: Click "Yes" to see a beautiful celebration with:
   - Floating hearts
   - Confetti animation
   - Success message

## 🎨 Features

- **Interactive UI**: Beautiful gradient backgrounds (purple, pink, red)
- **Smooth Animations**: Floating hearts, confetti effects, smooth button interactions
- **Responsive Design**: Works on different window sizes
- **Cross-Platform**: Built with Electron for Windows

## 📂 Technical Stack

- **React 18** + **TypeScript** - UI framework
- **Electron** - Desktop application
- **CSS3** - Animations and styling

## 🛠️ Development

### Prerequisites
- Node.js (v14+)
- npm

### Setup
```bash
npm install
```

### Run in Development
```bash
npm start
```

### Build for Distribution
```bash
npm run build
npm run package
```

This will create:
- `dist2/win-unpacked/Valentine's App.exe` - Standalone executable
- `dist2/Valentines-App.zip` - Compressed distribution package

## 📝 Customization

To change the dynamic "No" button messages, edit `src/pages/ValentinePage.tsx`:

```typescript
const getNoLabel = () => {
  if (noAttempts >= 12) return "You can say yes now 😘";
  if (noAttempts >= 9) return "Seriously, click yes!";
  if (noAttempts >= 6) return "Come onnnnn...";
  if (noAttempts >= 3) return "Don't be shy!";
  return "No";
};
```

## ❤️ License

This app is made with love for Valentine's Day.

---

**Enjoy spreading the love! 💕**
