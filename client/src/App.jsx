import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Import CSS File
import "./App.css";

// React Components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import Schedule from "./components/schedule/Schedule";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/customer/authentication/verify",
        {
          method: "POST",
          headers: { jwt_token: localStorage.customer_token },
        }
      );

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Switch>
          <Route
            exact
            path='/login'
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/' />
              )
            }
          />

          <Route exact path='/'>
            <Header setAuth={setAuth} />
            <Main />
          </Route>

          <Route exact path='/schedule'>
            <Schedule />
          </Route>
          <Route
            exact
            path='/register'
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
        </Switch>
      </header>
    </div>
  );
}

export default App;
