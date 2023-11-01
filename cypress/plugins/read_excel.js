const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

function readXlsx(filename, sheetName, cellReference){
    return new Promise((resolve, reject) => {
        const file = path.join(__dirname, '../fixtures/Excel_Files/' + filename);
        const buf = fs.readFileSync(file);
        const workbook = XLSX.read(buf, { type: 'buffer' });
        const worksheet = workbook.Sheets[sheetName];
        const cell = worksheet[cellReference];
        if (!cell) {
            reject(new Error(`Cell ${cellReference} not found in sheet ${sheetName}`));
          } else {
            resolve(cell);
          }
      });
    
}


module.exports = readXlsx;