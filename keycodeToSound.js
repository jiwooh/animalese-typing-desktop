'use strict';

//TODO: create a keyboard Remapper to remap keys to sounds.
const standard = {
/* Esc */           1: { key: 'Esc', sound: 'sfx.enter', shiftSound: '' },

/* F1 */            59: { key: 'F1', sound: '', shiftSound: '' },
/* F2 */            60: { key: 'F2', sound: '', shiftSound: '' },
/* F3 */            61: { key: 'F3', sound: '', shiftSound: '' },
/* F4 */            62: { key: 'F4', sound: '', shiftSound: '' },
/* F5 */            63: { key: 'F5', sound: '', shiftSound: '' },
/* F6 */            64: { key: 'F6', sound: '', shiftSound: '' },
/* F7 */            65: { key: 'F7', sound: '', shiftSound: '' },
/* F8 */            66: { key: 'F8', sound: '', shiftSound: '' },
/* F9 */            67: { key: 'F9', sound: '', shiftSound: '' },
/* F10 */           68: { key: 'F10', sound: '', shiftSound: '' },
/* F11 */           87: { key: 'F11', sound: '', shiftSound: '' },
/* F12 */           88: { key: 'F12', sound: '', shiftSound: '' },

/* F13 */           91: { key: 'F13', sound: '', shiftSound: '' },
/* F14 */           92: { key: 'F14', sound: '', shiftSound: '' },
/* F15 */           93: { key: 'F15', sound: '', shiftSound: '' },

/* ` */             41: { key: '`', sound: '', shiftSound: 'sfx.tilde' },//TODO: add sound for 'backtick'

/* 1 */             2: { key: '1', sound: '&.sing.C4', shiftSound: 'sfx.exclamation' },
/* 2 */             3: { key: '2', sound: '&.sing.D4', shiftSound: 'sfx.at' },
/* 3 */             4: { key: '3', sound: '&.sing.E4', shiftSound: 'sfx.pound' },
/* 4 */             5: { key: '4', sound: '&.sing.F4', shiftSound: 'sfx.dollar' },
/* 5 */             6: { key: '5', sound: '&.sing.G4', shiftSound: 'sfx.percent' },
/* 6 */             7: { key: '6', sound: '&.sing.A4', shiftSound: 'sfx.caret' },
/* 7 */             8: { key: '7', sound: '&.sing.B4', shiftSound: 'sfx.ampersand' },
/* 8 */             9: { key: '8', sound: '&.sing.C5', shiftSound: 'sfx.asterisk' },
/* 9 */             10: { key: '9', sound: '&.sing.D5', shiftSound: 'sfx.parenthesis_open' },
/* 0 */             11: { key: '0', sound: '&.sing.E5', shiftSound: 'sfx.parenthesis_closed' },

/* - */             12: { key: '-', sound: '&.sing.F5', shiftSound: 'sfx.default' }, //TODO: add sound for 'underscore'
/* = */             13: { key: '=', sound: '&.sing.G5', shiftSound: 'sfx.default' }, // TODO: add sound for 'plus'
/* Backspace */     14: { key: 'Backspace', sound: 'sfx.backspace', shiftSound: '' },

/* Tab */           15: { key: 'Tab', sound: 'sfx.tab', shiftSound: '' },
/* Caps Lock */     58: { key: 'Caps Lock', sound: '', shiftSound: '' },

/* a */             30: { key: 'a', sound: '&.voice.a', shiftSound: '' },
/* b */             48: { key: 'b', sound: '&.voice.b', shiftSound: '' },
/* c */             46: { key: 'c', sound: '&.voice.c', shiftSound: '' },
/* d */             32: { key: 'd', sound: '&.voice.d', shiftSound: '' },
/* e */             18: { key: 'e', sound: '&.voice.e', shiftSound: '' },
/* f */             33: { key: 'f', sound: '&.voice.f', shiftSound: '' },
/* g */             34: { key: 'g', sound: '&.voice.g', shiftSound: '' },
/* h */             35: { key: 'h', sound: '&.voice.h', shiftSound: '' },
/* i */             23: { key: 'i', sound: '&.voice.i', shiftSound: '' },
/* j */             36: { key: 'j', sound: '&.voice.j', shiftSound: '' },
/* k */             37: { key: 'k', sound: '&.voice.k', shiftSound: '' },
/* l */             38: { key: 'l', sound: '&.voice.l', shiftSound: '' },
/* m */             50: { key: 'm', sound: '&.voice.m', shiftSound: '' },
/* n */             49: { key: 'n', sound: '&.voice.n', shiftSound: '' },
/* o */             24: { key: 'o', sound: '&.voice.o', shiftSound: '' },
/* p */             25: { key: 'p', sound: '&.voice.p', shiftSound: '' },
/* q */             16: { key: 'q', sound: '&.voice.q', shiftSound: '' },
/* r */             19: { key: 'r', sound: '&.voice.r', shiftSound: '' },
/* s */             31: { key: 's', sound: '&.voice.s', shiftSound: '' },
/* t */             20: { key: 't', sound: '&.voice.t', shiftSound: '' },
/* u */             22: { key: 'u', sound: '&.voice.u', shiftSound: '' },
/* v */             47: { key: 'v', sound: '&.voice.v', shiftSound: '' },
/* w */             17: { key: 'w', sound: '&.voice.w', shiftSound: '' },
/* x */             45: { key: 'x', sound: '&.voice.x', shiftSound: '' },
/* y */             21: { key: 'y', sound: '&.voice.y', shiftSound: '' },
/* z */             44: { key: 'z', sound: '&.voice.z', shiftSound: '' },

/* [ */             26: { key: '[', sound: 'sfx.bracket_open', shiftSound: 'sfx.brace_open' },
/* ] */             27: { key: ']', sound: 'sfx.bracket_closed', shiftSound: 'sfx.brace_closed' },
/* \ */             43: { key: '\\', sound: 'sfx.slash_back', shiftSound: 'sfx.default' }, //TODO: add sound for 'pipe'
/* / */             53: { key: '/', sound: 'sfx.slash_forward', shiftSound: 'sfx.question' },

/* ; */             39: { key: ';', sound: 'sfx.default', shiftSound: 'sfx.default' }, //TODO: add sound for 'colon'/'semicolon'
/*  */              40: { key: '\'', sound: 'sfx.default', shiftSound: 'sfx.default' }, //TODO: add sound for 'quote'/'apostrophe'
/* Enter */         28: { key: 'Enter', sound: 'sfx.enter', shiftSound: '' },

/* , */             51: { key: ',', sound: 'sfx.default', shiftSound: 'sfx.default' },//TODO: add sound for 'comma'/'less than'
/* . */             52: { key: '.', sound: 'sfx.default', shiftSound: 'sfx.default' },//TODO: add sound for 'period'/'greater than'

/* Space */         57: { key: 'Space', sound: '', shiftSound: '' },

/* PrintScreen */   3639: { key: 'PrintScreen', sound: '', shiftSound: '' },
/* ScrollLock */    70: { key: 'ScrollLock', sound: '', shiftSound: '' },
/* Pause */         3653: { key: 'Pause', sound: '', shiftSound: '' },

/* Insert */        3666: { key: 'Insert', sound: '', shiftSound: '' },
/* Delete */        3667: { key: 'Delete', sound: '', shiftSound: '' },
/* Home */          3655: { key: 'Home', sound: '', shiftSound: '' },
/* End */           3663: { key: 'End', sound: '', shiftSound: '' },
/* PageUp */        3657: { key: 'PageUp', sound: '', shiftSound: '' },
/* PageDown */      3665: { key: 'PageDown', sound: '', shiftSound: '' },

/* ↑ */             57416: { key: 'Up', sound: 'sfx.arrow_up', shiftSound: '' },
/* ← */             57419: { key: 'Left', sound: 'sfx.arrow_left', shiftSound: '' },
/* → */             57421: { key: 'Right', sound: 'sfx.arrow_right', shiftSound: '' },
/* ↓ */             57424: { key: 'Down', sound: 'sfx.arrow_down', shiftSound: '' },

/* Shift */         42: { key: 'Shift', sound: '', shiftSound: '' },
/* Shift */         54: { key: 'Shift', sound: '', shiftSound: '' },
/* Ctrl */          29: { key: 'Ctrl', sound: '', shiftSound: '' },
/* Ctrl */          3613: { key: 'Ctrl', sound: '', shiftSound: '' },
/* Alt */           56: { key: 'Alt', sound: '', shiftSound: '' },
/* Alt */           3640: { key: 'Alt', sound: '', shiftSound: '' },
/* Meta */          3675: { key: 'Meta', sound: '', shiftSound: '' },
/* Meta */          3676: { key: 'Meta', sound: '', shiftSound: '' },
/* Menu */          3677: { key: 'Menu', sound: '', shiftSound: '' },

// Num
/* Num Lock */      69: { key: 'Num Lock', sound: '', shiftSound: '' },
/* Num / */         3637: { key: 'Num /', sound: '', shiftSound: '' },
/* Num * */         55: { key: 'Num *', sound: '', shiftSound: '' },
/* Num - */         74: { key: 'Num -', sound: '', shiftSound: '' },
/* Num - */         3597: { key: 'Num -', sound: '', shiftSound: '' },
/* Num + */         78: { key: 'Num +', sound: '', shiftSound: '' },
/* Num Enter */     3612: { key: 'Num Enter', sound: 'sfx.enter', shiftSound: '' },
/* Num . */         83: { key: 'Num .', sound: '', shiftSound: '' },
    
/* Num 1 */         79: { key: 'Num 1', sound: '&.sing.C4', shiftSound: '' },
/* Num 2 */         80: { key: 'Num 2', sound: '&.sing.D4', shiftSound: '' },
/* Num 3 */         81: { key: 'Num 3', sound: '&.sing.Eb4', shiftSound: '' },
/* Num 4 */         75: { key: 'Num 4', sound: '&.sing.F4', shiftSound: '' },
/* Num 5 */         76: { key: 'Num 5', sound: '&.sing.G4', shiftSound: '' },
/* Num 6 */         77: { key: 'Num 6', sound: '&.sing.Ab4', shiftSound: '' },
/* Num 7 */         71: { key: 'Num 7', sound: '&.sing.Bb4', shiftSound: '' },
/* Num 8 */         72: { key: 'Num 8', sound: '&.sing.C5', shiftSound: '' },
/* Num 9 */         73: { key: 'Num 9', sound: '&.sing.D5', shiftSound: '' },
/* Num 0 */         82: { key: 'Num 0', sound: '&.sing.Eb5', shiftSound: '' },
};

