const alphabet = require('./alphabet');

class Translator {
  constructor(text) {
    this.text = text.toUpperCase().trim();
    this.findLanguage();
  }
  findLanguage() {
    const latinRegex = /^[a-zA-Z\d\s]+$/gi;
    const nonLatinRegex = /^[-._ ][^a-zA-Z]+$/g;

    this.isLatin = this.text.match(latinRegex);
    this.isMorse = this.text.match(nonLatinRegex);
  }

  getLatinLetter(morseLetter) {
    for (let key in alphabet) {
      if (key === morseLetter) {
        return alphabet[key];
      }
    }
  }

  getMorseLetter(latinLetter) {
    for (let key in alphabet) {
      if (alphabet[key] === latinLetter) {
        return `${key} `;
      }
    }
  }

  translateToMorse() {
    let translatedText = '';

    for (let letter of this.text) {
      if (letter === ' ') {
        translatedText += '// ';
        continue;
      }

      translatedText += this.getMorseLetter(letter);
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

      translatedText += this.getLatinLetter(letter);
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
