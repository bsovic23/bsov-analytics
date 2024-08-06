import React from 'react';

const GeneralAnalysisTable = ({ data }) => {
  const dataArray = Object.values(data);

  const headers = Object.keys(dataArray[0] || {});

  const renderCellValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value;
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataArray.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{renderCellValue(item[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneralAnalysisTable;