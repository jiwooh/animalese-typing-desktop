
const keyboardLayout = [
    [
        {label:'a', size:'s', sound:`&.voice.a`},
        {label:'b', size:'s', sound:`&.voice.b`},
        {label:'c', size:'s', sound:`&.voice.c`},
        {label:'d', size:'s', sound:`&.voice.d`},
        {label:'e', size:'s', sound:`&.voice.e`},
        {label:'f', size:'s', sound:`&.voice.f`},
        {label:'g', size:'s', sound:`&.voice.g`},
        {label:'h', size:'s', sound:`&.voice.h`},
        {label:'i', size:'s', sound:`&.voice.i`},
        {label:'j', size:'s', sound:`&.voice.j`},
        {label:'k', size:'s', sound:`&.voice.k`},
        {label:'l', size:'s', sound:`&.voice.l`},
        {label:'m', size:'s', sound:`&.voice.m`}
    ],
    [
        {label:'n', size:'s', sound:`&.voice.n`},
        {label:'o', size:'s', sound:`&.voice.o`},
        {label:'p', size:'s', sound:`&.voice.p`},
        {label:'q', size:'s', sound:`&.voice.q`},
        {label:'r', size:'s', sound:`&.voice.r`},
        {label:'s', size:'s', sound:`&.voice.s`},
        {label:'t', size:'s', sound:`&.voice.t`},
        {label:'u', size:'s', sound:`&.voice.u`},
        {label:'v', size:'s', sound:`&.voice.v`},
        {label:'w', size:'s', sound:`&.voice.w`},
        {label:'x', size:'s', sound:`&.voice.x`},
        {label:'y', size:'s', sound:`&.voice.y`},
        {label:'z', size:'s', sound:`&.voice.z`}
    ]
    // [ {label:'a', size:'s', sound:`&.voice.a`}, 			{label:'w', size:'s', sound:`&.voice.w`}, 			{label:'x', size:'s', sound:`&.voice.x`}, 			{label:'space', size:'l'},		                    {}, 			                                    {}, 			                                    {label:'y', size:'s', sound:`&.voice.y`}, 			{label:'z', size:'s', sound:`&.voice.z`}, 			{icon:'left', size:'s'}, 		                    {icon:'down', size:'s'}, 		                                {icon:'right', size:'s'}, 		                    {icon:'question', size:'s'}, 			                {icon:'question', size:'s'}]
    // [ {label:'esc', size:'s', sound:`sfx.enter`},           {label:'1', size:'s', sound:`&.sing.C4`},           {label:'2', size:'s', sound:`&.sing.D4`}, 			{label:'3', size:'s', sound:`&.sing.E4`},           {label:'4', size:'s', sound:`&.sing.F4`},           {label:'5', size:'s', sound:`&.sing.G4`},           {label:'6', size:'s', sound:`&.sing.A4`},           {label:'7', size:'s', sound:`&.sing.B4`},           {label:'8', size:'s', sound:`&.sing.C5`},           {label:'9', size:'s', sound:`&.sing.D5`}, 			            {label:'0', size:'s', sound:`&.sing.E5`}, 			{icon:'question', size:'s'}, 			                {icon:'question', size:'s'}],
    // [ {label:'tab', size:'m', sound:`sfx.tab`},             {}, 			                                    {label:'a', size:'s', sound:`&.voice.a`}, 			{label:'b', size:'s', sound:`&.voice.b`}, 			{label:'c', size:'s', sound:`&.voice.c`}, 			{label:'d', size:'s', sound:`&.voice.d`}, 			{label:'e', size:'s', sound:`&.voice.e`}, 			{label:'back', size:'m', sound:`sfx.backspace`},    {}, 			                                    {}, 			                                                {}, 			                                    {icon:'question', size:'s'}, 			                {icon:'question', size:'s'}],
    // [ {label:'f', size:'s', sound:`&.voice.f`}, 			{label:'g', size:'s', sound:`&.voice.g`}, 			{label:'h', size:'s', sound:`&.voice.h`}, 			{label:'i', size:'s', sound:`&.voice.i`}, 			{label:'j', size:'s', sound:`&.voice.j`}, 			{label:'k', size:'s', sound:`&.voice.k`}, 			{label:'l', size:'s', sound:`&.voice.l`}, 			{label:'enter', size:'m', sound:`sfx.enter`},       {}, 			                                    {}, 			                                                {}, 			                                    {icon:'question', size:'s'}, 			                {icon:'question', size:'s'}],
    // [ {label:'m', size:'s', sound:`&.voice.m`}, 			{label:'n', size:'s', sound:`&.voice.n`}, 			{label:'o', size:'s', sound:`&.voice.o`}, 			{label:'p', size:'s', sound:`&.voice.p`}, 			{label:'q', size:'s', sound:`&.voice.q`}, 			{label:'r', size:'s', sound:`&.voice.r`}, 			{label:'s', size:'s', sound:`&.voice.s`}, 			{label:'t', size:'s', sound:`&.voice.t`}, 			{label:'u', size:'s', sound:`&.voice.u`}, 			{icon:'up', size:'s'}, 	                                        {}, 			                                    {icon:'question', size:'s'}, 			                {icon:'question', size:'s'}],
    // [ {label:'v', size:'s', sound:`&.voice.v`}, 			{label:'w', size:'s', sound:`&.voice.w`}, 			{label:'x', size:'s', sound:`&.voice.x`}, 			{label:'space', size:'l'},		                    {}, 			                                    {}, 			                                    {label:'y', size:'s', sound:`&.voice.y`}, 			{label:'z', size:'s', sound:`&.voice.z`}, 			{icon:'left', size:'s'}, 		                    {icon:'down', size:'s'}, 		                                {icon:'right', size:'s'}, 		                    {icon:'question', size:'s'}, 			                {icon:'question', size:'s'}]
];

