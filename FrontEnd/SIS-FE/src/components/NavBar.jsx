import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const NavBar = () => {
    const navigate = useNavigate();
    const {user,isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    
        const handleLogout = async() => {
          const response = await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
        setIsLoggedIn(false);
        navigate('/login');
    };




  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-right">
        {!isLoggedIn ?(
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            </div>
        ):(
           <div>
            <span className="welcome-msg">Welcome, {user?.username || "User"}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        )}
        
        
      </div>
    </div>
  )
}

export default NavBar