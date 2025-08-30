import React, { useContext, useEffect } from 'react'
import Signup from '../components/Signup'
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import FRSHome from './FRSHome'
import { UserContext } from '../context/UserContext'
import CreateCase from './CreateCase'
import axios from 'axios'



const Home = () => {
    const {isLoggedIn,setIsLoggedIn,setUser} = useContext(UserContext);
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get('http://localhost:5000/users/profile',{ withCredentials: true } );
          // setUser(res.data.user);
          console.log("reload=data",res);
          setUser({email:res.data.email,username:res.data.username})
          setIsLoggedIn(true);
        } catch (err) {
          setUser(null);
          setIsLoggedIn(false);
        }
      };
  
      checkAuth();
    }, []);
  return (
    <div>
       
            <NavBar />
            <Routes>
              {isLoggedIn &&(
                <>
                <Route path="/" element={<FRSHome/>} />
                <Route path="/createcase" element={<CreateCase/>} />
                </>
              )}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
    </div>
  )
}

export default Home