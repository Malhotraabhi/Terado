import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/LoginSlice.js'; 
import { Dologin } from '../api-utils/api.js'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Validation(email, password) {
    let errorDescription = '';
    if (!email.trim() && !password.trim()) {
      errorDescription = 'Give the Correct Credentials';
    } else if (!password.trim()) {
      errorDescription = 'Give the Correct Password';
    } else if (!email.trim()) {
      errorDescription = 'Give the Correct Email';
    }

    return errorDescription;
  }

  async function handleLogin(e) {
    e.preventDefault();
    let Error = Validation(email, password);

    if (!Error) {
      try {
        const res = await Dologin({ email: email, password: password });

        if (res.token) {
          dispatch(setLogin(res.token));
          navigate('/');
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError(Error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
     
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
