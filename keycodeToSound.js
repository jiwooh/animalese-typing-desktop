'use strict';

//TODO: create a keyboard Remapper to remap keys to sounds. the will hole the default mappings
const standard = {
  1: { key: 'Esc', sound: 'sfx.enter' }, // 'Esc'

  59: { key: 'F1', sound: '' }, // 'F1'
  60: { key: 'F2', sound: '' }, // 'F2'
  61: { key: 'F3', sound: '' }, // 'F3'
  62: { key: 'F4', sound: '' }, // 'F4'
  63: { key: 'F5', sound: '' }, // 'F5'
  64: { key: 'F6', sound: '' }, // 'F6'
  65: { key: 'F7', sound: '' }, // 'F7'
  66: { key: 'F8', sound: '' }, // 'F8'
  67: { key: 'F9', sound: '' }, // 'F9'
  68: { key: 'F10', sound: '' }, // 'F10'
  87: { key: 'F11', sound: '' }, // 'F11'
  88: { key: 'F12', sound: '' }, // 'F12'

  91: { key: 'F13', sound: '' }, // 'F13'
  92: { key: 'F14', sound: '' }, // 'F14'
  93: { key: 'F15', sound: '' }, // 'F15'

  41: { key: '`', sound: '', shiftKey: '~', shiftSound: 'sfx.tilde' }, // '`'

  2: { key: '1' , sound: '&.sing.C4', shiftKey: '!', shiftSound: 'sfx.exclamation'  }, // '1'
  3: { key: '2' , sound: '&.sing.D4', shiftKey: '@', shiftSound: 'sfx.at'  }, // '2'
  4: { key: '3' , sound: '&.sing.E4', shiftKey: '#', shiftSound: 'sfx.pound'  }, // '3'
  5: { key: '4' , sound: '&.sing.F4', shiftKey: '$', shiftSound: 'sfx.dollar'  }, // '4'
  6: { key: '5', sound: '&.sing.G4', shiftKey: '%', shiftSound: 'sfx.percent' }, // '5'
  7: { key: '6' , sound: '&.sing.A4', shiftKey: '^', shiftSound: 'sfx.caret'  }, // '6'
  8: { key: '7' , sound: '&.sing.B4', shiftKey: '&', shiftSound: 'sfx.ampersand'  }, // '7'
  9: { key: '8' , sound: '&.sing.C5', shiftKey: '*', shiftSound: 'sfx.asterisk'  }, // '8'
  10: { key: '9', sound: '&.sing.D5', shiftKey: '(', shiftSound: 'sfx.parenthesis_open' }, // '9'
  11: { key: '0', sound: '&.sing.E5', shiftKey: ')', shiftSound: 'sfx.parenthesis_closed' }, // '0'

  12: { key: '-', sound: '&.sing.F5', shiftKey: '_', shiftSound: 'sfx.underscore' }, // '-'
  13: { key: '=', sound: '&.sing.G5', shiftKey: '+', shiftSound: 'sfx.plus' }, // '='
  14: { key: 'Backspace', sound: 'sfx.backspace' }, // 'Backspace'

  15: { key: 'Tab', sound: 'sfx.tab' }, // 'Tab'
  58: { key: 'Caps Lock', sound: '' }, // 'Caps Lock'

  30: { key: 'a', shiftKey: 'A', sound: '&.voice.a' }, // 'a'
  48: { key: 'b', shiftKey: 'B', sound: '&.voice.b' }, // 'b'
  46: { key: 'c', shiftKey: 'C', sound: '&.voice.c' }, // 'c'
  32: { key: 'd', shiftKey: 'D', sound: '&.voice.d' }, // 'd'
  18: { key: 'e', shiftKey: 'E', sound: '&.voice.e' }, // 'e'
  33: { key: 'f', shiftKey: 'F', sound: '&.voice.f' }, // 'f'
  34: { key: 'g', shiftKey: 'G', sound: '&.voice.g' }, // 'g'
  35: { key: 'h', shiftKey: 'H', sound: '&.voice.h' }, // 'h'
  23: { key: 'i', shiftKey: 'I', sound: '&.voice.i' }, // 'i'
  36: { key: 'j', shiftKey: 'J', sound: '&.voice.j' }, // 'j'
  37: { key: 'k', shiftKey: 'K', sound: '&.voice.k' }, // 'k'
  38: { key: 'l', shiftKey: 'L', sound: '&.voice.l' }, // 'l'
  50: { key: 'm', shiftKey: 'M', sound: '&.voice.m' }, // 'm'
  49: { key: 'n', shiftKey: 'N', sound: '&.voice.n' }, // 'n'
  24: { key: 'o', shiftKey: 'O', sound: '&.voice.o' }, // 'o'
  25: { key: 'p', shiftKey: 'P', sound: '&.voice.p' }, // 'p'
  16: { key: 'q', shiftKey: 'Q', sound: '&.voice.q' }, // 'q'
  19: { key: 'r', shiftKey: 'R', sound: '&.voice.r' }, // 'r'
  31: { key: 's', shiftKey: 'S', sound: '&.voice.s' }, // 's'
  20: { key: 't', shiftKey: 'T', sound: '&.voice.t' }, // 't'
  22: { key: 'u', shiftKey: 'U', sound: '&.voice.u' }, // 'u'
  47: { key: 'v', shiftKey: 'V', sound: '&.voice.v' }, // 'v'
  17: { key: 'w', shiftKey: 'W', sound: '&.voice.w' }, // 'w'
  45: { key: 'x', shiftKey: 'X', sound: '&.voice.x' }, // 'x'
  21: { key: 'y', shiftKey: 'Y', sound: '&.voice.y' }, // 'y'
  44: { key: 'z', shiftKey: 'Z', sound: '&.voice.z' }, // 'z'

  26: { key: '[', sound: 'sfx.bracket_open', shiftKey: '{', shiftSound: 'sfx.brace_open' }, // '['
  27: { key: ']', sound: 'sfx.bracket_closed', shiftKey: '}', shiftSound: 'sfx.brace_closed' }, // ']'
  43: { key: '\\', sound: 'sfx.slash_back', shiftKey: '|', shiftSound: 'sfx.pipe' }, // '\'
  53: { key: '/', sound: 'sfx.slash_forward', shiftKey: '?', shiftSound: 'sfx.question' }, // '/'

  39: { key: ';', sound: '', shiftKey: ':', shiftSound: 'sfx.colon' }, // ';'
  40: { key: '\'', sound: '', shiftKey: '"', shiftSound: 'sfx.quote' }, // '\''
  28: { key: 'Enter', sound: 'sfx.enter' }, // 'Enter'

  51: { key: ',', sound: '', shiftKey: '<', shiftSound: 'sfx.less_than' }, // ','
  52: { key: '.', sound: 'sfx.default', shiftKey: '>', shiftSound: 'sfx.greater_than' }, // '.'

  57: { key: 'Space', sound: '' }, // 'Space'

  3639: { key: 'PrintScreen', sound: '' }, // 'PrintScreen'
  70: { key: 'ScrollLock', sound: '' }, // 'ScrollLock'
  3653: { key: 'Pause', sound: '' }, // 'Pause'

  3666: { key: 'Insert', sound: '' }, // 'Insert'
  3667: { key: 'Delete', sound: '' }, // 'Delete'
  3655: { key: 'Home', sound: '' }, // 'Home'
  3663: { key: 'End', sound: '' }, // 'End'
  3657: { key: 'PageUp', sound: '' }, // 'PageUp'
  3665: { key: 'PageDown', sound: '' }, // 'PageDown'

  57416: { key: '↑', sound: 'sfx.arrow_up' }, // '↑'
  57419: { key: '←', sound: 'sfx.arrow_left' }, // '←'
  57421: { key: '→', sound: 'sfx.arrow_right' }, // '→'
  57424: { key: '↓', sound: 'sfx.arrow_down' }, // '↓'

  42: { key: 'Shift', sound: '' }, // 'Shift'
  54: { key: 'Shift', sound: '' }, // 'Shift'
  29: { key: 'Ctrl', sound: '' }, // 'Ctrl'
  3613: { key: 'Ctrl', sound: '' }, // 'Ctrl'
  56: { key: 'Alt', sound: '' }, // 'Alt'
  3640: { key: 'Alt', sound: '' }, // 'Alt'
  3675: { key: 'Meta', sound: '' }, // 'Meta'
  3676: { key: 'Meta', sound: '' }, // 'Meta'
  3677: { key: 'Menu', sound: '' }, // 'Menu'

  // Numpad
  69: { key: 'Num Lock', sound: '' }, // 'Num Lock'
  3637: { key: 'Numpad /', sound: '' }, // Numpad '/'
  55: { key: 'Numpad *', sound: '' }, // Numpad '*'
  74: { key: 'Numpad -', sound: '' }, // Numpad '-'
  3597: { key: 'Numpad -', sound: '' }, // Numpad '-'
  78: { key: 'Numpad +', sound: '' }, // Numpad '+'
  3612: { key: 'Numpad Enter', sound: 'sfx.enter' }, // Numpad 'Enter'
  83: { key: 'Numpad .', sound: '' }, // Numpad '.'

  79: { key: 'Numpad 1', sound: '&.sing.C4' }, // Numpad 1
  80: { key: 'Numpad 2', sound: '&.sing.D4' }, // Numpad 2
  81: { key: 'Numpad 3', sound: '&.sing.Eb4' }, // Numpad 3
  75: { key: 'Numpad 4', sound: '&.sing.F4' }, // Numpad 4
  76: { key: 'Numpad 5', sound: '&.sing.G4' }, // Numpad 5
  77: { key: 'Numpad 6', sound: '&.sing.Ab4' }, // Numpad 6
  71: { key: 'Numpad 7', sound: '&.sing.Bb4' }, // Numpad 7
  72: { key: 'Numpad 8', sound: '&.sing.C5' }, // Numpad 8
  73: { key: 'Numpad 9', sound: '&.sing.D5' }, // Numpad 9
  82: { key: 'Numpad 0', sound: '&.sing.Eb5' }, // Numpad 0
};

