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
    <main className="container">
    <section className="hero" aria-labelledby="home-title">
      <h1 id="home-title">Welcome to Eventure 🎉</h1>
      <p>Discover and join exciting events happening around you.</p>
      <Link className="btn-primary-custom" to="/events" aria-label="Browse all events">
        Browse All Events
      </Link>
    </section>
  
    <section aria-labelledby="upcoming-events-title">
      <h3 id="upcoming-events-title">Upcoming Events</h3>
      <div className="row" role="list">
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events yet.</p>
        ) : (
          upcomingEvents.map(event => (
            <article key={event.id} className="col-md-4" role="listitem">
              <div className="card-custom">
                <h4>{event.title}</h4>
                <time dateTime={event.date}>
                  {new Date(event.date).toLocaleDateString()}
                </time>
                <p>{event.description?.slice(0, 100)}...</p>
                <Link to={`/events/${event.id}`} aria-label={`View details for ${event.title}`}>
                  View Details
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  </main>
  
  );
}
