import React from 'react'
import { BrowserRouter as  Router,Routes, Route } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import SignupOTP from './Components/Signup/SignupOTP'
import SignupPassword from './Components/Signup/SignupPassword'
import Login from './Components/Login/Login'
import "./App.css"
import Forgot from './Components/Forget/Forgot'
import Reset from './Components/Forget/Reset'
import Dashboard from './Components/Dashboard'
import './index.css'
const App = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signupOTP" element={<SignupOTP/>}/>
          <Route path="/signuppass" element={<SignupPassword/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/reset-password/:id/:token" element={<Reset/>}/>
          <Route path = "/dashboard" element={<Dashboard/>}/>
        </Routes> 
      </Router>
  )
}

export default App
