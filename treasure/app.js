const treasureHunter = require('./TreasureHunter');
const map = require('./map');

const myHunter = new treasureHunter(map);
myHunter.findTreasure();
