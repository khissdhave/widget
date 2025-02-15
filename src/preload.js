// src/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    onStatsUpdate: (callback) => {
        ipcRenderer.on("update-stats", (_event, stats) => {
            callback(stats);
        });
    }
});
