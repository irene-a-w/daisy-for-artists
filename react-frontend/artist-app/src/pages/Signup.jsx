import React from 'react'

const Signup = () => {
  return (
    <div className='login-container'>
      <label>WATERMELON</label>
      <form className='login-form'>
        <label className="input-description">email</label>
        <input type="text" className="input"></input>
        <label className="input-description">username</label>
        <input type="text" className="input"></input>
        <label className="input-description">password</label>
        <input type="password" className="input"></input>
        <p className="input-description">login</p>
        <button type="submit" className="submit">create account</button>
      </form>
    </div>
  )
}

export default Signup