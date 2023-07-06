import './css/Navigation.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
    let navigate = useNavigate(); 
    const [searchString, setSearchString] = useState('');

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

  return (
    <nav className="navigation">
        <h1>daisy.</h1>
        <div className="nav-right">
            <div className="input-group">
                <input type="search" 
                className="form-control rounded" 
                placeholder="search for a user" 
                aria-label="Search" 
                aria-describedby="search-addon"
                value={searchString}
                onChange={(event) => {setSearchString(event.target.value)}}
                />
                <button type="button" 
                className="btn btn-outline-primary" 
                onClick={() => {handleSearch().then(res => 
                  {navigate('/users', {state: {foundUsers: res.filter(x => x["_id"] !== (sessionStorage.getItem("userID"))), searchStr: searchString}})}
              )}}>search</button>
            </div>            
            <Link className='nav-link' to="/profile" state={{currentUserID: sessionStorage.getItem("userID")}}>my profile</Link>
        </div>
    </nav>
  )
}

export default Navigation
