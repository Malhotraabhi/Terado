
import React from 'react';
import SignupForm from '../Components/Signup';
import '../styles/Signup.css'; 

const SignupPage = () => {
  return (
    <div className="SignupPage">
<h1 style={{ marginBottom: '20px' }}>Signup Page</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
