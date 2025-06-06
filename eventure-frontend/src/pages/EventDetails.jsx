import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import Loading from '../components/Loading';
import '../App.css'; 

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => setError('Failed to load event'));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!event) return <Loading />;

  return (
    <main className="event-details" aria-labelledby="event-title">
  <h2 id="event-title">{event.title}</h2>
  <p><strong>Date:</strong> <time dateTime={event.date}>{new Date(event.date).toLocaleString()}</time></p>
  <p><strong>Location:</strong> {event.location}</p>
  <p>{event.description}</p>

  <button 
    className="signup-button" 
    onClick={() => alert('You have Signed up!')}
    aria-label="Sign up for event"
  >
    Sign Up
  </button>
</main>

  );
};

export default EventDetails;
