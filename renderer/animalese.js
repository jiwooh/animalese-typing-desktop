const preferences = window.settings;

const voiceProfile = preferences.get('voice_profile')

//#region Initialize controls and listeners
const masterVolumeSlider = document.getElementById("master-volume-slider");
masterVolumeSlider.value = preferences.get('volume');
masterVolumeSlider.addEventListener('input', (e) => {
    preferences.set('volume', parseFloat(e.target.value));
});
const controls = [
    'voice_type',
    'pitch_shift',
    'pitch_variation',
    'intonation'
];
for (const control of controls) {
    const el = document.getElementById(control);

    if (!el) continue;
    // Get saved values and initilize sliders
    el.value = voiceProfile[control];
    if (el.type === 'range') { // if slider then set value to slider and output
        const outputEl = document.getElementById(control + '_out');
        outputEl.value = String(voiceProfile[control]);

        const updateValue = (value) => {
            el.value = value;
            outputEl.value = value;
            voiceProfile[control] = parseFloat(value);
            preferences.set('voice_profile', voiceProfile);
        };

        el.addEventListener('input', (e) => updateValue(e.target.value));
        el.addEventListener('wheel', (e) => {
            e.preventDefault();
            const step = parseFloat((el.max - el.min) * 0.05);
            const delta = e.deltaY < 0 ? step : -step;
            const newValue = Math.min(Math.max(parseFloat(el.value) + delta, parseFloat(el.min)), parseFloat(el.max));
            updateValue(newValue);
        });
        el.addEventListener('dblclick', () => updateValue(el.defaultValue));
    }
    else {
        el.addEventListener('input', (e) => {
            voiceProfile[control] = e.target.value;
            el.value = e.target.value;
            preferences.set('voice_profile', voiceProfile);
        });
    }

    // Add event listeners or updating values
    // el.addEventListener('input', (e) => {
    //     if (el.type === 'range') {
    //         document.getElementById(control+'_out').value = String(parseFloat(e.target.value));
    //         voiceProfile[control] = parseFloat(e.target.value);
    //     }
    //     else voiceProfile[control] = e.target.value;

    //     preferences.set('voice_profile', voiceProfile);
    // });
}
//#endregion

//#region Key press detect
window.api.onKeyPress( (key, e, isCapsLockOn) => {
    // where the magic begins :)
    switch(true) {
        case ( isAlpha(key) ):
            let sound_id = `${voiceProfile.voice_type}.voice.${getAlphaSound(key)}`;
            // Uppercase
            if (isCapsLockOn !== e.shiftKey) window.audio.play(sound_id, {
                channel: 1,
                volume: .9,
                pitch_shift: voiceProfile.pitch_shift,
                pitch_variation: 1.5 + voiceProfile.pitch_variation,
                intonation: voiceProfile.intonation
            });
            // Lowercase
            else window.audio.play(sound_id, {
                channel: 1,
                volume: .65,
                pitch_shift: voiceProfile.pitch_shift,
                pitch_variation: voiceProfile.pitch_variation,
                intonation: voiceProfile.intonation
            });
        break;

        default:
            window.audio.play(key, {volume:0.9});
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