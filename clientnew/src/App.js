import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from "./pages/EditProfile";
import DisplayUsers from "./pages/DisplayUsers";
import SubmitRequest from "./pages/SubmitRequest";
import Navigation from "./components/Navigation";
import Protected from "./Protected";
import './App.css';

function App() {
  // check that token is stored, probably need to do some error handling to make sure its cleared/added correctly
  const token = sessionStorage.getItem("token");
  console.log("app token" + token);
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Login />}></Route>
    //     <Route path='register' element={<Register />}></Route>
    //     <Route element={<Protected></Protected>}>
    //       <Route path='profile' element={<Profile />}></Route>
    //       <Route path='users' element={<DisplayUsers />}></Route>
    //       <Route path='request/submit' element={<SubmitRequest />}></Route>
    //       <Route path='profile/edit' element={<EditProfile />}></Route>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <Navigation></Navigation>
  );
}

export default App;
