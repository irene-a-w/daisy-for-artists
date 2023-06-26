import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';

import React from 'react';
import axios from "axios";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setErrorMsg('');
    }, [username, password])

    const url = "http://localhost:8080/api/users/"
    const createUser = { email: email, username: username, password: password};
    const handleSubmit = async (e) => { 
      e.preventDefault();
      try {
        const userResponse = await axios.post(url, createUser);
        console.log(userResponse);
        localStorage.setItem("current user", userResponse.data);
        localStorage.setItem("token", userResponse.data.token);
        if (userResponse.status === 200) {
          setRedirect(true);
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
          setErrorMsg('error: unable to create account.');
      }}
    }

    const redirectProfile = async (e) => {
      const token = localStorage.getItem("token")
      const headers = {
        'Authorization': 'Bearer ' + token
      }
      const userID = localStorage.getItem("current user")
      const url = "http://localhost:8080/api/users/profile/" + userID["id"];
      const userProfile = await axios.get(url, {headers: headers});
      if (userProfile.status === 200) {
        console.log("auth sucess");
        setAuthenticated(true);
      }
    }
  
    if (redirect) {
      redirectProfile();
    }

  return (
    <form className="register">
      <h1>create account</h1>
      <input type="text"
             placeholder="email"
             value={email}
             onChange={(event) => {setEmail(event.target.value)}}
             required/>
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
      <button onClick={handleSubmit}>register</button> 
      <Link to='/'>login</Link> 
      {errorMsg && <p>{ errorMsg }</p>}    
      {authenticated ? <Navigate to="/profile"></Navigate>: null}  
    </form>
  )
}

export default Register