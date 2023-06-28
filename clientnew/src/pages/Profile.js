import React from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import DisplayRequests from '../components/DisplayRequests';

// TODO need to implement getting a specific users profile

const Profile = () => {
  const { state } = useLocation();
  const { currentUserID } = state;
  if (!currentUserID) {
     currentUserID = sessionStorage.getItem("userID");
  }
 

  console.log("profile ID", currentUserID);

  const [searchString, setSearchString] = useState('');
  const [searchButton, setSearchButton] = useState(false);  
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  let navigate = useNavigate(); 
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  // search for a user -> this should probably be moved to the nav bar component
  const handleSearch = async () => {
    const url = "http://localhost:8080/api/users/find"
    console.log("search str ", searchString);
    const searchResponse = await axios.get(url, 
      {params: {
        username: searchString
      }});
    console.log("searchres ", searchResponse.data)
    if (searchResponse.status === 200) {
      return searchResponse.data
    } else if (searchResponse.status === 404) {
      return []
    }      
  }

  const searchClicked = () => {
    setSearchButton(true);
  }

  // send the found users over to the linked page
  if (searchButton) {
    handleSearch().then(res => 
      {navigate('/users', {state: {foundUsers: res.filter(x => x["_id"] !== (sessionStorage.getItem("userID")))}})}
    )
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

  return (
    <div>
      {currentUserID === sessionStorage.getItem("userID") && 
      <div>
        <h1>your profile</h1>
        <button onClick={() => {navigate('/profile/edit')}}>edit profile</button>
        <button onClick={logout}>logout</button>
      </div>      
      }
    <section className='profile'>
    <h1>{username}</h1>
    <p>{bio}</p>
    </section>
    <section className='requests'>
      <h1>requests</h1>
    </section>      
    <input type="text"
             placeholder="search for user"
             value={searchString}
             onChange={(event) => {setSearchString(event.target.value)}}></input>
    <button onClick={searchClicked}>search</button>
    {currentUserID !== sessionStorage.getItem("userID") && 
    <div>
      <button onClick={() => {navigate('/request/submit', {state: {requestee: currentUserID}})}}>request</button>
    </div>
    }
    <h1>sent requests</h1>
    {currentUserID === sessionStorage.getItem("userID") && <DisplayRequests userID={sessionStorage.getItem("userID")} status={null}></DisplayRequests>}
    <h1>received requests</h1>
    <DisplayRequests userID={currentUserID} status={"Requested"}></DisplayRequests>
    </div>
  )
}

export default Profile