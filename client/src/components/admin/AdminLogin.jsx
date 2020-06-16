import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// CSS File
import "./Admin.css";

export default function AdminLogin({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/admin/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.adminjwtToken) {
        // setAuth(true);
        localStorage.setItem("admin_token", parseRes.adminjwtToken);
        alert("Admin Logged in Successfully");
        window.location.replace("/admin/dashboard");
      } else {
        // setAuth(false);
        alert(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  function handleEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  return (
    <div className='Admin-login-wrapper'>
      <div className='image'>
        <img
          src={"https://i.ibb.co/2nsV84w/Login.jpg"}
          alt='Register Background not working'
          id='admin-login-image'
        />
      </div>
      <div className='admin-login-form'>
        <form>
          <div className='admin-login-row-0'>
            <p>Sign In</p>
          </div>
          <div className='admin-login-row-1'>
            <input
              type='email'
              placeholder='Email Address'
              id='email'
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className='admin-login-row-2'>
            <input
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className='admin-login-row-3'>
            <p>
              Not a registered member? Click{" "}
              <span id='click'>
                <Link to='/admin/register'>here</Link>
              </span>{" "}
              to register
            </p>
          </div>
          <div className='admin-login-row-4'>
            <input
              type='button'
              value='Log In'
              id='admin-login-button'
              onClick={onSubmitForm}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
