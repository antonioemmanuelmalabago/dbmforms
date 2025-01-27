import React, { useState } from 'react'
import dbmLogo from '../../assets/dbm.png'
import Login from '../../forms/Login'
import Register from '../../forms/Register'
import dbmFacade from '../../assets/dbmFacade.jpg'
import './Home.css'

const Homepage = () => {
  const [mode, setMode] = useState('Login')

  const toggleMode = () => setMode(mode === 'Login' ? 'Register' : 'Login')

  return (
    <div className="home-container">
      <div className="main-container">
        <div className="left-container">
          <img src={dbmLogo} alt="Department of Budget and Management Logo" />
          <h1>Form Submission Portal</h1>
          <h3>(SRI and Gratuity Pay)</h3>
        </div>
        <div className="right-container">
          {mode === 'Login' ? <Login /> : <Register />}
          <p className="subtitle-text">
            {mode === 'Login'
              ? "Don't have an account yet?"
              : 'Already have an account?'}{' '}
            <button onClick={toggleMode} className="link-button">
              {mode === 'Login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
      <img
        src={dbmFacade}
        alt="DBM Facade Image"
        className="dbm-facade-image"
      />
    </div>
  )
}

export default Homepage
