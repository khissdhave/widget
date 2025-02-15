
---

### **✅ `install.sh` (Installation Script)**
```sh
#!/bin/bash

echo "📦 Installing Dependencies..."
sudo apt update && sudo apt install -y xdotool wmctrl x11-utils

echo "⚙️ Setting up Node.js environment..."
if ! command -v node &>/dev/null; then
    echo "Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "📂 Installing npm dependencies..."
npm install

echo "🚀 Setting up auto-start..."
mkdir -p ~/.config/autostart
cat <<EOF > ~/.config/autostart/DesktopWidget.desktop
[Desktop Entry]
Type=Application
Exec=$(pwd)/node_modules/.bin/electron $(pwd)
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Desktop Widget
EOF

echo "✅ Installation Complete!"
echo "Run 'npm start' to launch the app."
