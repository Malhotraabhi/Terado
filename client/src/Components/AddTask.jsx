import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { addTask } from '../api-utils/api'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Addtask.css'

const AddTask = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let token = useSelector((state) => {
    return state.Login.token;
  });
  const handleAddTask = async () => {
    try {
      if (!token) {

        setError('User not logged in');
        return;
      }

      const taskData = { task }; 
      const response = await addTask(taskData, token);

      if (response.ok) {
        
        console.log('Task added successfully');
        navigate('/')
        
      } else {
      
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="add-task-container">
      <h2 className="add-task-heading">Add Task</h2>
      <div className="add-task-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task description"
          className="add-task-input"
        />
        <button type="button" onClick={handleAddTask} className="add-task-button">
          Add Task
        </button>
        {error && <p className="add-task-error">{error}</p>}
      </div>
    </div>
  );
};

export default AddTask;
