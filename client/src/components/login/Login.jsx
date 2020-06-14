import React from "react";
import { Link } from "react-router-dom";

// CSS File
import "./Login.css";

export default function Login() {
  return (
    <div className='Login-wrapper'>
      <div className='image'>
        <img
          src={"https://i.ibb.co/2nsV84w/Login.jpg"}
          alt='Login Background not working'
          id='login-image'
        />
      </div>
      <div className='login-form'>
        <form>
          <div className='login-row-0'>
            <p>Sign In</p>
          </div>
          <div className='login-row-1'>
            <input type='email' placeholder='Email Address' id='email' />
          </div>
          <div className='login-row-2'>
            <input type='password' placeholder='Password' id='password' />
          </div>
          <div className='login-row-3'>
            <p>
              Not a registered member? Click{" "}
              <span id='click'>
                <Link to='/register'>here</Link>
              </span>{" "}
              to register
            </p>
          </div>
          <div className='login-row-4'>
            <input type='button' value='Log In' id='login-button' />
          </div>
        </form>
      </div>
    </div>
  );
}
