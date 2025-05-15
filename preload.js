const { app, shell, contextBridge, ipcRenderer } = require('electron');
const os = require("os");
const path = require('path');
const keycodeToSound = require('./keycodeToSound');
const translator = require('./translator'); 
const { createAudioManager } = require('./audioManager');
const { initCapsLockState, isCapsLockActive } = require('./capsLockState');
initCapsLockState();

const settingsData = ipcRenderer.sendSync('get-store-data-sync');
const appInfo = ipcRenderer.sendSync('get-app-info');
const platform = os.platform();

// general app messages 
contextBridge.exposeInMainWorld('api', {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    onKeyPress: (callback) => ipcRenderer.on('keydown', (_event, e) => {
        const keyInfo = {
            data: keycodeToSound[platform][e.keycode],
            keycode: e.keycode,
            isShiftDown: e.shiftKey,
            isCapsLock: isCapsLockActive()
        }
        callback(keyInfo);
    }),
    onSettingUpdate: (key, callback) => {
        const channel = `${key}`;
        const handler = (_, value) => {
            if (document.readyState === 'loading') {
                window.addEventListener('load', () => callback(value));
            } else {
                callback(value);
            }
        };
        ipcRenderer.on(channel, handler);
        
        return () => {
            ipcRenderer.removeListener(channel, handler);
        };
    },
    onActiveWindowChanged: (callback) => ipcRenderer.on('active-windows-updated', (_event, e) => callback(e)),
    getAppInfo: () => appInfo,
    goToUrl: (url) => shell.openExternal(url)
});

// translation functions
contextBridge.exposeInMainWorld('translator', {
    load: (lang) => translator.loadLanguage(lang),
    update: () => translator.updateHtmlDocumentTranslations()
});

// user settings get/set
contextBridge.exposeInMainWorld('settings', {
    get: (key) => settingsData[key],
    set: (key, value) => {
        settingsData[key] = value;
        return ipcRenderer.invoke('store-set', key, value)
    }
});

// audio manager
contextBridge.exposeInMainWorld('audio', createAudioManager(settingsData.volume || 0.5));