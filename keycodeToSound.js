'use strict';

// [keycode-map.js] This file maps keycodes for different platforms to their respective sounds.
const standard = {
  1: 'sfx.enter', // 'Esc'

  59: '', // 'F1'
  60: '', // 'F2' 
  61: '', // 'F3'
  62: '', // 'F4'
  63: '', // 'F5'
  64: '', // 'F6'
  65: '', // 'F7'
  66: '', // 'F8'
  67: '', // 'F9'
  68: '',// 'F10'
  87: '',// 'F11'
  88: '',// 'F12'

  91: '',// 'F13'
  92: '',// 'F14'
  93: '',// 'F15'

  41: '`', // '`'

  2:  '&.sing.C4', // '1'
  3:  '&.sing.D4', // '2'
  4:  '&.sing.E4', // '3'
  5:  '&.sing.F4', // '4'
  6:  '&.sing.G4', // '5'
  7:  '&.sing.A4', // '6'
  8:  '&.sing.B4', // '7'
  9:  '&.sing.C5', // '8'
  10: '&.sing.D5', // '9'
  11: '&.sing.E5', // '0'

  12: '&.sing.F5', // '-'
  13: '&.sing.G5', // '='
  14: 'sfx.backspace',// 'Backspace'

  15: 'sfx.tab', // 'Tab'
  58: '',// 'Caps Lock'

  30: '&.voice.a', //'a'
  48: '&.voice.b', //'b'
  46: '&.voice.c', //'c'
  32: '&.voice.d', //'d'
  18: '&.voice.e', //'e'
  33: '&.voice.f', //'f'
  34: '&.voice.g', //'g'
  35: '&.voice.h', //'h'
  23: '&.voice.i', //'i'
  36: '&.voice.j', //'j'
  37: '&.voice.k', //'k'
  38: '&.voice.l', //'l'
  50: '&.voice.m', //'m'
  49: '&.voice.n', //'n'
  24: '&.voice.o', //'o'
  25: '&.voice.p', //'p'
  16: '&.voice.q', //'q'
  19: '&.voice.r', //'r'
  31: '&.voice.s', //'s'
  20: '&.voice.t', //'t'
  22: '&.voice.u', //'u'
  47: '&.voice.v', //'v'
  17: '&.voice.w', //'w'
  45: '&.voice.x', //'x'
  21: '&.voice.y', //'y'
  44: '&.voice.z', //'z'

  26: 'sfx.bracket_open',   // '['
  27: 'sfx.bracket_closed', // ']'
  43: 'sfx.slash_back',     // '\'
  53: 'sfx.slash_forward',  // '/'

  39: '', // ';'
  40: '', // '''
  28: 'sfx.enter', // 'Enter'

  51: '', // ','
  52: 'sfx.default', // '.'


  57: '', // 'Space'

  3639: '', // 'PrintScreen'
  70: '', // 'ScrollLock'
  3653: '', // 'Pause'

  3666: '', // 'Insert'
  3667: '', // 'Delete'
  3655: '',// 'Home'
  3663: '', // 'End'
  3657: '',// 'PageUp'
  3665: '',// 'PageDown'

  57416: 'sfx.arrow_up',    // '↑'
  57419: 'sfx.arrow_left',  // '←'
  57421: 'sfx.arrow_right', // '→'
  57424: 'sfx.arrow_down',  // '↓'

  42:   '', // 'Shift'
  54:   '', // 'Shift'
  29:   '',  // 'Ctrl'
  3613: '',  // 'Ctrl'
  56:   '',   // 'Alt'
  3640: '',   // 'Alt'
  3675: '',  // 'Meta'
  3676: '',  // 'Meta'
  3677: '',  // 'Menu'

  // Numpad
  69:   '', // 'Num Lock'
  3637: '', // Numpad '/'
  55:   '', // Numpad '*'
  74:   '', // Numpad '-'
  3597: '', // Numpad '-'
  78:   '', // Numpad '+'
  3612: 'sfx.enter', // Numpad 'Enter'
  83:   '', // Numpad '.'

  79: '&.sing.C4', // Numpad 1
  80: '&.sing.D4', // Numpad 2
  81: '&.sing.Eb4', // Numpad 3
  75: '&.sing.F4', // Numpad 4
  76: '&.sing.G4', // Numpad 5
  77: '&.sing.Ab4', // Numpad 6
  71: '&.sing.Bb4', // Numpad 7
  72: '&.sing.C5', // Numpad 8
  73: '&.sing.D5', // Numpad 9
  82: '&.sing.Eb5', // Numpad 0
};

const darwin = JSON.parse(JSON.stringify(standard));
Object.assign(darwin, {
  28: '', // 'Return'
  56: '', // 'Option'
  69: '', // 'Clear'
  3640: '', // 'Option'
  3666: '', // 'Fn'
  3675: '', // 'Command'
  3676: '', // 'Command'
});

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  3675: '', // 'Win'
  3676: '', // 'Win'
  61010: '', // 'Insert'
  61011: '', // 'Delete'
  60999: '', // 'Home'
  61007: '', // 'End'
  61001: '', // 'PageUp'
  61009: '', // 'PageDown'
  61000: 'sfx.arrow_up',    // '↑'
  61003: 'sfx.arrow_left',  // '←'
  61005: 'sfx.arrow_right', // '→'
  61008: 'sfx.arrow_down',  // '↓'
});

const linux = JSON.parse(JSON.stringify(standard));

module.exports = { standard, darwin, win32, linux };