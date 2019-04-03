const alphabet = require('./alphabet');

class Translator {
  static prepareText(text) {
    return text.toUpperCase().trim();
  }

  static findLanguage(text) {
    const latinRegex = /^[a-zA-Z\d\s]+$/gi;
    const nonLatinRegex = /^[-._ ][^a-zA-Z]+$/g;

    this.isLatin = text.match(latinRegex);
    this.isMorse = text.match(nonLatinRegex);
  }

  static getLatinLetter(morseLetter) {
    for (let key in alphabet) {
      if (key === morseLetter) {
        return alphabet[key];
      }
    }
  }

  static getMorseLetter(latinLetter) {
    for (let key in alphabet) {
      if (alphabet[key] === latinLetter) {
        return `${key} `;
      }
    }
  }

  static translateToMorse(text) {
    let translatedText = '';

    for (let letter of text) {
      if (letter === ' ') {
        translatedText += '// ';
        continue;
      }

      translatedText += this.getMorseLetter(letter);
    }
    return translatedText;
  }

  static translateToLatin(text) {
    const splittedText = text.split(' ');
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

  static translate(text) {
    const preparedText = this.prepareText(text);
    this.findLanguage(preparedText);
    if (this.isLatin) {
      return this.translateToMorse(preparedText);
    } else if (this.isMorse) {
      return this.translateToLatin(preparedText);
    }
    return 'Give proper text';
  }
}

console.log(
  Translator.translate(
    '.... .. // -- -.-- // -. .- -- . // .. ... // -- .- .-. - -.-- -. .- '
  )
);
