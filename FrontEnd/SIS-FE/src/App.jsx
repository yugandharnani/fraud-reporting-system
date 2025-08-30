import React, { useContext, useEffect } from 'react'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import './App.css'; // Import the CSS file
import { UserContext } from './context/UserContext';

const App = () => {
      const {isLoggedIn,setIsLoggedIn,setUser} = useContext(UserContext);
    // useEffect(() => {
    //   const checkAuth = async () => {
    //     console.log("checking auth");
        
    //     try {
    //     console.log("checking auth tryblock1");

    //       const res = await axios.get('http://localhost:5000/users/profile',{ withCredentials: true } );
    //     console.log("checking auth tryblock2",res);
  
    //       // setUser(res.data.user);
    //       setIsLoggedIn(true);
    //     } catch (err) {
    //       console.log("Not logged in");
    //       setUser(null);
    //       setIsLoggedIn(false);
    //     }
    //   };
  
    //   checkAuth();
    // }, []);
  return (
    <BrowserRouter>
      <div className="app-container">
        <Home />
      </div>
    </BrowserRouter>
  )
}

export default App