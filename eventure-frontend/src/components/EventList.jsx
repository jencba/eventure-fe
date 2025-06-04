import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Events</h2>
      <div className="row">
        {events.map(event => (
          <div key={event.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text"><strong>Date:</strong> {event.date}</p>
                <Link to={`/events/${event.id}`} className="btn btn-outline-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
