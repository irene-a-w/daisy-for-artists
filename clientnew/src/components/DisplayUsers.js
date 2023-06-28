import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom';

// TODO replace headers with link to respective users profile
const DisplayUsers = () => {
    console.log("in display users");
    const { state } = useLocation();
    const { foundUsers } = state;
    let navigate = useNavigate();

    console.log("display ", foundUsers);

    return (
        <>
        {foundUsers.map((foundUsers) => (
            <div onClick={() =>navigate('/profile', {state: {currentUserID: foundUsers._id}})}>
               <h1>{foundUsers.username}</h1> 
            </div>
        ))}
        </>
    )
}

export default DisplayUsers