const darwin = JSON.parse(JSON.stringify(standard));
Object.assign(darwin, {
  28: { key: 'Return', sound: '' }, // 'Return'
  56: { key: 'Option', sound: '' }, // 'Option'
  69: { key: 'Clear', sound: '' }, // 'Clear'
  3640: { key: 'Option', sound: '' }, // 'Option'
  3666: { key: 'Fn', sound: '' }, // 'Fn'
  3675: { key: 'Command', sound: '' }, // 'Command'
  3676: { key: 'Command', sound: '' }, // 'Command'
});

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  3675: { key: 'Win', sound: '' }, // 'Win'
  3676: { key: 'Win', sound: '' }, // 'Win'
  61010: { key: 'Insert', sound: '' }, // 'Insert'
  61011: { key: 'Delete', sound: '' }, // 'Delete'
  60999: { key: 'Home', sound: '' }, // 'Home'
  61007: { key: 'End', sound: '' }, // 'End'
  61001: { key: 'PageUp', sound: '' }, // 'PageUp'
  61009: { key: 'PageDown', sound: '' }, // 'PageDown'
  61000: { key: '↑', sound: 'sfx.arrow_up' }, // '↑'
  61003: { key: '←', sound: 'sfx.arrow_left' }, // '←'
  61005: { key: '→', sound: 'sfx.arrow_right' }, // '→'
  61008: { key: '↓', sound: 'sfx.arrow_down' }, // '↓'
});

const linux = JSON.parse(JSON.stringify(standard));

module.exports = { standard, darwin, win32, linux };
