const { app, Tray, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const iohook = require('iohook');
const os = require("os");

const SYSTRAY_ICON = path.join(__dirname, '/assets/images/icon.png');
const ICON = path.join(__dirname, '/assets/images/icon.png');

var popup = null;
var tray = null;

function createPopup() {
    if(popup !== null) return;
    popup = new BrowserWindow({
        width: 400,
        height: 220,
        icon: ICON,
        resizable: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    popup.removeMenu();
    popup.loadFile('index.html');
    
    popup.on('close', function (e) {
        if (!app.isQuiting) {
            if (process.platform === 'darwin') app.dock.hide();
            e.preventDefault();
            popup.hide();
        }
        return false;
    });

    popup.on('closed', function () {
        popup = null;
    });

    popup.on('blur', () => {
        popup.close();
    });

    popup.webContents.on('before-input-event', (e, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === 'i') {
            const wc = popup.webContents;
            if (wc.isDevToolsOpened()) wc.closeDevTools();
            else  wc.openDevTools({ mode: 'detach' });
            e.preventDefault();
        }
    });
}


function createTrayIcon() {
    // prevent dupe tray icons
    if(tray !== null) return;

    tray = new Tray(SYSTRAY_ICON);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            click: () => {}
        },
        {
            label: 'Exit',
            click: () => {
            iohook.unload();
            iohook.stop();
            app.quit();
            }
        }
    ]);
    tray.on('click', () => {
        if (popup) {
            popup.show();
            popup.focus();
        }
    });

    tray.setToolTip('Animalese Typing');
    tray.setContextMenu(contextMenu);

    tray.displayBalloon({
        title: "Animalese Typing",
        content: "Animalese Typing is Running!"
    });    
}

app.whenReady().then(() => {
    createPopup();
    createTrayIcon();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (popup === null) createPopup();
});

app.on('ready', () => {
    iohook.start(true);
    iohook.on('keydown', e => {
        popup.webContents.send('keydown', e);
    });
});

app.on('before-quit', () => {
    iohook.unload();
    iohook.stop();
});