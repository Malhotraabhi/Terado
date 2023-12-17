import React, { useState } from 'react';
import { Dosignup } from '../api-utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'
const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const naviagate= useNavigate()
  const handleSignup = async () => {
    try {
      const userData = { email, password };
      const response = await Dosignup(userData);
  
      if (response.ok) {
        setSuccessMessage('User registered successfully!');
        naviagate('/login');
        setError(null);
      } else {
        
        const errorData = await response.json();
  
        if (errorData && errorData.message) {
          throw new Error(errorData.message);
        } else {
          throw new Error('Failed to register user');
        }
      }
    } catch (error) {
      setSuccessMessage('');
      setError(error.message);
    }
  };
  

  return (
    <div>
      <form>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default SignupForm;
