import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// CSS File
import "./Register.css";

export default function Register({ setAuth }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/customer/authentication/register",
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
        alert("Customer Registered Successfully");
      } else {
        setAuth(false);
        console.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

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
            <input
              type='text'
              placeholder='Full Name'
              id='name'
              value={name}
              onChange={handleName}
            />
          </div>
          <div className='register-row-1'>
            <input
              type='email'
              placeholder='Email Address'
              id='email'
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className='register-row-2'>
            <input
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className='register-row-3'>
            <p>
              Already a registered member? Click{" "}
              <span id='click'>
                <Link to='/login'>here</Link>
              </span>{" "}
              to login
            </p>
          </div>
          <div className='register-row-4'>
            <input
              type='button'
              value='Register'
              id='register-button'
              onClick={onSubmitForm}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
