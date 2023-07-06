import './css/Register.css';

import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import React from 'react';
import axios from "axios";

export const Register = () => {
  sessionStorage.clear();
  let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setErrorMsg('');
    }, [username, password])

    const url = "http://localhost:8080/api/users/"
    const createUser = { email: email, username: username.toLowerCase(), password: password};
    const handleSubmit = async (e) => { 
      e.preventDefault();
      try {
        const userResponse = await axios.post(url, createUser);
        console.log(userResponse);
        sessionStorage.setItem("userID", userResponse.data.id);
        sessionStorage.setItem("username", userResponse.data.username);
        sessionStorage.setItem("token", userResponse.data.token);
        console.log('register', userResponse.data.id);
        if (userResponse.status === 200) {
          navigate('/profile', {state: {currentUserID: sessionStorage.setItem("userID", userResponse.data.id)}});
        }
      } catch (error) {
        console.log(error)
        if (!error?.response) {
          setErrorMsg('error: no server response.');
      } else if (error.response?.status === 403 && error.response?.data.message === 'email exists') {
          setErrorMsg('email already in use.');
      } else if (error.response?.status === 403 && error.response?.data.message === 'username exists') {
        setErrorMsg('username already in use.');
      } else {
          setErrorMsg('unable to create account.');
      }}
    }

  return (
    <div className='register-overall'>
    <form className="register-input-box">
      <h1>daisy.</h1>
      <div>
      <input type="text"
             placeholder="email"
             value={email}
             onChange={(event) => {setEmail(event.target.value)}}
             required/>
      </div>    
      <div>
      
      <input type="text"
             placeholder="username"
             value={username}
             onChange={(event) => {setUsername(event.target.value)}}
             required/>
      </div>  
      <div>
      <input type="text"
             placeholder="password"
             value={password}
             onChange={(event) => {setPassword(event.target.value)}}
             required/>        
      </div>
      <p className='register-error'>{ errorMsg }</p>
      <button onClick={handleSubmit}>register</button>              
    </form>
      <div className='register-login-route'>
        <p>already have an account?</p>
        <button onClick={() => navigate('/')}>login</button>         
      </div>
    </div>
  )
}

export default Register