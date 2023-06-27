import React from 'react'

const RequestStatus = async (requestID, requesteeID, requestStatus) => {
    // props = requestid and requesteeid
    // need to pass in REQUESTEE id to headers
    const url = "http://localhost:8080/api/requests/updatestatus/" + requestID;
    const statusResponse = await axios.patch(url, {status: requestStatus, requestee: requesteeID});
}

export default RequestStatus