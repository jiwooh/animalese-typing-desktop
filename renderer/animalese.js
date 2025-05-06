const preferences = window.settings;

let voiceProfile = preferences.get('voice_profile');

//#region Initialize controls and listeners
const controls = [
    'master_volume',
    'voice_type',
    'pitch_shift',
    'pitch_variation',
    'intonation'
];

function initControls() {
    controls.forEach(control => {
        let el = document.getElementById(control);
        if (!el) return;

        let outputEl = document.getElementById(control + '_out');
        const isSlider = el.type === 'range';
        const displayMode = (outputEl)?outputEl.getAttribute('display') || 'float':undefined;

        const updateValue = (value) => {
            if (isSlider) {
                value = parseFloat(value) || 0.0;
                value = Math.min(Math.max(value, parseFloat(el.min)), parseFloat(el.max));
                el.value = value;
                if (outputEl) {
                    outputEl.value = displayMode === 'percent' 
                    ? (parseFloat(el.value) * 100).toFixed(0) + "%" 
                    : ((parseFloat(el.value) > 0) ? "+" : "") + parseFloat(el.value).toFixed(1);
                }
            } else {
                el.value = value;
            }
            if (control==='master_volume') {
                preferences.set('volume', value);
                
                if (el.getAttribute('playing')==='false') {
                    el.setAttribute('playing', 'true');
                    window.audio.play('sfx.default');
                    setTimeout(() => el.setAttribute('playing', 'false'), 75);
                }
            }
            else {
                voiceProfile[control] = value;
                preferences.set('voice_profile', voiceProfile);
            }
        };

        // clear event listeners and reset element
        el.replaceWith(el.cloneNode(true));
        el = document.getElementById(control);
        if (outputEl) {
            outputEl.replaceWith(outputEl.cloneNode(true));
            outputEl = document.getElementById(control + '_out');
        }
        if (isSlider) {
            if (control === 'master_volume') el.value = preferences.get('volume');
            else el.value = voiceProfile[control];
            
            if (outputEl) {
            outputEl.value = displayMode === 'percent' 
            ? (parseFloat(el.value) * 100).toFixed(0) + "%" 
            : ((parseFloat(el.value) > 0) ? "+" : "") + parseFloat(el.value).toFixed(1);
            }

            el.addEventListener('input', (e) => updateValue(e.target.value));
            el.addEventListener('wheel', (e) => {
            e.preventDefault();
            const step = parseFloat((el.max - el.min) * 0.05);
            updateValue(parseFloat(el.value) + (e.deltaY < 0 ? step : -step));
            });
            el.addEventListener('dblclick', () => updateValue(el.getAttribute('defaultValue')));
            if (outputEl) {
            outputEl.addEventListener('click', () => outputEl.select());
            outputEl.addEventListener('focusout', () => updateValue(outputEl.value));
            outputEl.addEventListener('keydown', (e) => { if (e.key === "Enter") updateValue(outputEl.value); });
            outputEl.addEventListener('dblclick', () => updateValue(el.getAttribute('defaultValue')));
            }
        } else {
            el.value = voiceProfile[control];
            el.addEventListener('input', (e) => updateValue(e.target.value));
        }
    });
}
initControls();
//#endregion

//#region Key press detect
window.api.onKeyPress( (map, e, isCapsLockOn) => {
    switch (true) {
        case ( map.sound.startsWith('&.voice') ):
            // Uppercase
            if (isCapsLockOn !== e.shiftKey) window.audio.play(map.sound, {
                volume: .75,
                pitch_shift: 1.5 + voiceProfile.pitch_shift,
                pitch_variation: 1 + voiceProfile.pitch_variation,
            });
            // Lowercase
            else window.audio.play(map.sound);
        break;
        case (e.shiftKey && (map.shiftSound !== undefined)):
            window.audio.play(map.shiftSound);
        break;
        default: window.audio.play(map.sound);
        break;
    }
});
//#endregion

// general setup
// keep consistant aspect ratio and scales all elements on the window
function scaleWindow() {
    const wrapper = document.getElementById('main-win');
    const scaleX = window.innerWidth / 720;
    const scaleY = window.innerHeight / 360;
    const scale = Math.min(scaleX, scaleY);
    wrapper.style.transform = `scale(${scale*1})`;
}
window.addEventListener('resize', scaleWindow);
window.addEventListener('load', scaleWindow);
scaleWindow();

//#region Savable voice profiles
const voiceProfileSlots = preferences.get('saved_voice_profiles');
for (let i = 0; i < 5; i++) {
    document.getElementById('voice_profile_slots').options[i].innerHTML = voiceProfileSlots[i+1]?.name || `Slot ${i+1}`;
}

function deleteVoiceProfile() {
    const currentVoiceProfile = preferences.get('voice_profile');
    const selectedSlot = document.getElementById('voice_profile_slots').value;

    let savedVoiceProfiles = preferences.get('saved_voice_profiles');

    savedVoiceProfiles = new Map(Object.entries(savedVoiceProfiles));
    savedVoiceProfiles.delete(selectedSlot);
    document.getElementById('voice_profile_slots').options[parseInt(selectedSlot)-1].innerHTML = `Slot ${selectedSlot}`;
    const savedProfilesObject = Object.fromEntries(savedVoiceProfiles);

    preferences.set('saved_voice_profiles', savedProfilesObject);
}

function saveVoiceProfile() {
    // Get the current voice profile
    const currentVoiceProfile = preferences.get('voice_profile');
    const selectedSlot = document.getElementById('voice_profile_slots').value;
    const profileName = document.getElementById('save_profile_name').value.trim();

    if (!profileName) {
        //alert('Please enter a valid profile name');
        return;
    }

    let savedVoiceProfiles = preferences.get('saved_voice_profiles');

    savedVoiceProfiles = new Map(Object.entries(savedVoiceProfiles));
    savedVoiceProfiles.set(selectedSlot, { name: profileName, profile: currentVoiceProfile });
    document.getElementById('voice_profile_slots').options[parseInt(selectedSlot)-1].innerHTML = profileName;
    const savedProfilesObject = Object.fromEntries(savedVoiceProfiles);

    preferences.set('saved_voice_profiles', savedProfilesObject);

    //alert(`Voice profile "${profileName}" saved successfully`);
}

function loadVoiceProfile() {
    const selectedSlot = document.getElementById('voice_profile_slots').value;
    const savedVoiceProfiles = preferences.get('saved_voice_profiles');
    const selectedProfile = savedVoiceProfiles[selectedSlot];

    if (selectedProfile) {
        preferences.set('voice_profile', selectedProfile.profile);
        voiceProfile = preferences.get('voice_profile')
        initControls()
    } else {
        //alert('No saved voice profile found in this slot.');
    }
}
//#endregion


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
        this.addEventListener('click', () => {
            const pressed = this.getAttribute('pressed')==='true';
            this.setAttribute('pressed', pressed?'false':'true');
        });
    }
});