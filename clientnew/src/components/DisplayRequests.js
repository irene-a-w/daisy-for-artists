import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './css/DisplayRequests.css'

const DisplayRequests = (props) => {
    // console.log("display req", props.userID, props.status)
    const [requests, setRequests] = useState([]);
    const [toggle, setToggle] = React.useState({});

    function toggleFunction(index) {
      setToggle({
        ...toggle,
        [index]: !toggle[index],
      });
    }

    // send api request to retrieve all of the requests
    const handleRequests = async () => {
        var url = "http://localhost:8080/api/requests/";
        if (props.status) {
            url += "status/" + props.userID;
            const requestData = {status: props.status};
            const requestResponse = await axios.get(url, {params: requestData});
            if (requestResponse.status === 200) {
                setRequests(requestResponse.data);
            }
        } else {
            url += props.userID;
            const requestResponse = await axios.get(url);
            if (requestResponse.status === 200) {
                setRequests(requestResponse.data);
            }
        }
    }

    async function deleteRequest(requestID) {
        console.log("delete", requestID);
        const url = "http://localhost:8080/api/requests/delete/" + requestID;
        await axios.delete(url, {params: {userID: sessionStorage.getItem("userID")}})
    }

    useEffect(() => {
        handleRequests();
    })

    async function requestStatus (requestID, requesteeID, status) {
        const url = "http://localhost:8080/api/requests/updatestatus/" + requestID;
        await axios.patch(url, {status: status, requestee: requesteeID});
    }

    async function createNotification (requesterID, status) {
        const url = "http://localhost:8080/api/notifications/create"     
        const headers = {
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
          const notifInfo = {userID: requesterID, message: sessionStorage.getItem("username") + ' has ' + status.toLowerCase() + ' your request.'} 
          await axios.post(url, notifInfo, {headers: headers});
      }
    
    function reqEvent (requestID, requesterID, requesteeID, status) {
        requestStatus(requestID, requesteeID, status);
        createNotification(requesterID, status);
    }

    return (
        <div className='request-group'>
        {props.status && <h1>{props.status.toLowerCase()}</h1>}
        {requests.map((request, index) => (
            <div className='request-info'>
               <h1>{request.title}</h1> 
               <p className='request-description' onClick={() => {toggleFunction(index)}}>view description</p>
               {toggle[index] && <p>{requests[index].description}</p>}
               {props.status && <p>requested by: {request.requesterUsername}</p>}
               {!props.status && <p>request sent to: {request.requesteeUsername}</p>}
               <p>status: {request.status.toLowerCase()}</p>
                {props.status === "Requested" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => reqEvent(request._id, request.requester, request.requestee, "Accepted")}>accept</button>
                <button onClick={() => reqEvent(request._id, request.requester, request.requestee, "Declined")}>decline</button>
                </div>
                }

                {props.status === "Accepted" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => reqEvent(request._id, request.requester, request.requestee, "Started")}>started</button>
                </div>
                }

                {props.status === "Started" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => reqEvent(request._id, request.requester, request.requestee, "Completed")}>completed</button>
                </div>
                }
                {props.userID === sessionStorage.getItem("userID") && 
                (request.status === 'Declined' || request.status === 'Requested' || request.status === 'Completed')
                && <p className='delete-request' onClick={() => deleteRequest(request._id)}>X</p>}
            </div>
        ))}
        </div>
    )
}

export default DisplayRequests