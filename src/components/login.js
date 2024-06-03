import React, { useState } from 'react';
import './login.css'; // Import the CSS file for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        onLogin(); // Call onLogin callback to notify the parent component of successful login
      } else {
        setError('Invalid username or password'); // Set error message for display
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.'); // Set error message for display
    }
  };

  return (
    <div className="login-container">
      <div className='login-form'>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>} {/* Display error message if error state is set */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <div className='input-username'>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className='input-password'>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
