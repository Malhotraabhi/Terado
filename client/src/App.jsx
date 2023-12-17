import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./redux/store"; 
import Header from "./Components/Header";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignupPage";
import AddTaskPage from "./Pages/AddTaskPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/add-task" element={<AddTaskPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
