import { utils, writeFile } from 'xlsx';

// Data Imports
// import { mockDataDictionaryData } from '../../data/dataDictionary';

const GenerateExcelFile = ({ rowStates }) => {

// Updates the full dataset with the state term
const updatedData = mockDataDictionaryData.map((item)=> {
  const id = item.id;
  const stateTerm = rowStates[id] || item["Data Dictionary Process"] || '';
  return {...item, state: stateTerm }
});

// Takes the updatedData and removes any 'delete' (keep, merge, '' all stay)
const filteredData = updatedData.filter((item) => {
  const state = item.state;
  return state === 'Keep' || (state.startsWith('Merge') && state.split(' ')[0] === 'Merge') || state === 'Re-Review' || state === '';
});

  // Format the data into an Excel-friendly structure
  const excelData = filteredData.map((row) => ({
    id: row.id,
    "Sub Group": row['Sub Group'],
    Term: row.Term,
    "Term Owner": row['Term Owner'],
    Definition: row.Definition,
    "Data Source": row['Data Source'],
    "Duplicate Metric": row['Duplicate Metric?'],
    "Additional Comments": row['Additional Comments'],
    "Data Dictionary Process": row.state
  }));

  const ws = utils.json_to_sheet(excelData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'KeepRows');
  writeFile(wb, 'keep_rows.xlsx');
};

export default GenerateExcelFile;