import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentDate = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response1 = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      const { access, refresh } = response1.data;
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);

      const response2 = await axios.get('http://localhost:8000/api/current-user/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      localStorage.setItem('name', response2.data.first_name + ' ' + response2.data.last_name);
      localStorage.setItem('upload_image', response2.data.upload_image);
      localStorage.setItem('user_role', response2.data.user_role);

      const currentDateString = currentDate.toISOString().split('T')[0];
      const formattedDate = Number(currentDateString.replace(/-/g, ''));
      localStorage.setItem('user_cached_date', formattedDate);

      navigate(-1);

    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
