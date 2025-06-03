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
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              <strong>{event.title}</strong>
            </Link> — {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
