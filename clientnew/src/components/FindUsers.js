// import React from 'react';
// import axios from 'axios'
// ;
// import { useState } from "react";
// import { Navigate } from 'react-router-dom';

// const FindUsers = (props) => {
//     console.log("findusers search ", props.searchvalue);
//     const [users, setUsers] = useState([]);

//     const handleSearch = async () => {
//       const url = "http://localhost:8080/api/users/find"
//       const searchUsername = {username: props.searchvalue};
//       const searchResponse = await axios.get(url, searchUsername);
//       console.log("searchres ", searchResponse)
//       console.log(searchResponse)
//       if (searchResponse.status === 200) {
//           setUsers(searchResponse.data);
//       } else if (searchResponse.status === 404) {
//           setUsers([]);
//       }      
//     }

//     handleSearch();

//     console.log("found users ", users);
//     // navigate to display user page
//   return (
//     <Navigate to='/foundusers'></Navigate>
//   )
// }

// export default FindUsers
// TODO delete later dont need thsi