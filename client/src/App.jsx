import React, { useState, useCallback } from "react";
import { Route } from "react-router-dom";

// Import CSS File
import "./App.css";

// React Components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import Schedule from "./components/schedule/Schedule";

function App() {
  const [sourceCallBack, setSourceCallBack] = useState([]);
  const [destinationCallBack, setDestinationCallBack] = useState([]);
  const [dateCallBack, setDateCallBack] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const fetchSource = useCallback((n) => {
    setSource(n);
  }, setSourceCallBack);

  const fetchDestination = useCallback((n) => {
    setDestination(n);
  }, setDestinationCallBack);

  const fetchDate = useCallback((n) => {
    setDate(n);
  }, setDateCallBack);

  return (
    <div className='App'>
      <header className='App-header'>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Header />
          <Main
            getSource={fetchSource}
            getDestination={fetchDestination}
            getDate={fetchDate}
          />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/schedule'>
          <Schedule />
        </Route>
      </header>
    </div>
  );
}

export default App;
