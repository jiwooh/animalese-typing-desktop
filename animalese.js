window.api.onPlaySound( (key) => {
	let audioPath = 'assets/audio/animalese/female/voice_1/'+getAlphaSound(key)+file_type;

	window.api.playSound(audioPath);
});


const file_type = ".aac";

function getAlphaSound(key) {
	key = key.toLowerCase().charAt(0);// Set to lowercase
	if ((/[a-z]/).test(key)) return key;// If basic letter return letter
    for (const { letter, regex } of regexMap) if (regex.test(key)) return letter;// If special letter check regexMap and return basic letter
    return key;// Default case for unmatched keys
}

// #region Regex checks
const regexMap = [
    { letter: "a", regex: /[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00e6\u0101\u0103\u0105\u01ce]/ },
    { letter: "b", regex: /[\u1e03\u1e05\u1e07]/ },
    { letter: "c", regex: /[\u00e7\u0107\u0109\u010b\u010d]/ },
    { letter: "d", regex: /[\u010f\u0111\u1e0b\u1e0d\u1e0f\u1e11\u1e13]/ },
    { letter: "e", regex: /[\u00e8\u00e9\u00ea\u00eb\u0113\u0115\u0117\u0119\u011b\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u011f]/ },
    { letter: "f", regex: /[\u1e1f]/ },
    { letter: "g", regex: /[\u011d\u011f\u0121\u0123\u1e21]/ },
    { letter: "h", regex: /[\u0125\u021f\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e96]/ },
    { letter: "i", regex: /[\u00ec\u00ed\u00ee\u00ef\u0129\u012b\u012d\u012f\u0131\u1ec9\u1ecb]/ },
    { letter: "j", regex: /[\u0135\u01f0]/ },
    { letter: "k", regex: /[\u0137\u1e31\u1e33\u1e35\u0199]/ },
    { letter: "l", regex: /[\u013a\u013c\u013e\u0140\u0142\u1e37\u1e39\u1e3b\u1e3d]/ },
    { letter: "m", regex: /[\u1e3f\u1e41\u1e43]/ },
    { letter: "n", regex: /[\u00f1\u0144\u0146\u0148\u0149\u014b\u1e45\u1e47\u1e49\u1e4b]/ },
    { letter: "o", regex: /[\u00f2\u00f3\u00f4\u00f5\u00f6\u00f8\u014d\u014f\u0151\u01a1\u01eb\u01ed\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3]/ },
    { letter: "p", regex: /[\u1e55\u1e57]/ },
    { letter: "q", regex: /[\u024b]/ },
    { letter: "r", regex: /[\u0155\u0157\u0159\u0211\u0213\u1e59\u1e5b\u1e5d\u1e5f]/ },
    { letter: "s", regex: /[\u00df\u015b\u015d\u015f\u0161\u1e61\u1e63\u1e65\u1e67\u1e69\u1e9b]/ },
    { letter: "t", regex: /[\u0163\u0165\u0167\u1e6b\u1e6d\u1e6f\u1e71\u1e97]/ },
    { letter: "u", regex: /[\u00f9\u00fa\u00fb\u00fc\u0169\u016b\u016d\u016f\u0171\u0173\u01b0\u1e73\u1e75\u1e77\u1e79\u1e7b\u1e7d\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1]/ },
    { letter: "v", regex: /[\u1e7f\u028b]/ },
    { letter: "w", regex: /[\u0175\u1e81\u1e83\u1e85\u1e87\u1e89\u1e98]/ },
    { letter: "x", regex: /[\u1e8b\u1e8d]/ },
    { letter: "y", regex: /[\u00fd\u00ff\u0177\u0233\u1e8f\u1e99\u1ef3\u1ef5\u1ef7\u1ef9]/ },
    { letter: "z", regex: /[\u017a\u017c\u017e\u1e91\u1e93\u1e95\u0225]/ },
];
































// WEB CODE
// //keypress detect
// chrome.runtime.sendMessage({type: 'update_values'});
// constructor()

// function constructor() {
// 	document.addEventListener('keydown', processKeydown, true);
// 	var ifs = document.querySelectorAll('iframe')
// 	for (var i = 0; i < ifs.length; i++) {
// 		var fc = ifs[i].contentDocument || ifs[i].contentWindow;
// 		try{fc.addEventListener('keydown', processKeydown, true);}
// 		catch(e){}
// 	}
// }
// function destructor() {
// 	document.removeEventListener('keydown', processKeydown, true)
// 	var ifs = document.querySelectorAll('iframe')
// 	for (var i = 0; i < ifs.length; i++) {
// 		var fc = ifs[i].contentDocument || ifs[i].contentWindow;
// 		try{fc.removeEventListener('keydown', processKeydown, true);}
// 		catch(e){}
// 	}
// }

// function processKeydown(e) {
// 	//deconstruct when disconnected to bg script.
// 	if (typeof chrome.runtime === 'undefined' || typeof chrome.runtime.id === 'undefined') {
// 		destructor();
// 		return;
// 	}
// 	setTimeout(function(){
// 		if (e.key == "Process" || typeof e.key === 'undefined') processFallback(e);
// 		else { chrome.runtime.sendMessage({ type: 'type', key: e.key ,  keycode: (e.key.length==1)?e.key.charCodeAt(0):e.keyCode , input_type: e.target.type})};
// 	},0)
// }
// function processFallback(e) {
// 	let keyFallback = e.code.startsWith("Key")?e.code.charAt(3).toLowerCase():""
// 	chrome.runtime.sendMessage({ type: 'type', key: keyFallback ,  keycode: (keyFallback.length==1)?keyFallback.charCodeAt(0):keyFallback.keyCode , input_type: e.target.type});
// }