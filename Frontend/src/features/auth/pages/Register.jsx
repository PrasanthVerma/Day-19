import React from 'react'
import "../styles/form.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {useAuth} from "../hooks/useAuth.js"

const Register = () => {

  const { handleRegister, user, loading } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    handleRegister(username,email,password)
  }

  if(loading==true) {
    console.log("Loading...")
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <main>
        <div className="container">
          <h3>Register</h3>
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
                  setEmail(e.target.value)
                }}
                type="text"
                name="email"
                placeholder='Enter Email id' />
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
            <p>Already Have an Account <Link className="link" to="/login">Login</Link></p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Register
