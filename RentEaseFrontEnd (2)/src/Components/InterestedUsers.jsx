import React from "react";
import "../styles/InterestedUsers.css"; // Create this CSS file for styling

const InterestedUsers = ({ users }) => {
  if (!users || users.length === 0) {
    return <p className="no-interest">No one has shown interest yet.</p>;
  }

  return (
    <div className="interested-users">
      <h3>Interested Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.userid} className="user-card">
            <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Shortlisted At:</strong> {new Date(user.shortlistedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestedUsers;
