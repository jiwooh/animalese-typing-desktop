//main.js

const { app, Tray, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const iohook = require('iohook');
const os = require("os");

const SYSTRAY_ICON = path.join(__dirname, '/assets/images/icon.png');
const ICON = path.join(__dirname, '/assets/images/icon.png');


var win = null;
var tray = null;

function createWindow() {
    win = new BrowserWindow({
        width: 318,
        height: 280,
        icon: ICON,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        resizable: false
    });

    // remove menu bar
    win.removeMenu();

    win.loadFile('index.html');

    win.on('close', function (event) {
        if (!app.isQuiting) {
          if (process.platform === 'darwin') {
            app.dock.hide();
          }
          event.preventDefault();
          win.hide();
        }
        return false;
    });

    win.on('closed', function () {
        win = null;
    });

    win.webContents.openDevTools();
    win.resizable=true;

    createTrayIcon();

    console.log("START")
}

//TODO
function createTrayIcon() {
    // prevent dupe tray icons
    if(tray !== null) return;

    // start tray icon
    tray = new Tray(SYSTRAY_ICON);

    // tray icon tooltip
    tray.setToolTip('Animalese Typing');

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            click: () => {
            if (win) {
                win.show(); // You could load a settings page instead
                win.focus();
            }
            }
        },
        {
            label: 'Exit',
            click: () => {
            iohook.stop();
            app.quit();
            }
        }
    ]);

    tray.setContextMenu(contextMenu);

    // Left click: show the app
    tray.on('click', () => {
        if (win) {
            win.show();
            win.focus();
        }
    });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

app.on('ready', () => {
    iohook.start(true);

    iohook.on('keydown', e => {
        win.webContents.send('play-sound', e);
    });
});

app.on('before-quit', () => {
    iohook.unload();
    iohook.stop();
});