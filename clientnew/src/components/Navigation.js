import './Navigation.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
    // let navigate = useNavigate(); 

    const [searchString, setSearchString] = useState('');
    const [searchButton, setSearchButton] = useState(false);  

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
    
    // if (searchButton) {
    //     handleSearch().then(res => 
    //         {navigate('/users', {state: {foundUsers: res.filter(x => x["_id"] !== (sessionStorage.getItem("userID")))}})}
    //     )
    // }

  return (
    <nav className="navigation">
        <h1>daisy.</h1>
        <div className="right">
            <input type="text"
            placeholder="search for a user"
            value={searchString}
            onChange={(event) => {setSearchString(event.target.value)}}/>
            <button onClick={() => setSearchButton(true)}>search</button>
            <a>my profile</a>
        </div>
        {/* <Link to="/profile" state={{currentUserID: sessionStorage.getItem("userID")}}>my profile</Link> */}
    </nav>
  )
}

export default Navigation
