'use strict';
const standard = {
  1: 'Esc',

  59: 'F1',
  60: 'F2',
  61: 'F3',
  62: 'F4',
  63: 'F5',
  64: 'F6',
  65: 'F7',
  66: 'F8',
  67: 'F9',
  68: 'F10',
  87: 'F11',
  88: 'F12',

  91: 'F13',
  92: 'F14',
  93: 'F15',

  41: '`',

  2: '1', // '1'
  3: '2', // '2'
  4: '3', // '3'
  5: '4', // '4'
  6: '5', // '5'
  7: '6', // '6'
  8: '7', // '7'
  9: '8', // '8'
  10: '9',// '9'
  11: '0',// '0'

  12: '-',
  13: '=',
  14: 'sfx.backspace',// 'Backspace'

  15: 'sfx.tab',// 'Tab'
  58: 'CapsLock',

  30: 'a',
  48: 'b',
  46: 'c',
  32: 'd',
  18: 'e',
  33: 'f',
  34: 'g',
  35: 'h',
  23: 'i',
  36: 'j',
  37: 'k',
  38: 'l',
  50: 'm',
  49: 'n',
  24: 'o',
  25: 'p',
  16: 'q',
  19: 'r',
  31: 's',
  20: 't',
  22: 'u',
  47: 'v',
  17: 'w',
  45: 'x',
  21: 'y',
  44: 'z',

  26: 'sfx.bracket_open',   // '['
  27: 'sfx.bracket_closed', // ']'
  43: 'sfx.slash_back',     // '\'
  53: 'sfx.slash_forward',  // '/'

  39: ';',
  40: "'",
  28: 'sfx.enter', // 'Enter'

  51: ',',
  52: '.',


  57: 'Space',

  3639: 'PrtSc',
  70: 'ScrLk',
  3653: 'Pause',

  3666: 'Ins',
  3667: 'Del',
  3655: 'Home',
  3663: 'End',
  3657: 'PgUp',
  3665: 'PgDn',

  57416: 'sfx.arrow_up',    // '↑'
  57419: 'sfx.arrow_left',  // '←'
  57421: 'sfx.arrow_right', // '→'
  57424: 'sfx.arrow_down',  // '↓'

  42: 'Shift',
  54: 'Shift',
  29: 'Ctrl',
  3613: 'Ctrl',
  56: 'Alt',
  3640: 'Alt',
  3675: 'Meta',
  3676: 'Meta',
  3677: 'Menu',

  // Numpad
  69: 'Num\nLock',
  3637: '/', // Numpad
  55: '*', // Numpad
  74: '-', // Numpad
  3597: '=', // Numpad
  78: '+', // Numpad
  3612: 'sfx.enter', // Numpad
  83: '.', // Numpad

  79: '1', // Numpad
  80: '2', // Numpad
  81: '3', // Numpad
  75: '4', // Numpad
  76: '5', // Numpad
  77: '6', // Numpad
  71: '7', // Numpad
  72: '8', // Numpad
  73: '9', // Numpad
  82: '0', // Numpad
};

const darwin = JSON.parse(JSON.stringify(standard));
Object.assign(darwin, {
  28: 'Return',
  56: 'Option',
  69: 'Clear',
  3640: 'Option',
  3666: 'Fn',
  3675: 'Command',
  3676: 'Command',
});

const win32 = JSON.parse(JSON.stringify(standard));
Object.assign(win32, {
  3675: 'Win',
  3676: 'Win',
  61010: 'Ins',
  61011: 'Del',
  60999: 'Home',
  61007: 'End',
  61001: 'PgUp',
  61009: 'PgDn',
  61000: 'sfx.arrow_up',    // '↑'
  61003: 'sfx.arrow_left',  // '←'
  61005: 'sfx.arrow_right', // '→'
  61008: 'sfx.arrow_down',  // '↓'
});

const linux = JSON.parse(JSON.stringify(standard));

module.exports = { standard, darwin, win32, linux };