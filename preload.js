const { contextBridge, ipcRenderer } = require('electron');
const { Howl } = require('howler');
const path = require('path');
const keycodesMap = require('./keycode-map');

// context bridge setup
contextBridge.exposeInMainWorld('api', {
    onKeyPress: (callback) => ipcRenderer.on('play-sound', (_event, e) => callback(keycodesMap.win32[e.keycode], e)),
    playAudio: (audioPath) => play(audioPath)
});


// TODO: probably move the sprite maps elsewhere and have one for each voice type file
//#region Audio Maps
const file_type = ".wav";
const voice_type = "f1";
const audioVoice = new Howl({
    src: ['assets/audio/'+voice_type+'/voice'+file_type],
    // (60,000/2) / 150bpm = 200
    sprite: {
        a: [200 * 0,    200],
        b: [200 * 1,    200],
        c: [200 * 2,    200],
        d: [200 * 3,    200],
        e: [200 * 4,    200],
        f: [200 * 5,    200],
        g: [200 * 6,    200],
        h: [200 * 7,    200],
        i: [200 * 8,    200],
        j: [200 * 9,    200],
        k: [200 * 10,   200],
        l: [200 * 11,   200],
        m: [200 * 12,   200],
        n: [200 * 13,   200],
        o: [200 * 14,   200],
        p: [200 * 15,   200],
        q: [200 * 16,   200],
        r: [200 * 17,   200],
        s: [200 * 18,   200],
        t: [200 * 19,   200],
        u: [200 * 20,   200],
        v: [200 * 21,   200],
        w: [200 * 22,   200],
        x: [200 * 23,   200],
        y: [200 * 24,   200],
        z: [200 * 25,   200],
    },
    onloaderror: (id, err) => console.error('Load error:', err)
});

const audioSpecial = new Howl({
    src: ['assets/audio/'+voice_type+'/special'+file_type],
    // 60,000 / 100bpm = 600
    sprite: {
        OK:     [600 * 0, 600],
        Deska:  [600 * 1, 600],
        Gwah:   [600 * 2, 600]
    },
    onloaderror: (id, err) => console.error('Load error:', err)
});

const audioNumber = new Howl({
    src: ['assets/audio/'+voice_type+'/sing'+file_type],
    // (60,000/2) / 100bpm = 600
    sprite: {
        1:  [300 * 0, 300],
        2:  [300 * 1, 300],
        3:  [300 * 2, 300],
        4:  [300 * 2, 300],
        5:  [300 * 2, 300],
        6:  [300 * 2, 300],
        7:  [300 * 2, 300],
        8:  [300 * 2, 300],
        9:  [300 * 2, 300],
        10: [300 * 2, 300],
        11: [300 * 2, 300],
        12: [300 * 2, 300]
    },
    onloaderror: (id, err) => console.error('Load error:', err)
});

const audioSfx = new Howl({
    src: ['assets/audio/sfx'+file_type],
    // 60,000 / 100bpm = 600
    sprite: {
        backspace           : [600 * 0,  600],
        enter               : [600 * 1,  600],
        tab                 : [600 * 2,  600],
        question            : [600 * 3,  600],
        exclamation         : [600 * 4,  600],
        at                  : [600 * 5,  600],
        pound               : [600 * 6,  600],
        dollar              : [600 * 7,  600],
        caret               : [600 * 8,  600],
        ampersand           : [600 * 9,  600],
        asterisk            : [600 * 10, 600],
        parenthesis_open    : [600 * 11, 600],
        parenthesis_closed  : [600 * 12, 600],
        bracket_open        : [600 * 13, 600],
        bracket_closed      : [600 * 14, 600],
        brace_open          : [600 * 15, 600],
        brace_close         : [600 * 16, 600],
        tilde               : [600 * 17, 600],
        default             : [600 * 18, 600],
        arrow_left          : [600 * 19, 600],
        arrow_up            : [600 * 20, 600],
        arrow_right         : [600 * 21, 600],
        arrow_down          : [600 * 22, 600],
        slash_forward       : [600 * 23, 600],
        slash_back          : [600 * 24, 600],
        percent             : [600 * 25, 600]
    },
    onloaderror: (id, err) => console.error('Load error:', err)
});
//#endregion

function play(key) {
    audioVoice.play(key);
}