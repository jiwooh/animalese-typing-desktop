window.api.onKeyPress( (key, e) => {

    // where the magic begins :)
    switch(true) {
        case ( isAlpha(key) ):
            if (e.shiftKey) key = key.toUpperCase()
            window.api.playAudio( getAlphaSound(key) );
            console.log(key, e);
        break;

        default:
            console.log(key, e);
        break;
    }
});

function isAlpha(str) {return (str.length === 1)?(/\p{Letter}/gu).test(str.charAt(0)):false;}

function getAlphaSound(key) {
	key = key.toLowerCase().charAt(0);// Set to lowercase
	if ((/[a-z]/).test(key)) return key;// If basic letter return letter
    for (const { letter, regex } of regexMap) if (regex.test(key)) return letter;// If special letter check regexMap and return basic letter
    return key;// Default case for unmatched keys
}

document.addEventListener('keydown', (e)=> {
    console.log(e);
})





























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