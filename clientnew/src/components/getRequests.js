import { useState } from 'react'
import axios from 'axios';

async function getRequests(props) {
    console.log(props.userId, props.status);
    const [requests, setRequests] = useState([]);
    // should probably pass in the user id so it can be reusable for both requestee/requester

    // send api request to retrieve all of the requests
    const url = "http://localhost:8080/api/requests"
    const statusData = {requester: props.userId};
    if (props.status) {
        url += "/status";
        statusData["status"] = props.status;
        const requestResponse = await axios.get(url, statusData);
        console.log(requestResponse)
        if (requestResponse.status === 200) {
            setRequests(requestResponse.data);
        }
    } else {
        const requestResponse = await axios.get(url, propsStatus);
        console.log(requestResponse)
        if (requestResponse.status === 200) {
            setRequests(requestResponse.data);
        }
    }
    
    return requests
}

export default getRequests