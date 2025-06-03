import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EventsPage from './pages/Events'; 
import EventDetails from './pages/EventDetails';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
