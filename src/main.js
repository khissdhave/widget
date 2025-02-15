// src/main.js
const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const si = require("systeminformation");
const { exec } = require("child_process");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        x: 10,
        y: 10,
        frame: false,
        transparent: true,
        resizable: false,
        skipTaskbar: true,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // Move window behind everything
    setTimeout(() => {
        exec(`xdotool search --name "Desktop Widget" windowlower`);
        exec(`xprop -id $(xwininfo -name "Desktop Widget" | grep 'Window id' | awk '{print $4}') -f _NET_WM_WINDOW_TYPE 32a -set _NET_WM_WINDOW_TYPE _NET_WM_WINDOW_TYPE_DESKTOP`);
    }, 1500);

    // Send system stats every second
    setInterval(async () => {
        try {
            const [cpuLoad, mem, disk, net] = await Promise.all([
                si.currentLoad(),
                si.mem(),
                si.fsSize(),
                si.networkStats()
            ]);

            const stats = {
                cpu: cpuLoad.currentLoad.toFixed(1),
                ram: ((mem.active / mem.total) * 100).toFixed(1),
                disk: disk[0] ? ((disk[0].used / disk[0].size) * 100).toFixed(1) : "N/A",
                net: net[0] ? (net[0].rx_sec / 1024).toFixed(1) : "0"
            };

            // Send stats to renderer process
            if (mainWindow) {
                mainWindow.webContents.send("update-stats", stats);
            }
        } catch (error) {
            console.error("Error fetching system stats:", error);
        }
    }, 1000);
});

// Cleanup on exit
app.on("window-all-closed", () => {
    app.quit();
});
