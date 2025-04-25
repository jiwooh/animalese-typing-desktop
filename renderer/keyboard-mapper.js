const keyboardLayout = [
    [ {label:'esc', size:'s'},          {label:'1', size:'s'}, 			{label:'2', size:'s'}, 			{label:'3', size:'s'}, 			{label:'4', size:'s'}, 			{label:'5', size:'s'}, 			{label:'6', size:'s'}, 			{label:'7', size:'s'}, 			{label:'8', size:'s'}, 			{label:'9', size:'s'}, 			{label:'0', size:'s'}, 			{label:'*', size:'s'}, 			{label:'*', size:'s'}],
    [ {label:'tab', size:'m'}, 		    {}, 			                {label:'a', size:'s'}, 			{label:'b', size:'s'}, 			{label:'c', size:'s'}, 			{label:'d', size:'s'}, 			{label:'e', size:'s'}, 			{label:'back', size:'m'}, 		{}, 			                {}, 			                {}, 			                {label:'*', size:'s'}, 			{label:'*', size:'s'}],
    [ {label:'f', size:'s'}, 			{label:'g', size:'s'}, 			{label:'h', size:'s'}, 			{label:'i', size:'s'}, 			{label:'j', size:'s'}, 			{label:'k', size:'s'}, 			{label:'l', size:'s'}, 			{label:'enter', size:'m'}, 		{}, 			                {}, 			                {}, 			                {label:'*', size:'s'}, 			{label:'*', size:'s'}],
    [ {label:'m', size:'s'}, 			{label:'n', size:'s'}, 			{label:'o', size:'s'}, 			{label:'p', size:'s'}, 			{label:'q', size:'s'}, 			{label:'r', size:'s'}, 			{label:'s', size:'s'}, 			{label:'t', size:'s'}, 			{label:'u', size:'s'}, 			{label:'↑', size:'s'}, 	        {}, 			                {label:'*', size:'s'}, 			{label:'*', size:'s'}],
    [ {label:'v', size:'s'}, 			{label:'w', size:'s'}, 			{label:'x', size:'s'}, 			{label:'space', size:'l'},		{}, 			                {}, 			                {label:'y', size:'s'}, 			{label:'z', size:'s'}, 			{label:'←', size:'s'}, 		    {label:'↓', size:'s'}, 		    {label:'→', size:'s'}, 		    {label:'*', size:'s'}, 			{label:'*', size:'s'}]
];

customElements.define('key-button', class extends HTMLElement {
    connectedCallback() {
        const size = this.hasAttribute('size')? this.getAttribute('size') : 's';
        const label = this.getAttribute('label');
        fetch(`assets/svg/key_${size}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = `
                <div class='key-label-wrapper key_${size}'>
                    ${svg}
                    <span class='key-label'>${label}</span>
                </div>
            `;
            this.querySelector('svg').classList.add(`key_${size}`);

            this.addEventListener('mouseenter', (e) => {
                if (e.buttons >0) press(this);
            });
            this.addEventListener('mousedown', (e) => {
                press(this);
            });
        });
    }
});

function press(btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 200);
}

function keyboardBuilder() {
    const keyboardElement = $('#keyboard');
    keyboardElement.html('');
    for (let row of keyboardLayout){
        const _row = $( `<div class='key-row'></div>`);
        for (let key of row) {
                const _key = $(key.label?
                    `<key-button id='key-${key.label}' size=${key.size} label=${key.label.toUpperCase()}></key-button>`:
                    `<div class='key_blank'></div>`
            );
            _key.appendTo(_row);
        }
        _row.appendTo(keyboardElement);
    }
}

document.addEventListener('DOMContentLoaded', e => {
    keyboardBuilder();
})