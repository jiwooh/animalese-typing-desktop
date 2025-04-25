const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const keycodesMap = require('./keycode-map');
const { createAudioManager } = require('./audioManager');
const { initCapsLockTracker, isCapsLockActive } = require('./capsLockTracker');
initCapsLockTracker();

const settingsData = ipcRenderer.sendSync('get-store-data-sync');

// general app messages 
contextBridge.exposeInMainWorld('api', {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    onKeyPress: (callback) => ipcRenderer.on('keydown', (_event, e) => callback(keycodesMap.win32[e.keycode], e, isCapsLockActive())),
    onSettingUpdate: (key, callback) => {
        settingsData[key] = value;
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