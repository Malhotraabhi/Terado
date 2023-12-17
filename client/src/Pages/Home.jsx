
import React from 'react';
import AddTask from '../Components/AddTask';
import TaskList from '../Components/TaskList';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Task Manager</h1>
      <p className="welcome-message">Manage your tasks efficiently with Task Manager</p>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default Home;
