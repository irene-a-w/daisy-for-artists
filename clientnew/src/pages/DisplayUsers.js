import React from 'react'

import { useLocation } from 'react-router-dom';

const DisplayUsers = () => {
    console.log("in display users");
    const {state} = useLocation();
    const { foundUsers } = state;
    console.log("display ", foundUsers);
    return (
        <>
        {foundUsers.map((foundUsers) => (
            <h1>{foundUsers.username}</h1>
        ))}
        </>
    )
}

export default DisplayUsers