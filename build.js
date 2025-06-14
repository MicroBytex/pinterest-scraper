// Este script construye la versión para GitHub Pages
const fs = require('fs');
const path = require('path');

// Crear directorio de salida si no existe
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copiar archivos estáticos
const filesToCopy = ['index.html', 'styles.css'];
filesToCopy.forEach(file => {
  const source = path.join(__dirname, file);
  const dest = path.join(outputDir, file);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`Copiado: ${file} -> ${dest}`);
  }
});

console.log('¡Construcción completada!');
