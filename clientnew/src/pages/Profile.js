import './css/Profile.css';

import React from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';
import DisplayRequests from '../components/DisplayRequests';

const Profile = () => {
  const { state } = useLocation();
  var currentUserID;
  if (!state) {
     currentUserID = sessionStorage.getItem("userID");
  } else{
     currentUserID = state.currentUserID; 
  }
  
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [sent, setViewSent] = useState(false);
  const [recieved, setViewRecieved] = useState(true);

  console.log("display", sent, recieved)

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

  const toggleRecieved = () => {
    setViewSent(false);
    setViewRecieved(true);
  }

  const toggleSent = () => {
    setViewSent(true);
    setViewRecieved(false);
  }

  useEffect(() => {
    retrieveUserInfo();
  })

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
          <div>
            <button className='profile-edit' onClick={() => {navigate('/profile/edit')}}>edit profile</button>
            <button className='toggle-requests' onClick={toggleRecieved}>recieved requests</button>
            <button className='toggle-requests' onClick={toggleSent}>sent requests</button>
          </div>} 
        {currentUserID !== sessionStorage.getItem("userID") && 
          <button className='submit-request-button' 
          onClick={() => {navigate('/request/submit', {state: {requestee: currentUserID, requesteeUsername: username}})}}>submit request</button>}
      </div>
    </section>
    <section className='requests-side'>
      {currentUserID === sessionStorage.getItem("userID") && sent &&
      <div>
        <h1 className='request-headers'>sent requests</h1>
        <DisplayRequests className='sent-requests' userID={sessionStorage.getItem("userID")} status={null}></DisplayRequests>        
      </div>}
        {
          recieved && 
          <div>
            <h1 className='request-headers'>received requests</h1>
            <div className='request-cols'>
              <DisplayRequests id='col1' userID={currentUserID} status={"Requested"}></DisplayRequests>
              <DisplayRequests id='col2' userID={currentUserID} status={"Accepted"}></DisplayRequests>
              <DisplayRequests id='col3' userID={currentUserID} status={"Started"}></DisplayRequests>
              <DisplayRequests id='col4' userID={currentUserID} status={"Completed"}></DisplayRequests>                
            </div>
          </div>          
        }
    </section>   
    </div>
  )
}

export default Profile