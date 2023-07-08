import './css/EditProfile.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Navigation from '../components/Navigation';

const EditProfile = () => {
  let navigate = useNavigate(); 

  const [newUsername, setUsername] = useState('');
  const [newPassword, setPassword] = useState('');
  const [newBio, setBio] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const token = sessionStorage.getItem("token")
  console.log(token);
  const headers = {
    'Authorization': 'Bearer ' + token
  }

  useEffect(() => {
    setErrorMsg('');
  }, [newUsername, newPassword, newBio])

  const handleUsernameChange = async () => { 
    const specialChar =/[`!@#$%^&*()\+=\[\]{};':"\\|,<>\/?~ ]/;
    if (newUsername === '' || specialChar.test(newUsername)) {
      setErrorMsg('please enter a valid username.')
    } else {
      const userID = sessionStorage.getItem("userID");
      const url = "http://localhost:8080/api/users/profile/edit/username/" + userID;
      try {
        const newUsernameRequest = await axios.patch(url, {username: newUsername}, {headers: headers});
        if (newUsernameRequest.status === 200) {
          setErrorMsg('successfully changed');
        }
      } catch (error) {
        if (!error?.response) {
          setErrorMsg('No Server Response');
      } else if (error.response?.status === 403) {
          setErrorMsg('username already in use');
      } else {
          setErrorMsg('change username failed');
      }}      
    }
  }

  const handlePasswordChange = async () => { 
    const specialChar =/ /;
    if (newPassword === '' || specialChar.test(newPassword)) {
      setErrorMsg('please enter a valid password.')
    } else {
      const userID = sessionStorage.getItem("userID");
      const url = "http://localhost:8080/api/users/profile/edit/password/" + userID;      
      try {
        const newPasswordRequest = await axios.patch(url, {password: newPassword}, {headers: headers});
        if (newPasswordRequest.status === 200) {
          setErrorMsg('successfully changed');
        }
      } catch (error) {
        if (!error?.response) {
          setErrorMsg('No Server Response');
      } else {
          setErrorMsg('change password Failed');
      }}
  }
  }

  const handleBioChange = async () => { 
    const userID = sessionStorage.getItem("userID");
    const url = "http://localhost:8080/api/users/profile/edit/bio/" + userID;
    const newBioRequest = await axios.patch(url, {bio: newBio}, {headers: headers});
  }

  return (
    <div className='edit-profile-overall'>
      <Navigation />
      <div className='edit-profile'>
        <h1>edit profile</h1>
        <div className='edit-username'>
        <p>change username</p>
        <input type="text"
              value={newUsername}
              onChange={(event) => {setUsername(event.target.value)}}
              required/>
        <button onClick={handleUsernameChange}>save</button>
        </div>
        <div className='edit-password'>
        <p>change password</p>
        <input type="text"
              value={newPassword}
              onChange={(event) => {setPassword(event.target.value)}}
              required/>
        <button onClick={handlePasswordChange}>save</button>
        </div>
        <div className='edit-bio'>
        <p>change bio</p>
        <textarea
              value={newBio}
              placeholder='max 150 characters'
              onChange={(event) => {setBio(event.target.value)}}
              maxLength={150}
              required/>
        <button onClick={handleBioChange}>save</button> 
        </div>
        <p className='edit-profile-error'>{ errorMsg }</p>
      </div>
      <button className='edit-profile-return' onClick={()=> {navigate('/profile', {state: {currentUserID: sessionStorage.getItem("userID")}})}}>return to profile</button>
    </div>
  )
}

export default EditProfile