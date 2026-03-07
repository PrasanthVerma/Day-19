import React from 'react'
import "../styles/form.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import{useAuth} from "../hooks/useAuth.js"

const Login = () => {

  const {handleLogin,user,loading} = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
      handleLogin(username,password)
    
  }
  return (
    <main>
      <div className="container">
        <h3>Login</h3>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              onInput={(e) => {
                setUsername(e.target.value)
              }}
              type="text"
              name='username'
              placeholder='Enter Username' />
            <input
              onInput={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              name="password"
              id="password"
              placeholder='Enter Password' />
            <button type="submit">submit
            </button>
          </form>
        </div>
        <div className="link-text">
          <p>Don't Have an Account <Link className="link" to="/register">Register</Link></p>
        </div>
      </div>

    </main>
  )
}

export default Login
