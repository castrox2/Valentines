const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const unpackedDir = 'dist2/win-unpacked';
const outputDir = 'dist2';
const zipName = 'Valentines-App.zip';
const zipPath = path.join(outputDir, zipName);

// Check if unpacked directory exists
if (!fs.existsSync(unpackedDir)) {
  console.error(`Error: ${unpackedDir} not found!`);
  process.exit(1);
}

// Create zip using 7zip (built-in with electron-builder)
try {
  console.log(`📦 Creating ${zipName} from unpacked app...`);
  
  // Use PowerShell's built-in Compress-Archive if available, otherwise use tar
  const cmd = `powershell -Command "Compress-Archive -Path '${unpackedDir}' -DestinationPath '${zipPath}' -Force"`;
  
  execSync(cmd, { stdio: 'inherit' });
  
  // Get file size
  const stats = fs.statSync(zipPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  
  console.log(`✅ Successfully created ${zipName} (${sizeMB} MB)`);
  console.log(`📍 Location: ${path.resolve(zipPath)}`);
  console.log(`\n🎉 App is ready for distribution!`);
  console.log(`   Users can download and extract ${zipName}, then run "Valentine's App.exe"`);
} catch (error) {
  console.error('Error creating zip:', error.message);
  process.exit(1);
}
