import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">Eventure</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
