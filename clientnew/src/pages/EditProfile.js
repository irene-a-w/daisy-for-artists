import './css/EditProfile.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  // create 3 functions to get patch request
  // need to use state to keep track
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
  }, [newUsername])

  // send queries function -> display success message
  // each button will be defined to do a different query
  const handleUsernameChange = async () => { 
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

  const handlePasswordChange = async () => { 
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

  const handleBioChange = async () => { 
    const userID = sessionStorage.getItem("userID");
    const url = "http://localhost:8080/api/users/profile/edit/bio/" + userID;
    console.log(url);
    // changing bio is a little different .. i think should display the old bio values
    const newBioRequest = await axios.patch(url, {bio: newBio}, {headers: headers});
    // once request is submitted, if successful, then just keep the input box with the bio values
    console.log(newBioRequest);
  }

  return (
    <div className='edit-profile'>
      <section className='edit-username'>
      <p>change username</p>
      <input type="text"
             value={newUsername}
             onChange={(event) => {setUsername(event.target.value)}}
             required/>
      <button onClick={handleUsernameChange}>save</button>
      {errorMsg && <p>{ errorMsg }</p>}  
      </section>
      <section className='edit-password'>
      <p>change password</p>
      <input type="text"
             value={newPassword}
             onChange={(event) => {setPassword(event.target.value)}}
             required/>
      <button onClick={handlePasswordChange}>save</button>
      </section>
      <section className='edit-bio'>
      <p>change bio</p>
      <textarea 
             value={newBio}
             onChange={(event) => {setBio(event.target.value)}}
             required/>
      <button onClick={handleBioChange}>save</button>
      </section>
    </div>
  )
}

export default EditProfile