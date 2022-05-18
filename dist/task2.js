"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const csv = require('csvtojson');

const csvFilePath = 'csv/data.csv';
const outPutFilePath = 'csv-content.txt';

if (_fs.default.existsSync(outPutFilePath)) {
  _fs.default.unlinkSync(outPutFilePath);
}

const logger = _fs.default.createWriteStream(outPutFilePath, {
  flags: 'a'

});

csv({
  output: "line"
}).fromFile(csvFilePath).subscribe(csvLine => {
  logger.write(csvLine + '\n');
});