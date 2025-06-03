import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => setError('Failed to load event'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      

      <button onClick={() => alert('You havee Signed up')}>Sign Up</button>
    </div>
  );
};

export default EventDetails;
