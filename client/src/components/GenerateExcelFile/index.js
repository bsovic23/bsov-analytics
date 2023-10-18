import { utils, writeFile } from 'xlsx';

const GenerateExcelFile = ({ selectedData, rowStates }) => {
  console.log(selectedData);
  console.log(rowStates);

  // Create a dictionary to map filteredTerms.id to their corresponding states
  const stateMap = {};
  selectedData.filteredTerms.forEach((innerArray) => {
    innerArray.forEach((item) => {
      stateMap[item.id] = rowStates[item.id]; // Include the state of each row
    });
  });

  // Filter the selectedData based on rowStates
  const keepRows = selectedData.filteredTerms
    .flatMap((innerArray) =>
      innerArray.map((item) => ({
        ...item,
        state: stateMap[item.id],
      }))
    )
    .filter(({ state }) => state === 'keep');

  // Format the data into an Excel-friendly structure
  const excelData = keepRows.map((row) => ({
    Id: row.id,
    Group: row.Group,
    Term: row.Term,
    'Term Owner': row['Term Owner'],
    Defintion: row['Definition']
  }));

  const ws = utils.json_to_sheet(excelData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'KeepRows');
  writeFile(wb, 'keep_rows.xlsx');
};

export default GenerateExcelFile;