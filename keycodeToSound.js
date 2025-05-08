'use strict';

//TODO: create a keyboard Remapper to remap keys to sounds. the will hole the default mappings
const standard = {
/* Esc */           1: { key: 'Esc', sound: 'sfx.enter' },

/* F1 */            59: { key: 'F1', sound: '' },
/* F2 */            60: { key: 'F2', sound: '' },
/* F3 */            61: { key: 'F3', sound: '' },
/* F4 */            62: { key: 'F4', sound: '' },
/* F5 */            63: { key: 'F5', sound: '' },
/* F6 */            64: { key: 'F6', sound: '' },
/* F7 */            65: { key: 'F7', sound: '' },
/* F8 */            66: { key: 'F8', sound: '' },
/* F9 */            67: { key: 'F9', sound: '' },
/* F10 */           68: { key: 'F10', sound: '' },
/* F11 */           87: { key: 'F11', sound: '' },
/* F12 */           88: { key: 'F12', sound: '' },

/* F13 */           91: { key: 'F13', sound: '' },
/* F14 */           92: { key: 'F14', sound: '' },
/* F15 */           93: { key: 'F15', sound: '' },

/* ` */             41: { key: '`', sound: '', shiftKey: '~', shiftSound: 'sfx.tilde' },//TODO: add sound for 'backtick'

/* 1 */             2: { key: '1', sound: '&.sing.C4', shiftKey: '!', shiftSound: 'sfx.exclamation' },
/* 2 */             3: { key: '2', sound: '&.sing.D4', shiftKey: '@', shiftSound: 'sfx.at' },
/* 3 */             4: { key: '3', sound: '&.sing.E4', shiftKey: '#', shiftSound: 'sfx.pound' },
/* 4 */             5: { key: '4', sound: '&.sing.F4', shiftKey: '$', shiftSound: 'sfx.dollar' },
/* 5 */             6: { key: '5', sound: '&.sing.G4', shiftKey: '%', shiftSound: 'sfx.percent' },
/* 6 */             7: { key: '6', sound: '&.sing.A4', shiftKey: '^', shiftSound: 'sfx.caret' },
/* 7 */             8: { key: '7', sound: '&.sing.B4', shiftKey: '&', shiftSound: 'sfx.ampersand' },
/* 8 */             9: { key: '8', sound: '&.sing.C5', shiftKey: '*', shiftSound: 'sfx.asterisk' },
/* 9 */             10: { key: '9', sound: '&.sing.D5', shiftKey: '(', shiftSound: 'sfx.parenthesis_open' },
/* 0 */             11: { key: '0', sound: '&.sing.E5', shiftKey: ')', shiftSound: 'sfx.parenthesis_closed' },

/* - */             12: { key: '-', sound: '&.sing.F5', shiftKey: '_', shiftSound: 'sfx.default' }, //TODO: add sound for 'underscore'
/* = */             13: { key: '=', sound: '&.sing.G5', shiftKey: '+', shiftSound: 'sfx.default' }, // TODO: add sound for 'plus'
/* Backspace */     14: { key: 'Backspace', sound: 'sfx.backspace' },

/* Tab */           15: { key: 'Tab', sound: 'sfx.tab' },
/* Caps Lock */     58: { key: 'Caps Lock', sound: '' },

/* a */             30: { key: 'a', shiftKey: 'A', sound: '&.voice.a' },
/* b */             48: { key: 'b', shiftKey: 'B', sound: '&.voice.b' },
/* c */             46: { key: 'c', shiftKey: 'C', sound: '&.voice.c' },
/* d */             32: { key: 'd', shiftKey: 'D', sound: '&.voice.d' },
/* e */             18: { key: 'e', shiftKey: 'E', sound: '&.voice.e' },
/* f */             33: { key: 'f', shiftKey: 'F', sound: '&.voice.f' },
/* g */             34: { key: 'g', shiftKey: 'G', sound: '&.voice.g' },
/* h */             35: { key: 'h', shiftKey: 'H', sound: '&.voice.h' },
/* i */             23: { key: 'i', shiftKey: 'I', sound: '&.voice.i' },
/* j */             36: { key: 'j', shiftKey: 'J', sound: '&.voice.j' },
/* k */             37: { key: 'k', shiftKey: 'K', sound: '&.voice.k' },
/* l */             38: { key: 'l', shiftKey: 'L', sound: '&.voice.l' },
/* m */             50: { key: 'm', shiftKey: 'M', sound: '&.voice.m' },
/* n */             49: { key: 'n', shiftKey: 'N', sound: '&.voice.n' },
/* o */             24: { key: 'o', shiftKey: 'O', sound: '&.voice.o' },
/* p */             25: { key: 'p', shiftKey: 'P', sound: '&.voice.p' },
/* q */             16: { key: 'q', shiftKey: 'Q', sound: '&.voice.q' },
/* r */             19: { key: 'r', shiftKey: 'R', sound: '&.voice.r' },
/* s */             31: { key: 's', shiftKey: 'S', sound: '&.voice.s' },
/* t */             20: { key: 't', shiftKey: 'T', sound: '&.voice.t' },
/* u */             22: { key: 'u', shiftKey: 'U', sound: '&.voice.u' },
/* v */             47: { key: 'v', shiftKey: 'V', sound: '&.voice.v' },
/* w */             17: { key: 'w', shiftKey: 'W', sound: '&.voice.w' },
/* x */             45: { key: 'x', shiftKey: 'X', sound: '&.voice.x' },
/* y */             21: { key: 'y', shiftKey: 'Y', sound: '&.voice.y' },
/* z */             44: { key: 'z', shiftKey: 'Z', sound: '&.voice.z' },

/* [ */             26: { key: '[', sound: 'sfx.bracket_open', shiftKey: '{', shiftSound: 'sfx.brace_open' },
/* ] */             27: { key: ']', sound: 'sfx.bracket_closed', shiftKey: '}', shiftSound: 'sfx.brace_closed' },
/* \ */             43: { key: '\\', sound: 'sfx.slash_back', shiftKey: '|', shiftSound: 'sfx.default' }, //TODO: add sound for 'pipe'
/* / */             53: { key: '/', sound: 'sfx.slash_forward', shiftKey: '?', shiftSound: 'sfx.question' },

/* ; */             39: { key: ';', sound: 'sfx.default', shiftKey: ':', shiftSound: 'sfx.default' }, //TODO: add sound for 'colon'/'semicolon'
/*  */              40: { key: '\'', sound: 'sfx.default', shiftKey: '"', shiftSound: 'sfx.default' }, //TODO: add sound for 'quote'/'apostrophe'
/* Enter */         28: { key: 'Enter', sound: 'sfx.enter' },

/* , */             51: { key: ',', sound: 'sfx.default', shiftKey: '<', shiftSound: 'sfx.default' },//TODO: add sound for 'comma'/'less than'
/* . */             52: { key: '.', sound: 'sfx.default', shiftKey: '>', shiftSound: 'sfx.default' },//TODO: add sound for 'period'/'greater than'

/* Space */         57: { key: 'Space', sound: '' },

/* PrintScreen */   3639: { key: 'PrintScreen', sound: '' },
/* ScrollLock */    70: { key: 'ScrollLock', sound: '' },
/* Pause */         3653: { key: 'Pause', sound: '' },

/* Insert */        3666: { key: 'Insert', sound: '' },
/* Delete */        3667: { key: 'Delete', sound: '' },
/* Home */          3655: { key: 'Home', sound: '' },
/* End */           3663: { key: 'End', sound: '' },
/* PageUp */        3657: { key: 'PageUp', sound: '' },
/* PageDown */      3665: { key: 'PageDown', sound: '' },

/* ↑ */             57416: { key: '↑', sound: 'sfx.arrow_up' },
/* ← */             57419: { key: '←', sound: 'sfx.arrow_left' },
/* → */             57421: { key: '→', sound: 'sfx.arrow_right' },
/* ↓ */             57424: { key: '↓', sound: 'sfx.arrow_down' },

/* Shift */         42: { key: 'Shift', sound: '' },
/* Shift */         54: { key: 'Shift', sound: '' },
/* Ctrl */          29: { key: 'Ctrl', sound: '' },
/* Ctrl */          3613: { key: 'Ctrl', sound: '' },
/* Alt */           56: { key: 'Alt', sound: '' },
/* Alt */           3640: { key: 'Alt', sound: '' },
/* Meta */          3675: { key: 'Meta', sound: '' },
/* Meta */          3676: { key: 'Meta', sound: '' },
/* Menu */          3677: { key: 'Menu', sound: '' },

// Numpad
/* Num Lock */      69: { key: 'Num Lock', sound: '' },
/* Numpad / */      3637: { key: 'Numpad /', sound: '' },
/* Numpad * */      55: { key: 'Numpad *', sound: '' },
/* Numpad - */      74: { key: 'Numpad -', sound: '' },
/* Numpad - */      3597: { key: 'Numpad -', sound: '' },
/* Numpad + */      78: { key: 'Numpad +', sound: '' },
/* Numpad Enter */  3612: { key: 'Numpad Enter', sound: 'sfx.enter' },
/* Numpad . */      83: { key: 'Numpad .', sound: '' },

/* Numpad 1 */      79: { key: 'Numpad 1', sound: '&.sing.C4' },
/* Numpad 2 */      80: { key: 'Numpad 2', sound: '&.sing.D4' },
/* Numpad 3 */      81: { key: 'Numpad 3', sound: '&.sing.Eb4' },
/* Numpad 4 */      75: { key: 'Numpad 4', sound: '&.sing.F4' },
/* Numpad 5 */      76: { key: 'Numpad 5', sound: '&.sing.G4' },
/* Numpad 6 */      77: { key: 'Numpad 6', sound: '&.sing.Ab4' },
/* Numpad 7 */      71: { key: 'Numpad 7', sound: '&.sing.Bb4' },
/* Numpad 8 */      72: { key: 'Numpad 8', sound: '&.sing.C5' },
/* Numpad 9 */      73: { key: 'Numpad 9', sound: '&.sing.D5' },
/* Numpad 0 */      82: { key: 'Numpad 0', sound: '&.sing.Eb5' },
};

