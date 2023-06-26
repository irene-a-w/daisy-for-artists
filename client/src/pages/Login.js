import { useEffect, useState } from "react";
import {BrowserRouter, Link} from 'react-router-dom';

import React from 'react'
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setErrorMsg('');
}, [username, password])

  const url = "http://localhost:8080/api/users/login"
  const loginUser = { username: username, password: password};
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const userResponse = await axios.post(url, loginUser);
      console.log(userResponse);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
    } else if (error.response?.status === 400) {
        setErrorMsg('invalid username or password');
    } else {
        setErrorMsg('login Failed');
    }
    }
  }

  // if (redirect) {
  //   return <Redirect to='/register'></Redirect>
  // }

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
      <button onClick={handleSubmit}>login</button> 
      <BrowserRouter>
      <Link to='/register'>register</Link>
      </BrowserRouter>
      
      {errorMsg && <p>{ errorMsg }</p>}   
      <p>register</p>   
    </form>
  )
}

export default Login