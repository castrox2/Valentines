# Valentine's Day App 💕

A beautiful, interactive Electron app to ask someone to be your Valentine!

## Features 🎉

- ✨ Charming Valentine's question with an evasive "No" button
- 🎨 Gorgeous gradient background with pink, purple, and red colors
- 💫 Smooth animations and floating hearts
- 🎯 Celebratory success page with confetti effects
- 📱 Responsive design
- 💻 Built with Electron, React, and TypeScript

## Setup Instructions 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd Valentines
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the app in development mode:
```bash
npm start
```

This will:
- Start the React development server on port 3000
- Launch the Electron app automatically
- Enable hot-reloading for changes

### Build for Production

To build the app as an .exe:
```bash
npm run build
```

The compiled installer and portable .exe will be in the `dist` folder.

## Customization 🎨

### Change the Success Message
Edit [src/pages/SuccessPage.tsx](src/pages/SuccessPage.tsx) and replace the placeholder text:
```tsx
<p className="placeholder-text">
  [Edit this text with your own romantic message!]
</p>
```

### Customize Colors
Edit [src/pages/ValentinePage.css](src/pages/ValentinePage.css) and [src/pages/SuccessPage.css](src/pages/SuccessPage.css) to change the gradient colors.

### Modify Animations
All animations are defined in the CSS files. You can adjust:
- Duration: change the time values (e.g., `3s` to `5s`)
- Easing: change `ease-in-out` to other easing functions
- Effects: modify transform/scale properties

## File Structure 📁

```
Valentines/
├── public/
│   ├── electron.js        # Electron main process
│   ├── preload.js         # Electron security preload
│   └── index.html         # React app entry point
├── src/
│   ├── App.tsx            # Main App component with routing
│   ├── index.tsx          # React root
│   ├── styles.css         # Global styles
│   ├── pages/
│   │   ├── ValentinePage.tsx   # Main ask page
│   │   ├── ValentinePage.css   # Main page styles
│   │   ├── SuccessPage.tsx     # Success/celebration page
│   │   └── SuccessPage.css     # Success page styles
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── .env                   # Environment variables
```

## Technologies Used 🛠️

- **Electron**: Desktop application framework
- **React 18**: UI component library
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Beautiful styling and animations
- **Electron Builder**: Packaging for .exe distribution

## Troubleshooting 🔧

### Port already in use
If port 3000 is already in use, modify the `.env` file:
```
PORT=3001
```

### App won't start
1. Delete `node_modules` folder
2. Run `npm install` again
3. Try `npm start`

### Build fails
1. Make sure all dependencies installed: `npm install`
2. Clear any cache: `npm cache clean --force`
3. Try building again: `npm run build`

## License 💝

This project is made with love for Valentine's Day! Free to use and modify.

Enjoy! 🎉💕