const darwin = JSON.parse(JSON.stringify(standard));
Object.assign(darwin, {
  /* Return */      28: { key: 'Return', sound: '', shiftSound: '' },
  /* Option */      56: { key: 'Option', sound: '', shiftSound: '' },
  /* Clear */       69: { key: 'Clear', sound: '', shiftSound: '' },
  /* Option */      3640: { key: 'Option', sound: '', shiftSound: '' },
  /* Fn */          3666: { key: 'Fn', sound: '', shiftSound: '' },
  /* Command */     3675: { key: 'Command', sound: '', shiftSound: '' },
  /* Command */     3676: { key: 'Command', sound: '', shiftSound: '' },
});

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  /* Win */         3675: { key: 'Win', sound: '', shiftSound: '' },
  /* Win */         3676: { key: 'Win', sound: '', shiftSound: '' },
  /* Insert */      61010: { key: 'Insert', sound: '', shiftSound: '' },
  /* Delete */      61011: { key: 'Delete', sound: '', shiftSound: '' },
  /* Home */        60999: { key: 'Home', sound: '', shiftSound: '' },
  /* End */         61007: { key: 'End', sound: '', shiftSound: '' },
  /* PageUp */      61001: { key: 'PageUp', sound: '', shiftSound: '' },
  /* PageDown */    61009: { key: 'PageDown', sound: '', shiftSound: '' },
  /* ↑ */           61000: { key: 'Up', sound: 'sfx.arrow_up', shiftSound: '' },
  /* ← */           61003: { key: 'Left', sound: 'sfx.arrow_left', shiftSound: '' },
  /* → */           61005: { key: 'Right', sound: 'sfx.arrow_right', shiftSound: '' },
  /* ↓ */           61008: { key: 'Down', sound: 'sfx.arrow_down', shiftSound: '' },
});

const linux = JSON.parse(JSON.stringify(standard));

module.exports = { standard, darwin, win32, linux };
