const fs = require('fs');
const path = require('path');
const https = require('https');

const logos = {
  "ms-dos": "https://upload.wikimedia.org/wikipedia/commons/3/30/MS-DOS_logo.svg",
  "ms-dos-6": "https://upload.wikimedia.org/wikipedia/commons/3/30/MS-DOS_logo.svg",
  "windows-1": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Windows_logo_-_1992.svg",
  "windows-95": "https://upload.wikimedia.org/wikipedia/commons/8/85/Windows_95_logo.svg",
  "windows-98": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Windows_98_logo.svg",
  "windows-me": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Windows_98_logo.svg",
  "windows-xp": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Unofficial_fan_made_Windows_XP_logo_variant.svg",
  "windows-vista": "https://upload.wikimedia.org/wikipedia/en/1/14/Windows_logo_-_2006.svg",
  "windows-7": "https://upload.wikimedia.org/wikipedia/commons/8/84/Unofficial_fan_made_Windows_7_logo_variant.svg",
  "windows-8": "https://upload.wikimedia.org/wikipedia/commons/7/76/Windows_8_logo_and_wordmark.svg",
  "windows-10": "https://upload.wikimedia.org/wikipedia/commons/0/05/Windows_10_Logo.svg",
  "windows-11": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg",
  "macos-x": "https://upload.wikimedia.org/wikipedia/commons/2/21/Mac_OS_X_Logo.svg",
  "macos-monterey": "https://upload.wikimedia.org/wikipedia/commons/2/21/Mac_OS_X_Logo.svg",
  "ubuntu": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg",
  "debian": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg",
  "fedora": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg",
  "android": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
  "ios": "https://upload.wikimedia.org/wikipedia/commons/c/ca/IOS_logo.svg",
  "chromeos": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Google_Chrome_Logo.svg",
  "reactos": "https://upload.wikimedia.org/wikipedia/commons/1/13/ReactOS_Logo.png",
  "haiku": "https://upload.wikimedia.org/wikipedia/commons/0/08/Haiku_OS.svg",
  "freedos": "https://upload.wikimedia.org/wikipedia/commons/7/74/FreeDOS_logo.svg"
};

const dir = path.join(__dirname, 'public', 'assets', 'logos');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const [id, url] of Object.entries(logos)) {
    const ext = url.split('.').pop().split('?')[0];
    const dest = path.join(dir, `${id}.${ext}`);
    console.log(`Downloading ${id} logo...`);
    try {
      await download(url, dest);
      console.log(`Downloaded ${id}`);
    } catch (e) {
      console.error(e.message);
    }
    await new Promise(r => setTimeout(r, 500));
  }
}

run();
