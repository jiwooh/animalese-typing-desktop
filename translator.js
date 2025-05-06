const fs = require('fs');
const path = require('path');

let translations = {}; // current selected language
// default translations
const defaultTranslations = 
    JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', 'lang', `en.json`), 'utf8'));


// load a language
function loadLanguage(lang = 'en') {
    const langFilePath = path.join(__dirname, 'assets', 'lang', `${lang}.json`);
    if (fs.existsSync(langFilePath)) {
        translations = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
    } else {
        console.error(`Language file for "${lang}" not found.`);
        translations = {};
    }
}
// default language set to english
loadLanguage('en');

function translate(key) {
    return translations[key] || (defaultTranslations[key] || `Missing: ${key}`);
}

module.exports = {
    loadLanguage,
    translate
};