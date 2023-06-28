import React, { useState, useEffect } from 'react'

import axios from 'axios';

const DisplayRequests = (props) => {
    // console.log("display req", props.userID, props.status)
    const [requests, setRequests] = useState([]);
    // should probably pass in the user id so it can be reusable for both requestee/requester

    // send api request to retrieve all of the requests
    const handleRequests = async () => {
        var url = "http://localhost:8080/api/requests/";
        if (props.status) {
            // console.log("enters status")
            url += "status/" + props.userID;
            const requestData = {status: props.status};
            const requestResponse = await axios.get(url, {params: requestData});
            // console.log(requestResponse)
            if (requestResponse.status === 200) {
                setRequests(requestResponse.data);
            }
        } else {
            url += props.userID;
            const requestResponse = await axios.get(url);
            // console.log(requestResponse)
            if (requestResponse.status === 200) {
                setRequests(requestResponse.data);
            }
        }
    }

    useEffect(() => {
        // console.log("display req", props.userID, props.status)
        handleRequests();
    })

    // yay working!
    async function requestStatus (requestID, requesteeID, status) {
        const url = "http://localhost:8080/api/requests/updatestatus/" + requestID;
        await axios.patch(url, {status: status, requestee: requesteeID});
    }

    return (
        <div>
        {requests.map((request) => (
            <div>
               <h1>{request.title}</h1> 
               {props.status && <p>{request.requesterUsername}</p>}
               <p>{request.status}</p>
                {props.status === "Requested" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => requestStatus(request._id, request.requestee, "accepted")}>accept</button>
                <button onClick={() => requestStatus(request._id, request.requestee, "declined")}>decline</button>
                </div>
                }

                {props.status === "accepted" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => requestStatus(request._id, request.requestee, "started")}>started</button>
                </div>
                }

                {props.status === "started" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => requestStatus(request._id, request.requestee, "completed")}>completed</button>
                </div>
                }
            </div>
        ))}
        </div>
    )
}

export default DisplayRequests