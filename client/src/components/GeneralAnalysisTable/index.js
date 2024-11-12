import React from 'react';

const GeneralAnalysisTable = ({ data }) => {
  // Convert the data object into an array of rows
  const rows = Object.entries(data).flatMap(([location, submissions]) =>
    submissions.map(submission => ({
      location,
      identifier: submission.identifier,
      submissionDate: submission.submissionDate
    }))
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Location</th>
          <th>Identifier</th>
          <th>Submission Date</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item, rowIndex) => (
          <tr key={rowIndex}>
            <td>{item.location}</td>
            <td>{item.identifier}</td>
            <td>{item.submissionDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneralAnalysisTable;