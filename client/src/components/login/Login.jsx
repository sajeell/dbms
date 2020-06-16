import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// CSS File
import "./Login.css";

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/customer/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("customer_token", parseRes.jwtToken);
        setAuth(true);
        alert("Logged in Successfully");
      } else {
        setAuth(false);
        alert(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

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
            <input
              type='email'
              placeholder='Email Address'
              id='email'
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className='login-row-2'>
            <input
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={handlePassword}
            />
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
            <input
              type='button'
              value='Log In'
              id='login-button'
              onClick={onSubmitForm}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
