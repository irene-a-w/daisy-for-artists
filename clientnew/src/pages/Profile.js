import './css/Profile.css';

import React from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';
import DisplayRequests from '../components/DisplayRequests';

// TODO need to implement getting a specific users profile

const Profile = () => {
  const { state } = useLocation();
  const { currentUserID } = state;
  if (!currentUserID) {
     currentUserID = sessionStorage.getItem("userID");
  }
 

  console.log("profile ID", currentUserID);
 
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  let navigate = useNavigate(); 
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  // retrieve user profile
  const retrieveUserInfo = async () => {
    console.log("user info ", currentUserID);
    const url = "http://localhost:8080/api/users/profile/" + currentUserID;
    console.log("url ", url);
    const userProfile = await axios.get(url);
    console.log("userProfile response", userProfile);
    if (userProfile.status === 200) {
      setUsername(userProfile.data.profile.username); // todo needs to be changed later
      setBio(userProfile.data.profile.bio);
      console.log(userProfile);
    }
  } 

  useEffect(() => {
    retrieveUserInfo();
  })

  console.log("checking username is set", username, currentUserID, bio)

  return (
    <div>
      <Navigation></Navigation>
    <section className='profile-side'>
      {currentUserID === sessionStorage.getItem("userID") && 
        <button className='profile-logout' onClick={logout}>logout</button>} 
      <div className='profile-card'>          
        <h1>{username}</h1> 
        <p>{bio}</p> 
        {currentUserID === sessionStorage.getItem("userID") && 
          <button className='profile-edit' onClick={() => {navigate('/profile/edit')}}>edit profile</button>} 
        {currentUserID !== sessionStorage.getItem("userID") && 
          <button onClick={() => {navigate('/request/submit', {state: {requestee: currentUserID, requesteeUsername: username}})}}>submit request</button>}
      </div>
    </section>
    <section className='requests-side'>
      {currentUserID === sessionStorage.getItem("userID") && 
      <div>
        <h1>sent requests</h1>
        <DisplayRequests userID={sessionStorage.getItem("userID")} status={null}></DisplayRequests>        
      </div>}
      <h1>received requests</h1>
      <DisplayRequests userID={currentUserID} status={"Requested"}></DisplayRequests>
    </section>   
    </div>
  )
}

export default Profile