import React, { useState, useEffect } from "react";
import AddStation from "./AddStation";
import AddBus from "./AddBus";
import AddRoute from "./AddRoute";

export default function AdminDashboard() {
  const [station, setStation] = useState([]);
  const [buses, setBuses] = useState([]);

  const getStations = async () => {
    try {
      const getStation = await fetch("http://localhost:5000/station", {
        method: "GET",
      });
      const parseData = await getStation.json();
      setStation(parseData);
    } catch (error) {
      console.error(error);
      console.error("Error while getting stations in add route component");
    }
  };

  const getBuses = async () => {
    try {
      const getBus = await fetch("http://localhost:5000/bus", {
        method: "GET",
      });
      const parseData = await getBus.json();
      setBuses(parseData);
    } catch (error) {
      console.error(error);
      console.error("Error while getting buses in add route component");
    }
  };

  useEffect(() => {
    getStations();
  }, []);

  useEffect(() => {
    getBuses();
  }, []);
  return (
    <div className='AdminDashboard-wrapper'>
      <header className='adminDashboard-header'>
        <div className='header-logo'>
          <a href='/admin/dashboard'>
            <img
              src='https://i.ibb.co/47dwHKJ/toppng-com-bus-clipart-logo-travel-bus-logo-832x423.png'
              alt='logo'
              id='header-image'
            ></img>
          </a>
        </div>
        <div className='header-buttons'>
          <a href='#add/station'>
            <p id='admin-header-1'>Add Station</p>
          </a>
          <a href='#add/bus'>
            <p id='admin-header-2'>Add Bus</p>
          </a>
          <a href='#add/route'>
            <p id='admin-header-3'>Add Route</p>
          </a>
          <a href='#view/station'>
            <p id='admin-header-4'>View Stations</p>
          </a>
          <a href='#view/bus'>
            <p id='admin-header-5'>View Buses</p>
          </a>
          <a href='#view/route'>
            <p id='admin-header-6'>View Routes</p>
          </a>
        </div>
      </header>
      <div id='add/station'>
        <AddStation />
      </div>
      <div id='add/bus'>
        <AddBus />
      </div>
      <div id='add/route'>
        <AddRoute />
      </div>
      <div id='view/station' className='adminDashboard-stations'>
        <div className='stations-heading'>
          <h2>VIEW STATIONS</h2>
        </div>
        <table>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>CITY</th>
          </tr>
          {station.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </table>
      </div>
      <div id='view/bus' className='adminDashboard-buses'>
        <div className='stations-heading'>
          <h2>VIEW BUSES</h2>
        </div>
        <table>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>CAPACITY</th>
            <th>STATUS</th>
          </tr>
          {buses.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={item.picture_link}
                  alt='Snap of bus not found'
                  style={{ width: 150 }}
                ></img>
              </td>
              <td>{item.seats}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
