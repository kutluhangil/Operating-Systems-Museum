import urllib.request
import os
import time

logos = {
    "ms-dos": "https://upload.wikimedia.org/wikipedia/commons/3/30/MS-DOS_logo.svg",
    "ms-dos-6": "https://upload.wikimedia.org/wikipedia/commons/3/30/MS-DOS_logo.svg",
    "windows-1": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Windows_logo_-_1992.svg",
    "windows-95": "https://upload.wikimedia.org/wikipedia/commons/8/85/Windows_95_logo.svg",
    "windows-98": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Windows_98_logo.svg",
    "windows-me": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Windows_98_logo.svg",
    "windows-xp": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Unofficial_fan_made_Windows_XP_logo_variant.svg",
    "windows-vista": "https://upload.wikimedia.org/wikipedia/en/1/14/Windows_logo_-_2006.svg",
    "windows-7": "https://upload.wikimedia.org/wikipedia/commons/8/84/Unofficial_fan_made_Windows_7_logo_variant.svg",
    "windows-8": "https://upload.wikimedia.org/wikipedia/commons/0/05/Windows_10_Logo.svg",
    "windows-10": "https://upload.wikimedia.org/wikipedia/commons/0/05/Windows_10_Logo.svg",
    "windows-11": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg",
    "macos-x": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "macos-monterey": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "ubuntu": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg",
    "debian": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg",
    "fedora": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg",
    "android": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
    "ios": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "chromeos": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Google_Chrome_Logo.svg",
    "reactos": "https://upload.wikimedia.org/wikipedia/commons/1/13/ReactOS_Logo.png",
    "haiku": "https://upload.wikimedia.org/wikipedia/commons/0/08/Haiku_OS.svg",
    "freedos": "https://upload.wikimedia.org/wikipedia/commons/7/74/FreeDOS_logo.svg"
}

os.makedirs('public/assets/logos', exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for os_id, url in logos.items():
    ext = url.split('.')[-1].split('?')[0]
    dest = f'public/assets/logos/{os_id}.{ext}'
    if os.path.exists(dest):
        continue
    
    print(f'Downloading {os_id}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(dest, 'wb') as out_file:
                out_file.write(response.read())
        print(f'Saved {os_id}.{ext}')
    except Exception as e:
        print(f'Error downloading {os_id}: {e}')
    time.sleep(1)

print('Done')
