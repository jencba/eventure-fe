import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    API.get('/events')
      .then((res) => {

        const sorted = res.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1 className="display-4">Welcome to Eventure 🎉</h1>
        <p className="lead">Discover Exciting Events Around You.</p>
        <Link className="btn btn-primary btn-lg" to="/events">Browse All Events</Link>
      </div>

      {/* Upcoming Events */}
      <h3 className="mb-4">Upcoming Events</h3>
      <div className="row">
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events yet.</p>
        ) : (
          upcomingEvents.map(event => (
            <div key={event.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="card-text">{event.description?.slice(0, 100)}...</p>
                  <Link to={`/events/${event.id}`} className="btn btn-outline-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );



  }
  