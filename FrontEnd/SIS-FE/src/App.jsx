import React, { useContext, useEffect } from 'react'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import './App.css'; // Import the CSS file
import { UserContext } from './context/UserContext';

const App = () => {

  return (
    <div>
      <Home/>
    </div>
  );
}

export default App