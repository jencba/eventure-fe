import React from 'react';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">
          You must be logged in to view your profile.
        </div>
        <Link to="/login" className="btn btn-outline-primary mt-3">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">My Profile</h2>
        <div className="mb-3">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        
        </div>
        <Link to="/myevents" className="btn btn-primary">
          View My Events
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
