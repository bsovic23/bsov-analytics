import { utils, writeFile } from 'xlsx';

const GenerateExcelFileGeneral = ({ generalData }) => {

  if (generalData.length === 0) {
    console.error('generalData is empty. Cannot generate Excel file.');
    return;
  }

  // Extract column headers from the first item in generalData
  const columnHeaders = Object.keys(generalData[0]);

  // Create an array to store the Excel-friendly data
  const excelData = [columnHeaders]; // Initialize with the headers

  // Loop through the generalData to extract data rows
  for (const item of generalData) {
    const rowData = columnHeaders.map((header) => {
      const value = item[header];
      if (Array.isArray(value)) {
        // If the value is an array, join its elements with a comma
        return value.join(', ');
      } else {
        return value;
      }
    });
    excelData.push(rowData);
  }

  const ws = utils.json_to_sheet(excelData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'ExcelFile');
  writeFile(wb, 'excel_file.xlsx');
};

export default GenerateExcelFileGeneral;