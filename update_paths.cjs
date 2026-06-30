const fs = require('fs');
const path = require('path');

const osDataPath = path.join(__dirname, 'src', 'data', 'osData.js');
let content = fs.readFileSync(osDataPath, 'utf8');

// The replacement logic: we want to replace `icon: "https://..."` with `icon: "/assets/logos/<id>.<ext>"`
// We can use a regex to find id and then replace the icon in the same block.

const lines = content.split('\n');
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch) {
    currentId = idMatch[1];
  }

  if (line.includes('icon: "http')) {
    const iconMatch = line.match(/icon:\s*"([^"]+)"/);
    if (iconMatch && currentId) {
      const url = iconMatch[1];
      const ext = url.split('.').pop().split('?')[0];
      lines[i] = line.replace(/"https?[^"]+"/, `"/assets/logos/${currentId}.${ext}"`);
    }
  }
}

fs.writeFileSync(osDataPath, lines.join('\n'), 'utf8');
console.log('Updated osData.js');
