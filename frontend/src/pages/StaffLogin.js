import React, { useState } from 'react';
import '../styles/StaffLogin.css';
import Layout  from '../components/Layout';
import { useNavigate } from 'react-router-dom';


const StaffLogin = () => {
  // State for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const navtostaff = () => {
    navigate('/Staff')
  }

  return (
    <Layout>
        <div className="login-container"> {/* Add a class for styling */}
      <h2>Staff Login</h2>
      
      <form >
        <div className="form-group"> {/* Add a class for styling */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group"> {/* Add a class for styling */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={navtostaff}  type="submit" className="login-button">Login</button> {/* Add a class for styling */}
      </form>
    </div>
    </Layout>
  );
};

export default StaffLogin;
