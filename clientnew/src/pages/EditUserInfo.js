import React from 'react';
import axios from "axios";

// allow user to edit bio, change username, password here
const EditUserInfo = () => {
  // create 3 functions to get patch request
  // need to use state to keep track
  const [newUsername, setUsername] = useState('');
  const [newPassword, setPassword] = useState('');
  const [newBio, setBio] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const token = localStorage.getItem("token")
  const headers = {
    'Authorization': 'Bearer ' + token
  }

  useEffect(() => {
    setErrorMsg('');
  }, [username, password])

  // send queries function -> display success message
  // each button will be defined to do a different query
  const handleUsernameChange = async (e) => { 
    const userID = localStorage.getItem("current user");
    const url = "http://localhost:8080/api/users/profile/edit/username/" + userID["id"];
    const newUsername = {username: newUsername}
    try {
      const newUsernameRequest = await axios.patch(url, newUsername, {headers: headers});
      if (newUsernameRequest.status === 200) {
        setErrorMsg('successfully changed');
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
    } else if (error.response?.status === 403) {
        setErrorMsg('username already in use');
    } else {
        setErrorMsg('change username Failed');
    }}
  }

  const handlePasswordChange = async (e) => { 
    const userID = localStorage.getItem("current user");
    const url = "http://localhost:8080/api/users/profile/edit/password/" + userID["id"];
    const newPassword = {password: newPassword}
    try {
      const newPasswordRequest = await axios.patch(url, newPassword, {headers: headers});
      if (newPasswordRequest.status === 200) {
        setErrorMsg('successfully changed');
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
    } else {
        setErrorMsg('change password Failed');
    }}
  }

  const handleBioChange = async (e) => { 
    const userID = localStorage.getItem("current user");
    const url = "http://localhost:8080/api/users/profile/edit/bio/" + userID["id"];
    const newBio = {bio: newBio}
    // changing bio is a little different .. i think should display the old bio values
    const newBioRequest = await axios.patch(url, newBio, {headers: headers});
    // once request is submitted, if successful, then just keep the input box with the bio values
  }

  return (
    <div>
      <section className='username'>
      <h1>change username</h1>
      <input type="text"
             value={newUsername}
             onChange={(event) => {setUsername(event.target.value)}}
             required/>
      <button>save</button>
      </section>
      <section className='password'>
      <h1>change password</h1>
      <input type="password"
             value={newPassword}
             onChange={(event) => {setPassword(event.target.value)}}
             required/>
      <button>save</button>
      </section>
      <section className='bio'>
      <input type="bio"
             value={newBio}
             onChange={(event) => {setBio(event.target.value)}}
             required/>
      <button>save</button>
      </section>
    </div>
  )
}

export default EditUserInfo