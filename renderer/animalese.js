const preferences = window.settings;

const voiceProfile = preferences.get('voice_profile')

//#region Initialize controls and listeners
const masterVolumeSlider = document.getElementById("master_volume");
masterVolumeSlider.value = preferences.get('volume');
masterVolumeSlider.addEventListener('input', (e) => preferences.set('volume', parseFloat(e.target.value)));
const controls = [
    'voice_type',
    'pitch_shift',
    'pitch_variation',
    'intonation'
];

controls.forEach(control => {
    const el = document.getElementById(control);
    if (!el) return;

    const outputEl = document.getElementById(control + '_out');
    const isSlider = el.type === 'range';

    const updateValue = (value) => {
        if (isSlider) {
            value = parseFloat(value) || 0.0;
            value = Math.min(Math.max(value, parseFloat(el.min)), parseFloat(el.max));
            el.value = value;
            if (outputEl) outputEl.value = ((value > 0) ? "+" : "") + value.toFixed(1);
        } else {
            el.value = value;
        }
        voiceProfile[control] = value;
        preferences.set('voice_profile', voiceProfile);
    };

    if (isSlider) {
        el.value = voiceProfile[control];
        if (outputEl) outputEl.value = ((voiceProfile[control] > 0) ? "+" : "") + voiceProfile[control].toFixed(1);

        el.addEventListener('input', (e) => updateValue(e.target.value));
        el.addEventListener('wheel', (e) => {
            e.preventDefault();
            const step = parseFloat((el.max - el.min) * 0.05);
            updateValue(parseFloat(el.value) + (e.deltaY < 0 ? step : -step));
        });
        el.addEventListener('dblclick', () => updateValue(el.defaultValue));
        if (outputEl) {
            outputEl.addEventListener('click', () => outputEl.select());
            outputEl.addEventListener('focusout', () => updateValue(outputEl.value));
            outputEl.addEventListener('keydown', (e) => { if (e.key === "Enter") updateValue(outputEl.value); });
        }
    } else {
        el.value = voiceProfile[control];
        el.addEventListener('input', (e) => updateValue(e.target.value));
    }
});
//#endregion

//#region Key press detect
window.api.onKeyPress( (sound, e, isCapsLockOn) => {
    // where the magic begins :)
    switch(true) {
        case ( sound.startsWith('&.voice') ):
            // Uppercase
            if (isCapsLockOn !== e.shiftKey) window.audio.play(sound, {
                volume: .9,
                pitch_shift: 1.5 + voiceProfile.pitch_shift,
                pitch_variation: 1 + voiceProfile.pitch_variation,
            });
            // Lowercase
            else window.audio.play(sound);
        break;

        default:
            window.audio.play(sound, {volume:0.9});
            //console.log(key, e);
        break;
    }
});
//#endregion


// function from og extension
function isAlpha(str) {return (str.length === 1)?(/\p{Letter}/gu).test(str.charAt(0)):false;}

function getAlphaSound(key) {
	key = key.toLowerCase().charAt(0);
	if ((/[a-z]/).test(key)) return key;
    for (const { letter, regex } of regexMap) if (regex.test(key)) return letter;// if special letter check regexMap and return basic letter
    return key;// Default case for unmatched keys
}

// general setup
// keep consistant aspect ratio and scales all elements on the window
function scaleWindow() {
    const wrapper = document.getElementById('main-win');
    const scaleX = window.innerWidth / 680;
    const scaleY = window.innerHeight / 360;
    const scale = Math.min(scaleX, scaleY);
    wrapper.style.transform = `scale(${scale*1})`;
}
window.addEventListener('resize', scaleWindow);
window.addEventListener('load', scaleWindow);

// custom svg button element
customElements.define('svg-button', class extends HTMLElement {
    connectedCallback() {
        this.setAttribute('pressed','false');
        const name = this.getAttribute('name');
        this.id = `${name}`
        
        fetch(`assets/svg/${name}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = svg;
            const svgEl = this.querySelector('svg');
            svgEl.classList.add('svg-button');
           
        });
        this.addEventListener('mousedown', () => {
            const pressed = this.getAttribute('pressed')==='true';
            this.setAttribute('pressed', pressed?'false':'true');
        });
    }
});




























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