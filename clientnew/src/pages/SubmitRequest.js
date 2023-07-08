import './css/SubmitRequest.css';
import Navigation from '../components/Navigation';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const SubmitRequest = () => {
    let navigate = useNavigate(); 
    const {state} = useLocation();
    const { requestee, requesteeUsername } = state;

    const [requestTitle, setRequestTitle] = useState('');
    const [requestDescription, setRequestDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // send form
    const sendRequest = async () => {
        if (requestTitle === '' || requestDescription === '') {
          setErrorMsg('please fill out all fields.')
        } else {
          console.log("req reqee", requestee, sessionStorage.getItem("userID"));
          const url = "http://localhost:8080/api/requests/create"
          const headers = {
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
          const createRequest = {title: requestTitle, description: requestDescription, 
            requester: sessionStorage.getItem("userID"), requesterUsername: sessionStorage.getItem("username"), requestee: requestee, 
            requesteeUsername: requesteeUsername} 
          console.log("sent data", createRequest);   
          const requestResponse = await axios.post(url, createRequest, {headers: headers});
          console.log("request", requestResponse);
          setErrorMsg('successfully submitted');
        }
    }

    const createNotification = async () => {
      const url = "http://localhost:8080/api/notifications/create"     
      const headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
        const notifInfo = {userID: requestee, message: sessionStorage.getItem("username") + ' has sent a new request.'} 
        await axios.post(url, notifInfo, {headers: headers});
    }

    const submitRequestEvent = async () => {
      sendRequest();
      createNotification();
    }

    useEffect(() => {
      setErrorMsg('');
    }, [requestTitle, requestDescription])

  return (
    <div>
      <Navigation />
      <div className='submit-request'>
          <h1>new request</h1>
          <div>
            <p className='submit-request-title'>title</p>
            <input
            value={requestTitle}
            onChange={(event) => {setRequestTitle(event.target.value)}}>
            </input>          
          </div>
        <div>
            <p className='submit-request-desc'>description</p>
            <textarea
            value={requestDescription}
            onChange={(event) => {setRequestDescription(event.target.value)}}>
            </textarea>     
        </div>
        <button onClick={submitRequestEvent}>submit</button>  
        <p className='submit-request-error'>{ errorMsg }</p>
      </div>
      <button className='submit-request-return' onClick={()=> {navigate('/profile', {state: {currentUserID: requestee}})}}>return to profile</button>
    </div>
  )
}

export default SubmitRequest