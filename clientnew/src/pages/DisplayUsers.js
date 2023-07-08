import './css/DisplayUsers.css'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const DisplayUsers = () => {
    console.log("in display users");
    const { state } = useLocation();
    const { foundUsers, searchStr } = state;
    let navigate = useNavigate();

    console.log("display ", foundUsers);

    return (
        <div className='display-users'>
        <Navigation />
            <div className='display-users-res'>
                <h1>search results for '{searchStr}'</h1>
                {foundUsers.map((foundUsers) => (
                    <div className='display-user-card' onClick={() =>navigate('/profile', {state: {currentUserID: foundUsers._id}})}>
                    <h3>{foundUsers.username}</h3> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayUsers