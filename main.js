const { app, Tray, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const iohook = require('iohook');
const os = require("os");

const SYSTRAY_ICON = path.join(__dirname, '/assets/images/icon.png');
const ICON = path.join(__dirname, '/assets/images/icon.png');

var bgwin = null;
var tray = null;

function createPopup() {
    if(bgwin !== null) return;
    bgwin = new BrowserWindow({
        width: 0,
        height: 0,
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
    bgwin.removeMenu();
    bgwin.loadFile('editor.html');
    bgwin.setAspectRatio(16 / 9);
    bgwin.setMinimumSize(640, 360);
    
    bgwin.on('close', function (e) {
        if (!app.isQuiting) {
            if (process.platform === 'darwin') app.dock.hide();
            e.preventDefault();
            bgwin.hide();
        }
        return false;
    });

    bgwin.on('closed', function () {
        bgwin = null;
    });

    bgwin.on('blur', () => {
        bgwin.close();
    });

    bgwin.webContents.on('before-input-event', (e, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === 'i') {
            const wc = bgwin.webContents;
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
        if (bgwin) {
            bgwin.show();
            bgwin.focus();
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
    if (bgwin === null) createPopup();
});

app.on('ready', () => {
    iohook.start(true);
    iohook.on('keydown', e => {
        bgwin.webContents.send('keydown', e);
    });
});

app.on('before-quit', () => {
    iohook.unload();
    iohook.stop();
});