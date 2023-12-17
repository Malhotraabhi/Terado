
import React from 'react';
import AddTask from '../Components/AddTask';
import '../styles/Addtask.css'; 

const AddTaskPage = () => {
  return (
    <div className="add-task-page">
      <h1 style={{ marginBottom: '20px' }}>AddTask</h1>
      <AddTask />
    </div>
  );
};

export default AddTaskPage;
