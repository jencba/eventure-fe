import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import Loading from '../components/Loading';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', formData);
      const session = res.data?.data?.session || res.data?.session;

      if (!session || !session.access_token || !session.user) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', session.access_token);
      localStorage.setItem('user', JSON.stringify(session.user));

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit} aria-label="Login Form">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Login</button>
</form>
{error && <p className="login-error" role="alert">{error}</p>}
      {error && <p className="login-error">{error}</p>}
      <p className="login-link">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
