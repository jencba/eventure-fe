import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import Loading from '../components/Loading';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/events')
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load events.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to Eventure 🎉</h1>
        <p>Discover and join exciting events happening around you.</p>
        <Link className="btn-primary-custom" to="/events">Browse All Events</Link>
      </div>

      <h3>Upcoming Events</h3>
      <div className="row">
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events yet.</p>
        ) : (
          upcomingEvents.map(event => (
            <div key={event.id} className="col-md-4">
              <div className="card-custom">
                <h5>{event.title}</h5>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.description?.slice(0, 100)}...</p>
                <Link to={`/events/${event.id}`}>View Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
