
const serverURL = "http://localhost:5000"; 

function addTask(task, token) {
    return fetch(`${serverURL}/tasks/addtask`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
  }
  

function Dologin(userdata) {
    return fetch(`${serverURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json", 
      },
      body: JSON.stringify(userdata),
    }).then((res) => res.json());
  }
  function Dosignup(userdata) {

    if (!userdata.username || !userdata.password) {
      
      return Promise.reject('Username and password are required');
    }
  
    return fetch(`${serverURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((res) => res.json());
  }
  
  function RemoveTask(taskId, token) {
    return fetch(`${serverURL}/tasks/remove/${taskId}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }
  
  function EditTask(taskId, updatedData, token) {
    return fetch(`${serverURL}/tasks/edit/${taskId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }).then((res) => res.json());
  }
  
  function GetTask(token) {
    return fetch(`${serverURL}/tasks/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }
  

export{
    addTask,
    Dologin,
    GetTask,
    EditTask,RemoveTask,Dosignup
}