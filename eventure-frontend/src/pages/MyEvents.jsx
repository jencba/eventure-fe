import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Loading from '../components/Loading';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/events');
      const userId = JSON.parse(localStorage.getItem('user'))?.id;
      const myEvents = res.data.filter(event => event.user_id === userId);
      setEvents(myEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.patch(`/events/${editingId}`, formData);
      } else {
        await API.post('/events', formData);
      }
      setFormData({ title: '', description: '', date: '', location: '' });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
      setError('Could not save event.');
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Could not delete event.');
    }
  };

  const getGoogleCalendarUrl = (event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(
      event.location
    )}&dates=${formatDate(startDate)}/${formatDate(endDate)}&sf=true&output=xml`;
  };

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="my-events-container">
      <h2 className="section-title">My Events</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update Event' : 'Create Event'}</button>
      </form>

      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <div className="event-info">
              <strong>{event.title}</strong> — {event.date} @ {event.location}
            </div>
            <div className="event-buttons">
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="google-calendar-btn"
              >
                Add to Google Calendar
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
