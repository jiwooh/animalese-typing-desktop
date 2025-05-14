/**
 * author: joshxviii 
 */

const preferences = window.settings;
let lastKey = {};

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
    }
});

let voiceProfile = preferences.get('voice_profile');

//#region Initialize controls and listeners
const controls = [
    'master_volume',
    'voice_type',
    'pitch_shift',
    'pitch_variation',
    'intonation'
];
document.querySelectorAll('input[name="audio_mode"]').forEach(radio => {// audio mode initilize 
    radio.checked = parseInt(radio.value) === preferences.get('audio_mode');
    radio.addEventListener('change', () => {
        if (radio.checked) preferences.set('audio_mode', parseInt(radio.value));
    });
});
function initControls() {
    document.getElementById('lang_select').value = preferences.get('lang');
    document.getElementById('check_always_enabled').checked = preferences.get('always_enabled');
    document.getElementById('apps_table').setAttribute('disabled', preferences.get('always_enabled'));
    document.getElementById('version').innerHTML = `v${window.api.getAppInfo().version}`;


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
                    window.audio.play('sfx.default', {channel: 3});
                    setTimeout(() => el.setAttribute('playing', 'false'), 50);
                }
            }
            else {
                voiceProfile[control] = value;
                preferences.set('voice_profile', voiceProfile);
                setTimeout(() => {window.audio.play('&.special.OK', {channel: 2, volume:.55});}, 10);
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
            //el.addEventListener('change', (e) => updateValue(e.target.value));
        }
    });

    if (voiceProfile.voice_type) {
        if(voiceProfile.voice_type.startsWith('m')) {
            document.getElementById('voice_type').className = 'male'
            document.getElementById('male').setAttribute('pressed', 'true');
            document.getElementById('female').setAttribute('pressed', 'false');
        }
        else if(voiceProfile.voice_type.startsWith('f')) {
            document.getElementById('voice_type').className = 'female'
            document.getElementById('female').setAttribute('pressed', 'true');
            document.getElementById('male').setAttribute('pressed', 'false');
        }
    }
}
initControls();

function selectVoiceType(type) {
    const oppositeType = type === 'male' ? 'female' : 'male';

    if (document.getElementById(type).getAttribute('pressed') === 'true') {
        window.audio.play('&.special.OK', { channel: 2, volume: 0.55 });
        return;
    }

    const voiceTypeElement = document.getElementById('voice_type');
    voiceTypeElement.value = type === 'male' ? 'm1' : 'f1';
    voiceTypeElement.dispatchEvent(new Event('input', { bubbles: true }));

    document.getElementById(type).setAttribute('pressed', 'true');
    document.getElementById(oppositeType).setAttribute('pressed', 'false');
    voiceTypeElement.className = type;
}
//#endregion

//#region General setup
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

//#region Translation stuff
function updateTranslation() {
    const lang = preferences.get('lang');
    window.translator.load(lang);
    document.querySelectorAll('[translation]').forEach(el => {
        const key = el.getAttribute('translation');
        if (key) {
            if (el.type === 'text') el.setAttribute('placeholder', window.translator.t(key))
            else el.innerHTML = window.translator.t(key);
        }
    });
}
updateTranslation();
//#endregion

function updateLang() {// language selection update
    preferences.set('lang', document.getElementById('lang_select').value);
    updateTranslation();
}

function updatedActiveWindows(activeWindows = []) {
    const enabledApps = preferences.get('enabled_apps');
    const tableBody = document.getElementById('apps_tbody');
    tableBody.innerHTML = '';
    [...new Set([...enabledApps, ...activeWindows])].forEach(appName => {
        if (appName !== undefined) {
            const row = document.createElement('tr');

            // checkbox cell
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = enabledApps.includes(appName);
            checkbox.id = `app_${appName}`;
            checkbox.addEventListener('change', () => updateEnabledApps(appName, checkbox.checked));
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            // app name cell
            const nameCell = document.createElement('td');
            const label = document.createElement('label');
            label.setAttribute('for', `app_${appName}`);
            label.textContent = appName;
            nameCell.appendChild(label);
            row.appendChild(nameCell);

            tableBody.appendChild(row);
        }
    });
}
updatedActiveWindows();
function updateEnabledApps(appName, isChecked) {
    let enabledApps = preferences.get('enabled_apps')

    if (isChecked && !enabledApps.includes(appName)) enabledApps.push(appName);
    else enabledApps = enabledApps.filter(name => name !== appName);

    preferences.set('enabled_apps', enabledApps)
}
window.api.onActiveWindowChanged((activeWindows) => {
    updatedActiveWindows(activeWindows);
});

