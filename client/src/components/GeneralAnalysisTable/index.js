import React from 'react';

const GeneralAnalysisTable = ({ data }) => {
  // Convert the data object to an array for easy mapping
  const emailArray = Object.values(data);
  console.log(emailArray);

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>State</th>
          <th>Country</th>
          <th>Member</th>
          <th>Date Access Total</th>
          <th>Courses Complete</th>
          <th>First Contact</th>
          <th>Last Contact</th>
        </tr>
      </thead>
      <tbody>
        {emailArray.map((item, index) => (
          <tr key={index}>
            <td>{item.email}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.state}</td>
            <td>{item.country}</td>
            <td>{item.member ? 'Yes' : 'No'}</td>
            <td>{item.dateAccessTotal}</td>
            <td>{item.coursesComplete}</td>
            <td>{item.firstContact}</td>
            <td>{item.lastContact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneralAnalysisTable;