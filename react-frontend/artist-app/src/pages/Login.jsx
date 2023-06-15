import React from 'react'

const Login = () => {
  return (
    <div className='login-container'>
      <label>WATERMELON</label>
      <form className='login-form'>
        <label className="input-description">username</label>
        <input type="text" className="input"></input>
        <label className="input-description">password</label>
        <input type="password" className="input"></input>
        <p className="input-description">create an account</p>
        <button type="submit" className="submit">login</button>
      </form>
    </div>
  )
}

export default Login