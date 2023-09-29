import { utils, writeFile } from 'xlsx';

const GenerateExcelFile = ({ selectedData, rowStates }) => {
    console.log(rowStates);
    // Filter the selectedData to keep only rows marked as 'keep'
    const keepRows = selectedData.filteredTerms
      .flatMap((innerArray, rowIndex) =>
        innerArray.map((item, itemIndex) => ({
          ...item,
          rowIndex,
          itemIndex,
          state: rowStates[rowIndex], // Include the state of each row
        }))
      )
      .filter(({ state }) => state === 'keep');
  
    // Format the data into an Excel-friendly structure
    const excelData = keepRows.map((row) => ({
      Group: row.Group,
      Term: row.Term,
      'Term Owner': row['Term Owner'],
      // Add other fields here
    }));

  const ws = utils.json_to_sheet(excelData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'KeepRows');
  writeFile(wb, 'keep_rows.xlsx');
};

export default GenerateExcelFile;