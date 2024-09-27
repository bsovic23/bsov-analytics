import React from 'react';

const GeneralAnalysisTable = ({ data }) => {
  // Assuming data is now an array of objects, directly map over it
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

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
        {data.map((item, rowIndex) => (
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