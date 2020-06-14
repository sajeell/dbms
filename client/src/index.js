import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={false}>
      <Route exact path='/admin/login'>
        <AdminLogin />
      </Route>
      <Route exact path='/admin/register'>
        <AdminRegister />
      </Route>
      <Route>
        <App />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
