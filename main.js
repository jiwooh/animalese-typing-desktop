const { app, Tray, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const iohook = require('iohook');
const os = require("os");
const Store = require('electron-store');

const SYSTRAY_ICON = path.join(__dirname, '/assets/images/icon.png');
const SYSTRAY_ICON_OFF = path.join(__dirname, '/assets/images/icon_off.png');
const ICON = path.join(__dirname, '/assets/images/icon.png');
const gotTheLock = app.requestSingleInstanceLock();

function showIfAble() { // focus the existing window if it exists
    if (bgwin) {
        bgwin.show();
        bgwin.focus();
    }
}

function setDisable(value) {
    disabled = value;
    store.set('disabled', disabled);
    if (tray) {
        tray.setImage(disabled?SYSTRAY_ICON_OFF:SYSTRAY_ICON);
        tray.setToolTip(disabled?'Animalese Typing: Disabled':'Animalese Typing');
    }
    if (disabled) iohook.stop(); else iohook.start();
}

if (!gotTheLock) app.quit(); // if another instance is already running then quit
else app.on('second-instance', () => showIfAble()); // show instance that is running

app.setAppUserModelId('com.joshxviii.animalese-typing');

const store = new Store({
    defaults: {
        lang: 'en',
        volume: 0.5,
        disabled: false,
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
    event.returnValue = store.store;
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

var bgwin = null;
var tray = null;
var disabled = store.get('disabled', false);//TODO: this should be set to true when the the selected window is out of focus.

function createPopup() {
    if(bgwin !== null) return;
    bgwin = new BrowserWindow({
        width: 0,
        height: 0,
        icon: ICON,
        resizable: true,
        frame: false,
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
    if(tray !== null) return; // prevent dupe tray icons

    tray = new Tray(disabled?SYSTRAY_ICON_OFF:SYSTRAY_ICON);
    tray.setToolTip(disabled?'Animalese Typing: Disabled':'Animalese Typing');

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            click: () => { showIfAble(); } //TODO: make a settings window
        },
        {
            label: 'Run on startup',
            type: 'checkbox',
            checked: app.getLoginItemSettings().openAtLogin,
            click: (menuItem) => {
                app.setLoginItemSettings({
                    openAtLogin: menuItem.checked,
                    openAsHidden: true
                });
            }
        },
        {
            label: 'Disable',
            type: 'checkbox',
            checked: disabled,
            click: (menuItem) => {
                setDisable(menuItem.checked);
            }
        },
        {
            label: 'Quit',
            click: () => {
                iohook.unload();
                iohook.stop();
                app.quit();
            }
        }
    ]);
    tray.setContextMenu(contextMenu);
    tray.on('click', () => { showIfAble(); });
    tray.displayBalloon({
        title: "Animalese Typing",
        content: "Animalese Typing is Running!"
    });    
}

app.whenReady().then(() => {
    createPopup();
    createTrayIcon();
    if (process.platform === 'darwin') app.dock.hide();
    bgwin.hide();
});

app.on('activate', function () {
    if (bgwin === null) createPopup();
});

app.on('ready', () => {
    if (!disabled) iohook.start();
    iohook.on('keydown', e => {
        bgwin.webContents.send('keydown', e);
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
    iohook.unload();
    iohook.stop();

    if (bgwin) {
        bgwin.removeAllListeners();
        bgwin.close();
    }
    if (tray) tray.destroy();

    ipcMain.removeAllListeners();
});

app.on('quit', () =>  app.exit(0) );