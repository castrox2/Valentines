# 🎨 Customization & Development Guide

## Advanced Customization Options

### Change the Moving Button Distance
In [src/pages/ValentinePage.tsx](src/pages/ValentinePage.tsx#L15), adjust:

```tsx
const randomX = Math.random() * 300 - 150;  // ← Change 300 to move further
const randomY = Math.random() * 300 - 150;  // ← Change 300 to move further
```

Examples:
- `* 200` - moves 200 pixels (smaller area)
- `* 400` - moves 400 pixels (larger area, harder to click)

### Add Sound Effects
To add a sound when buttons are clicked, install audio library:

```bash
npm install use-sound
```

Then in ValentinePage.tsx:
```tsx
import useSound from 'use-sound';

// Add inside component:
const [playYesSound] = useSound('/yes-sound.mp3');
const [playNoSound] = useSound('/no-sound.mp3');

// In handlers:
const handleYesClick = () => {
  playYesSound();
  setYesClicked(true);
  // ... rest of code
};
```

### Change Button Text
In [src/pages/ValentinePage.tsx](src/pages/ValentinePage.tsx#L65):
```tsx
<button className="btn btn-yes">Yes 💜</button>  // Change text/emoji
<button className="btn btn-no">No 😢</button>    // Change text/emoji
```

In [src/pages/SuccessPage.tsx](src/pages/SuccessPage.tsx#L46):
```tsx
<p className="success-message">You've made me the happiest person!</p>
```

### Adjust Button Sizes
In [ValentinePage.css](src/pages/ValentinePage.css#L65):
```css
.btn {
  padding: 1.2rem 2.5rem;  /* ← Adjust vertical and horizontal padding */
  font-size: 1.5rem;       /* ← Change button text size */
  min-width: 180px;        /* ← Change button width */
}
```

### Change Animation Speeds
Global animations are in [styles.css](src/styles.css#L25):

```css
@keyframes float {
  /* ... */
  animation: float 6s infinite;  /* ← Change 6s to speed up/down */
}
```

Common values:
- `2s` - Very fast
- `3s` - Fast  
- `6s` - Normal (default)
- `10s` - Slow
- `15s` - Very slow

### Create a Dark/Light Theme
Create new theme CSS and toggle in App.tsx:

```tsx
const [theme, setTheme] = useState('dark');

return (
  <div className={`app theme-${theme}`}>
    {/* ... */}
  </div>
);
```

Add to styles.css:
```css
.theme-dark {
  /* current dark colors */
}

.theme-light {
  background: linear-gradient(135deg, #ffe4f0 0%, #f0d4ff 100%);
}

.theme-light .main-question {
  color: #5a0a5a;
  text-shadow: 0 2px 8px rgba(200, 0, 100, 0.3);
}
```

### Add Background Music
In App.tsx:
```tsx
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play();
  }, []);
  // ...
}
```

### Change Window Size in Electron
In [public/electron.js](public/electron.js#L9):
```javascript
mainWindow = new BrowserWindow({
  width: 1000,    // ← Change window width
  height: 800,    // ← Change window height
});
```

Example sizes:
- `1200x900` - Larger window
- `800x600` - Smaller window
- `1920x1080` - Full HD
- Position window with `x: 100, y: 100`

### Add More Pages
To add additional pages (like a "Not Now" page):

1. Create new component in `src/pages/NotNowPage.tsx`
2. Add to routing in [App.tsx](src/App.tsx), change state:
```tsx
const [page, setPage] = useState<'valentine' | 'success' | 'notnow'>('valentine');
```

3. Add conditional render:
```tsx
{page === 'notnow' && <NotNowPage onReset={handleReset} />}
```

### Make Text Editable
To allow in-app editing of the message:

In SuccessPage.tsx:
```tsx
const [message, setMessage] = useState('You made me happy!');

return (
  <textarea 
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="editable-message"
  />
);
```

Add CSS:
```css
.editable-message {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff69b4;
  color: white;
  padding: 1rem;
  border-radius: 10px;
}
```

---

## Performance Optimization

### Reduce CSS Bundle Size
The compiled CSS is ~1.8kB - already optimized!

### Remove Unused Animations
If certain animations aren't used, remove the `@keyframes` rules from CSS files.

### Optimize Images
If you add images, compress them:
- Use tools like TinyPNG
- Use WebP format when possible
- Place in `public/` folder

---

## Design Tips

### Color Palettes
The current app uses:
- **Primary Pink:** `#ff1493` and `#ff69b4`
- **Deep Purple:** `#2d1b4e`, `#3d1659`
- **Accent Red:** `#dc143c`

**Alternative palettes:**
- **Gold theme:** `#FFD700`, `#FFA500`, `#8B4513`
- **Blue theme:** `#1e90ff`, `#4169e1`, `#87ceeb`
- **Green theme:** `#00FF41`, `#2CFF2C`, `#00AA00`

### Font Options
Change in App.tsx or CSS:
```css
body {
  font-family: 'Courier New', monospace;  /* Playful */
  /* OR */
  font-family: 'Georgia', serif;          /* Elegant */
  /* OR */
  font-family: 'Comic Sans MS', cursive;  /* Fun */
}
```

### Add Emojis
Used throughout the app for visual appeal. Popular Valentine's emojis:
- ❤️ `&heart;` or `❤️`
- 💕 `💕`
- 💖 `💖`
- 💜 `💜`
- 🎀 `🎀`
- 💝 `💝`
- 🌹 `🌹`
- ✨ `✨`

---

## Debugging Tips

### Check for Console Errors
In Electron development mode, the DevTools open automatically. Press `F12` to toggle.

Common issues:
- **CSS not loading:** Check file paths in imports
- **Component not rendering:** Check `className` names match CSS
- **Animation stuttering:** Reduce number of animated elements

### Testing Changes
1. Edit a file
2. Save it
3. Electron app hot-reloads automatically
4. Check result

### Build Production Version
```bash
npm run build
```
Creates optimized version in `build/` and `dist/` folders.

---

## Common Modifications Cheat Sheet

```tsx
// Change question text
<h1 className="main-question">Different question?</h1>

// Change button labels
<button>Yes ❤️</button>
<button>No 💔</button>

// Change success text
<h1 className="success-title">Amazing! 🎉</h1>

// Change colors
background: linear-gradient(135deg, #newcolor1 0%, #newcolor2 100%);

// Change timing
animation: float 3s ease-in-out infinite;  // 3s = duration

// Change size
font-size: 2rem;  // Increase or decrease
padding: 2rem;    // Increase or decrease spacing
```

---

## Next Steps

1. **Customize the message** - Edit SuccessPage.tsx
2. **Test the app** - Run `npm start`
3. **Build for distribution** - Run `npm run build`
4. **Share the .exe** - Give them the installer from `dist/` folder

Enjoy creating your special Valentine's app! 💕
