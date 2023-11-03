const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

function readXlsx(filename, sheetName, cellReference) {
  return new Promise((resolve, reject) => {
    const file = path.join(__dirname, '../fixtures/Excel_Files/' + filename + '.xlsx');
    const buf = fs.readFileSync(file);
    const workbook = XLSX.read(buf, { type: 'buffer' });
    const worksheet = workbook.Sheets[sheetName];
    const cell = worksheet[cellReference];
    if (!cell) {
      resolve(null);
      // reject(new Error(`Cell ${cellReference} not found in sheet ${sheetName}`));
    } else {
      resolve(cell);
    }
  });

}

function getNumberOfRows(filename, sheetName) {
  return new Promise((resolve, reject) => {
    const file = path.join(__dirname, '../fixtures/Excel_Files/' + filename + '.xlsx');
    const buf = fs.readFileSync(file);
    const workbook = XLSX.read(buf, { type: 'buffer' });
    const worksheet = workbook.Sheets[sheetName];
    // Initialize a count for non-empty rows
    let nonEmptyRowCount = 0;

    // Iterate through the rows and check for non-empty rows
    for (let row = 1; ; row++) {
      const cell = worksheet['A' + row]; // Assuming you want to check column A
      if (!cell || !cell.v) {
        // Break the loop when an empty cell is encountered
        break;
      }
      nonEmptyRowCount++;
    }


    if (!nonEmptyRowCount) {
      reject(new Error(`No of Rows not found in sheet ${sheetName}`));
    } else {
      resolve(nonEmptyRowCount);
    }
  });



}


module.exports = { readXlsx, getNumberOfRows };