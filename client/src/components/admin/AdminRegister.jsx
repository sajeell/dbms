import React from "react";
import { Link } from "react-router-dom";

// CSS File
import "./Admin.css";

export default function AdminRegister() {
  return (
    <div className='Register-wrapper'>
      <div className='image'>
        <img
          src={"https://i.ibb.co/2nsV84w/Login.jpg"}
          alt='Login Background not working'
          id='register-image'
        />
      </div>
      <div className='register-form'>
        <form>
          <div className='register-row-0'>
            <p>Register</p>
          </div>
          <div className='register-row-01'>
            <input type='text' placeholder='Full Name' id='name' />
          </div>
          <div className='register-row-1'>
            <input type='email' placeholder='Email Address' id='email' />
          </div>
          <div className='register-row-2'>
            <input type='password' placeholder='Password' id='password' />
          </div>
          <div className='register-row-3'>
            <p>
              Already a registered member? Click{" "}
              <span id='click'>
                <Link to='/admin/login'>here</Link>
              </span>{" "}
              to login
            </p>
          </div>
          <div className='register-row-4'>
            <input type='button' value='Register' id='register-button' />
          </div>
        </form>
      </div>
    </div>
  );
}
