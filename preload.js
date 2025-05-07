const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const keycodeToSound = require('./keycodeToSound');
const translator = require('./translator'); 
const { createAudioManager } = require('./audioManager');
const { initCapsLockState, isCapsLockActive } = require('./capsLockState');
initCapsLockState();

const settingsData = ipcRenderer.sendSync('get-store-data-sync');

// general app messages 
contextBridge.exposeInMainWorld('api', {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    onKeyPress: (callback) => ipcRenderer.on('keydown', (_event, e) => callback(keycodeToSound.win32[e.keycode], e, isCapsLockActive())),
    onSettingUpdate: (key, callback) => {
        const channel = `updated-${key}`;
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
    }
});

// translation functions
contextBridge.exposeInMainWorld('translator', {
    load: (lang) => translator.loadLanguage(lang),
    t: (key) => translator.translate(key)
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