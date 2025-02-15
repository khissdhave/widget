// src/renderer.js
console.log("Renderer script loaded");

// Listen for stats updates
window.electron.onStatsUpdate((stats) => {
    document.getElementById("cpu").innerText = `${stats.cpu}%`;
    document.getElementById("ram").innerText = `${stats.ram}%`;
    document.getElementById("disk").innerText = `${stats.disk}%`;
    document.getElementById("net").innerText = `${stats.net} KB/s`;
});

// Update time every second
function updateTime() {
    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toDateString();
}

setInterval(updateTime, 1000);
