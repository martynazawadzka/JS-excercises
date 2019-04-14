module.exports = class treasureHunter {
  constructor(map) {
    this.map = map;
    this.lastClue = 11;
    this.currentClue = map[0][0];
  }

  findTreasure() {
    while (this.currentClue !== this.lastClue) {
      this.makeStep();
    }
    const treasurePosition = this.resolveClue(this.currentClue);
    console.log(
      `The treasure is in ${treasurePosition.rowIndex +
        1} row, ${treasurePosition.columnIndex +
        1} column, because the clue is ${this.currentClue}`
    );
  }

  makeStep() {
    const { map } = this;
    const resolvedClue = this.resolveClue(this.currentClue);
    this.lastClue = this.currentClue;
    this.currentClue = map[resolvedClue.rowIndex][resolvedClue.columnIndex];
    console.log(`Found clue: ${this.currentClue}`);
  }

  resolveClue(mapClue) {
    return {
      rowIndex: Math.floor(mapClue / 10) - 1,
      columnIndex: (mapClue % 10) - 1
    };
  }
};
