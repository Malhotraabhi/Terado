
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut } from '../redux/LoginSlice';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Login) || {};

  const handleLogout = () => {
    dispatch(setLogOut());
  };

  return (
    <header>
      <h1>Task Manager</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/add-task">
            <button>Add Task</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
