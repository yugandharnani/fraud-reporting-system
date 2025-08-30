import React, { useState } from 'react'
import axios from 'axios'
import './signup.css';
import { useNavigate,Link } from 'react-router-dom';
const Signup = () => {
    const [userDetails,setUserDetails] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const changeHandler =(e)=>{
        const {name,value}=e.target;
        setUserDetails({...userDetails,[name]:value})  
    }
    
    const submitHandler =async (e)=>{
        e.preventDefault();
     try {
        const res=await axios.post('http://localhost:5000/users/signup',userDetails,{ withCredentials: true });
        alert(res.data.message)
        navigate('/login'); 
     } catch (error) {
    if (error.response && error.response.data) {
        const backendMsg = error.response.data.error || error.response.data.message || "Unknown error";
        alert(backendMsg);
    } else {
        alert("An error occurred");
    }
}
      setUserDetails({username:"",
        email:"",
        password:""})  
    }
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submitHandler}>
          <h1>Signup</h1>
          <input type="text" name='username' value={userDetails.username} onChange={changeHandler} placeholder='UserName' />
          <input type="text" name='email' value={userDetails.email} onChange={changeHandler} placeholder='email' />
          <input type="password" name='password' value={userDetails.password} onChange={changeHandler} placeholder='password'  />
          <button type='submit'>Signup</button>
          <p>Have an account? <Link to="/login">Login</Link></p>
      </form>
  </div>
  )
}

export default Signup