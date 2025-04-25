const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const keycodesMap = require('./keycode-map');
const { createAudioManager } = require('./renderer/audio-manager');

// context bridge setup
contextBridge.exposeInMainWorld('api', {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    onKeyPress: (callback) => ipcRenderer.on('keydown', (_event, e) => callback(keycodesMap.win32[e.keycode], e)),
});

contextBridge.exposeInMainWorld('audio', createAudioManager());