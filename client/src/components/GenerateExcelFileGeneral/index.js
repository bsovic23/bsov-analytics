import { utils, writeFile } from 'xlsx';

const GenerateExcelFileGeneral = ({ generalData }) => {
  if (generalData.length === 0) {
    console.error('generalData is empty. Cannot generate Excel file.');
    return;
  }

  // Process `generalData` to ensure array values are converted to strings
  const processedData = generalData.map((item) => {
    const processedItem = {};
    for (const key in item) {
      const value = item[key];
      if (Array.isArray(value)) {
        // If the value is an array, join its elements with a comma
        processedItem[key] = value.join(', ');
      } else {
        processedItem[key] = value;
      }
    }
    return processedItem;
  });

  // Convert the processed data to a worksheet
  const ws = utils.json_to_sheet(processedData);

  // Create a new workbook and append the worksheet
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'ExcelFile');

  // Write the workbook to a file
  writeFile(wb, 'excel_file.xlsx');
};

export default GenerateExcelFileGeneral;