const { contextBridge, ipcRenderer } = require('electron');
const { Howl } = require('howler');
const path = require('path');
const keycodesMap = require('./keycode-map');

contextBridge.exposeInMainWorld('api', {
    onPlaySound: (callback) => {
            ipcRenderer.on('play-sound', (_event, e) => {
            callback(keycodesMap.standard[e.keycode]);
        });
    },
    playSound: (audioPath) => play(audioPath)
});

function play(audioPath) {
    let audio = new Howl({
        src: [audioPath],
        onload: () => console.log('Sound loaded!'),
        onloaderror: (id, err) => console.error('Load error:', err)
    });

    audio.play();
}