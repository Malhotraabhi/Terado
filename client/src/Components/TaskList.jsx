import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GetTask, EditTask, RemoveTask } from "../api-utils/api";
import "../styles/Tasklist.css";
import "../styles/Loder.css"
const TaskList = () => {
  const token = useSelector((state) => state.Login.token);
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!token) {
          console.error("User not logged in");
          return;
        }

        setLoading(true);

        const response = await GetTask(token);

        if (response.ok) {
          setTasks(response.tasks);
        } else {
          console.error("Failed to fetch tasks:", response.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleRemoveTask = async (taskId) => {
    try {
      if (!token) {
        console.error("User not logged in");
        return;
      }

      const response = await RemoveTask(taskId, token);

      if (response.ok) {
        const updatedTasks = await GetTask(token);
        setTasks(updatedTasks.tasks);
      } else {
        console.error("Failed to remove task:", response.message);
      }
    } catch (error) {
      console.error("Error removing task:", error.message);
    }
  };

  const handleEditTask = async (taskId) => {
    try {
      if (!token) {
        console.error("User not logged in");
        return;
      }

      const taskToEdit = tasks.find((task) => task.id === taskId);

      if (taskToEdit) {
        setEditedTaskId(taskId);
        setEditedTaskTitle(taskToEdit.title);
      }
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (!token) {
        console.error("User not logged in");
        return;
      }

      const updatedData = { title: editedTaskTitle };
      const response = await EditTask(editedTaskId, updatedData, token);

      if (response.ok) {
        const updatedTasks = await GetTask(token);
        setTasks(updatedTasks.tasks);
        setEditedTaskId(null);
        setEditedTaskTitle("");
      } else {
        console.error("Failed to edit task:", response.message);
      }
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditedTaskId(null);
    setEditedTaskTitle("");
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-heading">Task List</h2>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editedTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                  />
                  <button className="save-btn" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {task.title}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