const darwin = JSON.parse(JSON.stringify(standard));
Object.assign(darwin, {
  /* Return */      28: { key: 'Return', sound: '' },
  /* Option */      56: { key: 'Option', sound: '' },
  /* Clear */       69: { key: 'Clear', sound: '' },
  /* Option */      3640: { key: 'Option', sound: '' },
  /* Fn */          3666: { key: 'Fn', sound: '' },
  /* Command */     3675: { key: 'Command', sound: '' },
  /* Command */     3676: { key: 'Command', sound: '' },
});

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  /* Win */         3675: { key: 'Win', sound: '' },
  /* Win */         3676: { key: 'Win', sound: '' },
  /* Insert */      61010: { key: 'Insert', sound: '' },
  /* Delete */      61011: { key: 'Delete', sound: '' },
  /* Home */        60999: { key: 'Home', sound: '' },
  /* End */         61007: { key: 'End', sound: '' },
  /* PageUp */      61001: { key: 'PageUp', sound: '' },
  /* PageDown */    61009: { key: 'PageDown', sound: '' },
  /* ↑ */           61000: { key: '↑', sound: 'sfx.arrow_up' },
  /* ← */           61003: { key: '←', sound: 'sfx.arrow_left' },
  /* → */           61005: { key: '→', sound: 'sfx.arrow_right' },
  /* ↓ */           61008: { key: '↓', sound: 'sfx.arrow_down' },
});

const linux = JSON.parse(JSON.stringify(standard));

module.exports = { standard, darwin, win32, linux };
