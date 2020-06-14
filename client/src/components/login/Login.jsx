import React from "react";

// CSS File
import "./Login.css";

export default function Login() {
  return (
    <div className='Wrapper'>
      <div className='image'>
        <img
          src={"https://i.ibb.co/2nsV84w/Login.jpg"}
          alt='Login Background not working'
          id='image'
        />
      </div>
      <div className='login-form'>
        <form>
          <div className='row-0'>
            <p>Sign In</p>
          </div>
          <div className='row-1'>
            <input type='email' placeholder='Email Address' id='email' />
          </div>
          <div className='row-2'>
            <input type='password' placeholder='Password' id='password' />
          </div>
          <div className='row-3'>
            <p>
              Not a registered member? Click <span id='click'>here</span> to
              register
            </p>
          </div>
          <div className='row-4'>
            <input type='button' value='Log In' id='login-button' />
          </div>
        </form>
      </div>
    </div>
  );
}
