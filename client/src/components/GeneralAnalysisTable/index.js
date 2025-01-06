import React from 'react';

const GeneralAnalysisTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Professional Category</th>
          <th>Membership Enabled</th>
          <th>Membership Level</th>
          <th>Membership Status</th>
          <th>Member Since</th>
          <th>Renewal Due</th>
          <th>Renewal Date Last Change</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={index}>
            <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.professionalCategory}</td>
            <td>{user.membershipEnabled}</td>
            <td>{user.membershipLevel}</td>
            <td>{user.membershipStatus}</td>
            <td>{user.memberSince}</td>
            <td>{user.renewalDue}</td>
            <td>{user.renewalDateLastChange}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneralAnalysisTable;