// Copia i file del sito in dist/ (cartella di output per Cloudflare Pages).
// Il sito è statico: nessuna trasformazione, solo una copia pulita.
const fs = require('fs');
const path = require('path');

const root = __dirname;
const out = path.join(root, 'dist');
const include = ['index.html', 'styles.css', 'script.js', 'favicon.ico', 'assets'];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);

for (const name of include) {
  const src = path.join(root, name);
  if (!fs.existsSync(src)) { console.warn('manca:', name); continue; }
  fs.cpSync(src, path.join(out, name), { recursive: true });
}

function count(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .reduce((n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1), 0);
}
console.log(`dist/ pronta: ${count(out)} file`);
