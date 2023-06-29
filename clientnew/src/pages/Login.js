import './css/Login.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";

const Login = () => {
  sessionStorage.clear();
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
}, [username, password])

  const handleLogin = async (e) => { 
    console.log("entering here");
    const url = "http://localhost:8080/api/users/login"
    const loginUser = { username: username, password: password};    
    e.preventDefault();
    try {
      const userResponse = await axios.post(url, loginUser);
      console.log("is there a response", userResponse);

      if (userResponse.status === 200) {
        console.log("userResponse")
        sessionStorage.setItem("userID", userResponse.data.id);
        sessionStorage.setItem("username", userResponse.data.username);
        sessionStorage.setItem("token", userResponse.data.token);
        navigate('/profile', {state: {currentUserID: userResponse.data.id}})
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
    } else if (error.response?.status === 400) {
        setErrorMsg('invalid username or password');
    } else {
        setErrorMsg('login Failed');
    }}
  }

  // const redirectProfile = async () => {
  //   const token = sessionStorage.getItem("token")
  //   const headers = {
  //     'Authorization': 'Bearer ' + token
  //   }
  //   const userID = sessionStorage.getItem("userID")
  //   console.log("userId " + userID)
  //   const url = "http://localhost:8080/api/users/profile/" + userID;
  //   console.log("url ", url);
  //   const userProfile = await axios.get(url, {headers: headers});
  //   if (userProfile.status === 200) {
  //     console.log("auth sucess");
  //     setAuthenticated(true);
  //   }
  // }


  return (
    <div className='overall'>
    <form className="login">
      <h1>daisy.</h1>
      <div>
        <input type="text"
              placeholder="username"
              value={username}
              onChange={(event) => {setUsername(event.target.value)}}
              required/>        
      </div>
      <div>
        <input type="password"
              placeholder="password"
              value={password}
              onChange={(event) => {setPassword(event.target.value)}}
              required/>        
      </div>
      {errorMsg && <p>{ errorMsg }</p>} 
      <button className='login-button' onClick={handleLogin}>log in</button> 
      </form>      
      <div className='register'>
        <p>don't have an account?</p>
        <button>register</button>         
      </div>
      {/* <Link to='/register'>register</Link>       */}
      </div>

  )
}

export default Login