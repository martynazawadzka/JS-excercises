const alphabet = require('./alphabet');

class Translator {
  constructor(text) {
    this.text = text.toUpperCase().trim();
    this.findLanguage();
  }
  findLanguage() {
    const latinRegex = /^[a-zA-Z\d\s]+$/gi;
    const nonLatinRegex = /[-._ ][^a-zA-Z]+$/g;

    if (this.text.match(latinRegex)) {
      this.isLatin = true;
    } else if (this.text.match(nonLatinRegex)) {
      this.isMorse = true;
    }
  }

  translateToMorse() {
    let translatedText = '';

    for (let letter of this.text) {
      if (letter === ' ') {
        translatedText += '// ';
        continue;
      }
      for (let key in alphabet) {
        if (alphabet[key] === letter) {
          translatedText += `${key} `;
          break;
        }
      }
    }
    return translatedText;
  }

  translateToLatin() {
    const splittedText = this.text.split(' ');
    let translatedText = '';

    for (let letter of splittedText) {
      if (letter === '//') {
        translatedText += ' ';
        continue;
      }
      for (let key in alphabet) {
        if (key === letter) {
          translatedText += `${alphabet[key]}`;
          break;
        }
      }
    }
    return translatedText;
  }

  translate() {
    if (this.isLatin) {
      return this.translateToMorse();
    } else if (this.isMorse) {
      return this.translateToLatin();
    }
    return 'Give proper text';
  }
}

const myT = new Translator('.... .. // -- -.-- // -. .- -- . // .. ...');

console.log(myT.translate());
