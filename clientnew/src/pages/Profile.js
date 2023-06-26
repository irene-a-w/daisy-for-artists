import React from 'react';
import axios from 'axios';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// TODO need to implement getting a specific users profile

const Profile = () => {
  const [searchString, setSearchString] = useState('');
  const [searchButton, setSearchButton] = useState(false);  

  let navigate = useNavigate(); 
  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

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
      {navigate('/foundusers', {state: {foundUsers: res}})}
    )
  }

  return (
    <div>
    <section className='profile'>
      <h1>username</h1>
      <p>bio</p>
    </section>
    <section className='requests'>
      <h1>requests</h1>
    </section>      
    <input type="text"
             placeholder="search for user"
             value={searchString}
             onChange={(event) => {setSearchString(event.target.value)}}></input>
    <button onClick={searchClicked}>search</button>
    <div>
      <button onClick={logout}>logout</button>
    </div>
    </div>
  )
}

export default Profile