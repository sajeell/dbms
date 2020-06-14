import React from "react";

// CSS File
import "./Register.css";

export default function Register() {
  return (
    <div className='Wrapper'>
      <div className='image'>
        <img
          src={"https://i.ibb.co/2nsV84w/Login.jpg"}
          alt='Login Background not working'
          id='image'
        />
      </div>
      <div className='register-form'>
        <form>
          <div className='row-0'>
            <p>Register</p>
          </div>
          <div className='row-01'>
            <input type='text' placeholder='Full Name' id='name' />
          </div>
          <div className='row-1'>
            <input type='email' placeholder='Email Address' id='email' />
          </div>
          <div className='row-2'>
            <input type='password' placeholder='Password' id='password' />
          </div>
          <div className='row-3'>
            <p>
              Already a registered member? Click <span id='click'>here</span> to
              login
            </p>
          </div>
          <div className='row-4'>
            <input type='button' value='Register' id='register-button' />
          </div>
        </form>
      </div>
    </div>
  );
}
