// Import the xlsx library
const XLSX = require('xlsx');

// Read the Excel file
const workbook = XLSX.readFile('your_excel_file.xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Get the range of cells
const range = XLSX.utils.decode_range(sheet['!ref']);

// Initialize an array to store the JSON objects
const jsonData = [];

// Loop through each row starting from the 3rd row
for (let rowNum = 2; rowNum <= range.e.r; rowNum++) {
  // Initialize an object to store the key-value pairs for each row
  const rowObject = {};

  // Loop through each column in the current row
  for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
    // Get the cell ID (e.g., "A2", "B2", etc.)
    const cellId = XLSX.utils.encode_cell({ r: rowNum, c: colNum });

    // Get the value of the current cell
    const cellValue = sheet[cellId] ? sheet[cellId].v : undefined;

    // Get the header cell ID (e.g., "A2", "B2", etc.) for the current column
    const headerCellId = XLSX.utils.encode_cell({ r: 1, c: colNum });

    // Get the header value for the current column
    const headerValue = sheet[headerCellId] ? sheet[headerCellId].v : undefined;

    // Add the key-value pair to the rowObject
    if (headerValue && cellValue !== undefined) {
      rowObject[headerValue] = cellValue;
    }
  }

  // Add the rowObject to the jsonData array
  jsonData.push(rowObject);
}

// Print the resulting JSON array
console.log(JSON.stringify(jsonData, null, 2));