function updateAlwaysEnabled(value) {
    window.settings.set('always_enabled', value)
    document.getElementById('apps_table').setAttribute('disabled', value)
}

//#region Key press detect
window.api.onKeyPress( (keyInfo) => {
    if (remap_alpha_in === document.activeElement) return;
    lastKey = keyInfo;
    const path = (keyInfo.isShiftDown && keyInfo.data.shiftSound) || keyInfo.data.sound;
    switch (true) {
        case ( path.startsWith('&.voice') ):
            // Uppercase
            if (keyInfo.isCapsLock !== keyInfo.isShiftDown) window.audio.play(path, {
                volume: .75,
                pitch_shift: 1.5 + voiceProfile.pitch_shift,
                pitch_variation: 1 + voiceProfile.pitch_variation,
            });
            // Lowercase
            else window.audio.play(path);
        break;
        case ( path.startsWith('&.sing') ):
            window.audio.play(path, {
                hold: keyInfo.keycode// lock keycode until it is released with keyup 
            });
        break;
        default: window.audio.play(path);
        break;
    }
});
//#endregion

//#region Savable voice profiles
const voiceProfileSlots = preferences.get('saved_voice_profiles');
for (let i = 0; i < 5; i++) {
    document.getElementById('voice_profile_slots').options[i].innerHTML = voiceProfileSlots[i+1]?.name || `Slot ${i+1}`;
}

function deleteVoiceProfile() {
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
        initControls();
    } else {
        //alert('No saved voice profile found in this slot.');
    }
}
//#endregion

function openSettings() {
    const show = document.getElementById('focus_out').getAttribute('show')==="true"?false:true;
    document.getElementById('focus_out').setAttribute('show', show);
}














function isAlpha(str) {return str?(str.length === 1)?(/\p{Letter}/gu).test(str.charAt(0)):false:false;}

const remap_alpha_in = document.getElementById('remap_alpha_in');
const remap_alpha_out = document.getElementById('remap_alpha_out');

document.addEventListener('keydown', e => {
    if (remap_alpha_in === document.activeElement) return;
    //document.getElementById('keycode_label').innerHTML = lastKey.keycode;
    //(lastKey.isShiftDown && lastKey.data.shiftSound) || lastKey.data.sound;
    document.getElementById('keycode_label').innerHTML = ((lastKey.isShiftDown && lastKey.data.key !== "Shift"?"Shift + ":"") + lastKey.data.key).toUpperCase();
})

remap_alpha_in.addEventListener('selectstart', e => e.preventDefault());
remap_alpha_in.addEventListener('mousedown', e => e.preventDefault());
remap_alpha_in.addEventListener('beforeinput', (e) => {
    if (isAlpha(e.data)) {
        setTimeout(() => {
            remap_alpha_in.blur();
            remap_alpha_in.value = ''
        }, 1);
        e.preventDefault();

        remap_alpha_out.innerHTML = e.data.charAt(0).toUpperCase();       
    } else e.preventDefault();
});

document.querySelectorAll('input[name="remap_type"]').forEach((radio, index) => {
    radio.addEventListener('change', () => {
        const allTypes = document.querySelectorAll('#remap_types .remap_type');
        allTypes.forEach(el => el.setAttribute('show',false));

        // Show the selected one (index is 0-based)
        const selectedIndex = parseInt(radio.value) - 1;
        if (allTypes[selectedIndex]) {
        allTypes[selectedIndex].setAttribute('show',true);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checked = document.querySelector('input[name="remap_type"]:checked');
    if (checked) {
        checked.dispatchEvent(new Event('change'));
    }
});