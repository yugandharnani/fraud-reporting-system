import axios from 'axios';
import React, { useContext, useState } from 'react'
import './login.css'
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import api from '../pages/api.js';
const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const {user,setUser,isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const changeHandler =(e)=>{
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const respone = await api.post('http://localhost:5000/users/login', userDetails,{ withCredentials: true } );
            console.log("response=login", respone);
            alert(respone.data.message);
            setIsLoggedIn(true)
            setUser({email:respone.data.email,username:respone.data.username})
            
            navigate('/'); // Redirect to home page after successful login
        } catch (error) {
            console.log("error",error.response);
        }
        setUserDetails({ email: "", password: "" });
    }
    
  return (
     <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
          <h1>Login</h1>
          <input type="text" name='email' value={userDetails.email} onChange={changeHandler} placeholder="Email" />
          <input type="password" name='password' value={userDetails.password} onChange={changeHandler} placeholder="Password" />
          <button type='submit'>Login</button>
      </form>
  </div>
  )
}

export default Login