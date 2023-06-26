import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';

import React from 'react'
import axios from "axios";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setErrorMsg('');
}, [username, password])

  const handleLogin = async (e) => { 
    const url = "http://localhost:8080/api/users/login"
    const loginUser = { username: username, password: password};    
    e.preventDefault();
    try {
      const userResponse = await axios.post(url, loginUser);
      localStorage.setItem("userID", userResponse.data.id);
      localStorage.setItem("token", userResponse.data.token);
      if (userResponse.status === 200) {
        setRedirect(true);
        console.log(redirect);
      }
    } catch (error) {
      setRedirect(false);
      if (!error?.response) {
        setErrorMsg('No Server Response');
    } else if (error.response?.status === 400) {
        setErrorMsg('invalid username or password');
    } else {
        setErrorMsg('login Failed');
    }}
  }

  const redirectProfile = async () => {
    const token = localStorage.getItem("token")
    const headers = {
      'Authorization': 'Bearer ' + token
    }
    const userID = localStorage.getItem("userID")
    console.log("userId " + userID)
    const url = "http://localhost:8080/api/users/profile/" + userID;
    console.log("url ", url);
    const userProfile = await axios.get(url, {headers: headers});
    if (userProfile.status === 200) {
      console.log("auth sucess");
      setAuthenticated(true);
    }
  }

  if (redirect) {
    redirectProfile();
    console.log("auth ", authenticated)
  }

  return (
    <form className="login">
      <h1>login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={(event) => {setUsername(event.target.value)}}
             required/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={(event) => {setPassword(event.target.value)}}
             required/>
      <button onClick={handleLogin}>login</button> 
      <Link to='/register'>register</Link>      
      {errorMsg && <p>{ errorMsg }</p>}   
      {authenticated ? <Navigate to="/profile"></Navigate>: null}
    </form>
  )
}

export default Login