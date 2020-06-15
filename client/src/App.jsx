import React, { useState, useCallback, useEffect } from "react";
import { Route } from "react-router-dom";

// Import CSS File
import "./App.css";

// React Components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Main from "./components/main/Main";
import Header from "./components/header/Header";

function App() {
  const [sourceCallBack, setSourceCallBack] = useState([]);
  const [destinationCallBack, setDestinationCallBack] = useState([]);
  const [dateCallBack, setDateCallBack] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const [schedules, setSchedules] = useState([]);
  const getSchdule = async () => {
    try {
      const body = { source, destination, date };
      const response = await fetch(`http://localhost:5000/routes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonData = await response.json(); // Parser
      setSchedules(jsonData);
    } catch (error) {
      console.error(error);
      console.log("Error in getting schedules");
    }
  };

  // useEffect(() => {
  //   getSchdule();
  // }, []);

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
          <div className='table-wrapper'>
            <table>
              <tbody id='all-routes-table'>
                <tr>
                  <th>ID</th>
                  <th>Route #</th>
                  <th>Bus #</th>
                  <th>Price</th>
                  <th>Seats Left</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Book</th>
                </tr>
                {schedules.forEach((schedule) => (
                  <tr>
                    <td>{schedule.id}</td>
                    <td>{schedule.bus_id}</td>
                    <td>{schedule.source_id}</td>
                    <td>{schedule.destination_id}</td>
                    <td>{schedule.date}</td>
                    <td>{schedule.timing}</td>
                    <td>{schedule.seat_price}</td>
                    <td id='book-seat-button'>Book</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Route>

        <Route exact path='/register'>
          <Register />
        </Route>
      </header>
    </div>
  );
}

export default App;
