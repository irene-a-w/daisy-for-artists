import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import axios from "axios";

const SubmitRequest = () => {
    const {state} = useLocation();
    const { requestee } = state;

    const [requestTitle, setRequestTitle] = useState('');
    const [requestDescription, setRequestDescription] = useState('');

    // send form
    const sendRequest = async () => {
        console.log("req reqee", requestee, sessionStorage.getItem("userID"));
        const url = "http://localhost:8080/api/requests/create"
        const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
        const createRequest = {title: requestTitle, description: requestDescription, 
          requester: sessionStorage.getItem("userID"), requesterUsername: sessionStorage.getItem("username"), requestee: requestee} 
        console.log("sent data", createRequest);   
        const requestResponse = await axios.post(url, createRequest, {headers: headers});
        console.log("request", requestResponse);
    }

    // on click create a form
  return (
    <div>
        <h1>request</h1>
        <p>title</p>
        <input
        value={requestTitle}
        onChange={(event) => {setRequestTitle(event.target.value)}}>
        </input>
        <p>description</p>
        <textarea 
        value={requestDescription}
        onChange={(event) => {setRequestDescription(event.target.value)}}>
        </textarea>
        <button onClick={sendRequest}>submit</button>
    </div>
  )
}

export default SubmitRequest