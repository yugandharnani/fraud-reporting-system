import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <UserProvider>
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>
  </UserProvider>,
)
  