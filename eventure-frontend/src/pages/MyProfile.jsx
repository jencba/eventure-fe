import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setError('You must be logged in to view your profile.');
      } else {
        setUser(storedUser);
      }
    } catch (err) {
      setError('Failed to load user data.');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">{error}</div>
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
