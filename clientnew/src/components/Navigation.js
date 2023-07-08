import './css/Navigation.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons"

const Navigation = () => {
    let navigate = useNavigate(); 
    const [notifications, setNotifications] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [notifCount, setNotifCount] = useState(0);
    const [viewNotifs, setviewNotifs] = useState(false);

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

    const retrieveNotifications = async () => {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
      const url = "http://localhost:8080/api/notifications/" + sessionStorage.getItem("userID");
      const notificationResponse = await axios.get(url, {headers: headers});
      if (notificationResponse.status === 200) {
        setNotifications(notificationResponse.data);
      }
    }

    async function deleteNotification(notificationID) {
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
      const url = "http://localhost:8080/api/notifications/delete/" + notificationID;
      await axios.delete(url, {headers: headers})
  }

    useEffect(() => {
      retrieveNotifications();
      setNotifCount(notifications.length);
    })

  return (
    <div>
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
              <FontAwesomeIcon icon={faBell} className='bell-icon' onClick={() => setviewNotifs(!viewNotifs)}/>  
              <p className='notification-count'>{notifCount}</p>              
            <Link className='nav-link' to="/profile" state={{currentUserID: sessionStorage.getItem("userID")}}>my profile</Link>
        </div>
    </nav>
    {viewNotifs && 
            <div className='display-notifs'>
              {notifications.map((notif) => (
                <div className='one-notif'>
                  <p onClick={() => deleteNotification(notif._id)}>X</p>
                  <h3>{notif.message}</h3>
                </div>
              ))}
            </div>}
    </div>
  )
}

export default Navigation;
