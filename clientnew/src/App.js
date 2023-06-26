import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DisplayUsers from "./pages/DisplayUsers";
import Protected from "./Protected";
import './App.css';

function App() {
  // check that token is stored, probably need to do some error handling to make sure its cleared/added correctly
  const token = localStorage.getItem("token");
  console.log("app token" + token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route element={<Protected></Protected>}>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='foundusers' element={<DisplayUsers />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
