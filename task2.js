import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = 'csv/data.csv';
const outPutFilePath = 'csv-content.txt'

if (fs.existsSync(outPutFilePath)) {
  fs.unlinkSync(outPutFilePath)
}

const logger = fs.createWriteStream(outPutFilePath, {
  flags: 'a'
})

csv({output:"line"})
  .fromFile(csvFilePath)
  .subscribe((csvLine)=>{ 
    logger.write(csvLine + '\n')
  })
