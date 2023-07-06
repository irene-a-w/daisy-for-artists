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
        <div className='request-group'>
        {props.status && <h1>{props.status.toLowerCase()}</h1>}
        {requests.map((request, index) => (
            <div className='request-info'>
               <h1>{request.title}</h1> 
               <p className='request-description' onClick={() => {toggleFunction(index)}}>view description</p>
               {toggle[index] && <p>{requests[index].description}</p>}
               {props.status && request.requestee !== sessionStorage.getItem("userID") && <p>requested by: {request.requesterUsername}</p>}
               <p>status: {request.status.toLowerCase()}</p>
                {props.status === "Requested" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => requestStatus(request._id, request.requestee, "Accepted")}>accept</button>
                <button onClick={() => requestStatus(request._id, request.requestee, "Declined")}>decline</button>
                </div>
                }

                {props.status === "Accepted" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => requestStatus(request._id, request.requestee, "Started")}>started</button>
                </div>
                }

                {props.status === "Started" && request.requestee === sessionStorage.getItem("userID") &&
                <div>
                <button onClick={() => requestStatus(request._id, request.requestee, "Completed")}>completed</button>
                </div>
                }
            </div>
        ))}
        </div>
    )
}

export default DisplayRequests