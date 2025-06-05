import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css'; // Make sure to import the stylesheet

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">All Events</h2>
      <div className="event-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-card-body">
              <h5 className="event-card-title">{event.title}</h5>
              <p className="event-card-date"><strong>Date:</strong> {event.date}</p>
              <Link to={`/events/${event.id}`} className="event-card-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
