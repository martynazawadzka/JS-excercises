class PalindromesChecker {
  static setPalindromeFragment(newFragment) {
    if (!this.palindromeFragment) {
      this.palindromeFragment = newFragment;
      return;
    }

    if (this.palindromeFragment.length < newFragment.length) {
      this.palindromeFragment = newFragment;
    }
  }

  static checkFragment(word, firstLetterIndex, lastLetterIndex) {
    if (word[firstLetterIndex] === word[lastLetterIndex]) {
      const substring = word.substring(firstLetterIndex, lastLetterIndex + 1);
      const palindromeFragment = this.checkInterior(substring);

      this.setPalindromeFragment(palindromeFragment);
    }
  }

  static checkInterior(substring) {
    const length = substring.length;
    const middleLetterIndex = length / 2;
    let isPalindrome = true;

    for (let i = 1; i < middleLetterIndex; i++) {
      if (substring[i] !== substring[length - i - 1]) {
        isPalindrome = false;
        break;
      }
    }
    if (isPalindrome) {
      return substring;
    }
  }

  static findPalindromeFragment(rawWord) {
    const word = rawWord.toLowerCase();
    for (let i = 0; i < word.length - 2; i++) {
      for (let j = word.length - 1; j - 1 > i; j--) {
        this.checkFragment(word, i, j);
      }
    }
    return this.returnResult();
  }

  static returnResult() {
    if (!this.palindromeFragment) {
      return 'There is no palindrome fragment';
    }
    return this.palindromeFragment;
  }
}

console.log(PalindromesChecker.findPalindromeFragment('baeRren'));
