const { app, Tray, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const iohook = require('iohook');
const os = require("os");
const Store = require('electron-store');

const SYSTRAY_ICON = path.join(__dirname, '/assets/images/icon.png');
const ICON = path.join(__dirname, '/assets/images/icon.png');

var bgwin = null;
var tray = null;

const store = new Store({
    defaults: {
        volume: 0.5,
        voice_profile: {
            voice_type: 'f2',
            pitch_shift: 0.0,
            pitch_variation: 0.2,
            intonation: 0.0
        },
        saved_voice_profiles: new Map()
    }
});
ipcMain.on('get-store-data-sync', (event) => {
    event.returnValue = store.store; // Returns entire store as an object
});

ipcMain.handle('store-set', async (e, key, value) => {
    store.set(key, value);
    bgwin.webContents.send(`updated-${key}`, value);
});

ipcMain.on('close-window', (e) => {
    if (bgwin) bgwin.close();
});
ipcMain.on('minimize-window', (e) => {
    if (bgwin) bgwin.minimize();
});

function createPopup() {
    if(bgwin !== null) return;
    bgwin = new BrowserWindow({
        width: 0,
        height: 0,
        icon: ICON,
        resizable: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: false,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    bgwin.removeMenu();
    bgwin.loadFile('editor.html');
    bgwin.setAspectRatio(2);
    bgwin.setMinimumSize(720, 360);
    
    // bgwin.on('close', function (e) {
    //     if (!app.isQuiting) {
    //         if (process.platform === 'darwin') app.dock.hide();
    //         e.preventDefault();
    //         bgwin.hide();
    //     }
    //     return false;
    // });

    bgwin.on('closed', function () {
        bgwin = null;
    });

    // bgwin.on('blur', () => {
    //     bgwin.close();
    // });

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