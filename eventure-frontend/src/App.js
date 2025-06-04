import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EventsPage from './pages/Events'; 
import EventDetails from './pages/EventDetails';
import Register from './pages/Registere';
import Login from './pages/Login';
import AuthRoutes from './components/AuthRoutes';
import MyEvents from './pages/MyEvents';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/myevents"
          element={
            <AuthRoutes>
              <MyEvents />
            </AuthRoutes>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
