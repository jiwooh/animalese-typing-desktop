//main.js
const { app, Tray, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const SYSTRAY_ICON = path.join(__dirname, '/assets/images/icon.png');

var tray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 320,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    mainWindow.loadFile('src/popup.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });


    createTrayIcon();

}

//TODO
function createTrayIcon() {
    // prevent dupe tray icons
    if(tray !== null) return;

    // start tray icon
    tray = new Tray(SYSTRAY_ICON);

    // tray icon tooltip
    tray.setToolTip('Animalese Typing');

}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