const pianoLayout = [
    {type:'l',sound:'&.sing.C4'},
    {type:'b',sound:'&.sing.Db4'},
    {type:'m',sound:'&.sing.D4'},
    {type:'b',sound:'&.sing.Eb4'},
    {type:'r',sound:'&.sing.E4'},
    {type:'l',sound:'&.sing.F4'},
    {type:'b',sound:'&.sing.Gb4'},
    {type:'m',sound:'&.sing.G4'},
    {type:'b',sound:'&.sing.Ab4'},
    {type:'m',sound:'&.sing.A4'},
    {type:'b',sound:'&.sing.Bb4'},
    {type:'r',sound:'&.sing.B4'},
    {type:'l',sound:'&.sing.C5'},
    {type:'b',sound:'&.sing.Db5'},
    {type:'m',sound:'&.sing.D5'},
    {type:'b',sound:'&.sing.Eb5'},
    {type:'r',sound:'&.sing.E5'},
    {type:'l',sound:'&.sing.F5'},
    {type:'b',sound:'&.sing.Gb5'},
    {type:'m',sound:'&.sing.G5'},
    {type:'b',sound:'&.sing.Ab5'},
    {type:'r',sound:'&.sing.A5'}
]

customElements.define('key-button', class extends HTMLElement {
    connectedCallback() {
        const size = this.hasAttribute('size')? this.getAttribute('size') : 's';
        const label = this.getAttribute('label');
        const svgIcon = this.getAttribute('icon');
        this.id = `key-${label}`

        fetch(`assets/svg/key_${size}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = `
                <div class='key-label-wrapper key_${size}'>
                    ${svg}
                    ${svgIcon?`<div class="key-icon-wrapper"></div>`:''}
                    ${label?`<span class='key-label'>${label.toUpperCase()}</span>`:''}
                </div>
            `;
            this.querySelector('svg').classList.add(`key_${size}`);

            // if an icon is specified, fetch and use that for the label
            if (svgIcon) {
                fetch(`assets/svg/${svgIcon}.svg`)
                .then(iconRes => iconRes.text())
                .then(iconSvg => {
                    const iconWrapper = this.querySelector('.key-icon-wrapper');
                    iconWrapper.innerHTML = iconSvg;
                    iconWrapper.querySelector('svg').classList.add('key-icon');
                });
            }
            this.addEventListener('mouseenter', (e) => {
                if (e.buttons >0) press(this);
            });
            this.addEventListener('mousedown', (e) => {
                press(this);
            });
        });
    }
});
customElements.define('key-board', class extends HTMLElement {
    connectedCallback() {
        for (let row of keyboardLayout){
        const _row = $( `<div class='key-row'></div>`);
            for (let key of row) {
                const sound = key.sound?`sound=${key.sound}`:'';
                const _key = $(
                    key.label?`<key-button ${sound} size=${key.size} label=${key.label.toUpperCase()} style="--label-length: ${key.label.length};"></key-button>`:
                    key.icon ?`<key-button ${sound} size=${key.size} icon=${key.icon}></key-button>`:
                    `<div class='key_blank'></div>`
                );
                _key.appendTo(_row);
            }
        _row.appendTo(this);
        }
    }
});

customElements.define('piano-key', class extends HTMLElement {
    connectedCallback() {
        const type = this.getAttribute('type');

        fetch(`assets/svg/piano_${type}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = `
                <div class='piano_${type}'>
                    ${svg}
                </div>
            `;
            this.querySelector('svg').classList.add(`piano_${type}`);

            const top = this.querySelector('.button-top');
            top.addEventListener('mouseenter', (e) => {
                if (e.buttons >0) press(this);
            });
            top.addEventListener('mousedown', (e) => {
                press(this);
            });
        });
    }
});

customElements.define('piano-board', class extends HTMLElement {
    connectedCallback() {
        const back = $(`<div id="paino_back"></div>`);
        const keys = $(`<div id="paino_keys"></div>`);
        keys.appendTo(this);
        for (let key of pianoLayout) {
            const sound = key.sound?`sound=${key.sound}`:'';
            const _key = $(
                `<piano-key ${sound} type=${key.type}></piano-key>`
            );
            _key.appendTo(keys);
        }
        back.appendTo(this);
        keys.appendTo(this);
    }
});

function press(btn) {
    if (!btn.classList.contains('pressed')) {
        const sound = btn.getAttribute('sound') ?? 'sfx.default';
        btn.classList.add('pressed');
        if (sound.startsWith('&')) window.audio.play(sound);
        else window.audio.play(sound, {volume:0.9});
        setTimeout(() => btn.classList.remove('pressed'), 200);
    }
}