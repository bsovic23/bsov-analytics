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
          <th>Member</th>
          <th>Courses Complete</th>
          <th>situationshipA</th>
          <th>situationshipB</th>
          <th>Course Names Completed</th>
          <th>Course Numbers Completed</th>
          <th>Course Names Registered</th>
          <th>Course Numbers Registered</th>
        </tr>
      </thead>
      <tbody>
        {emailArray.map((item, index) => (
          <tr key={index}>
            <td>{item.email}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.member ? 'Yes' : 'No'}</td>
            <td>{item.coursesComplete}</td>
            <td>{item.situationA ? 'Yes' : 'No'}</td>
            <td>{item.situationB ? 'Yes' : 'No'}</td>
            <td>{item.courseNameComplete.map(course => course.course).join(', ')}</td>
            <td>{item.courseIdComplete.map(course => course.course).join(', ')}</td>
            <td>{item.courseNameRegister.map(course => course.course).join(', ')}</td>
            <td>{item.courseIdRegister.map(course => course.course).join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneralAnalysisTable;