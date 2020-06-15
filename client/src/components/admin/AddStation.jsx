import React, { useState } from "react";

import "./Admin.css";

export default function AddStation() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const addStationForm = async () => {
    try {
      const body = { name, city, address };
      const response = await fetch("http://localhost:5000/station", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      alert(parseData);
    } catch (error) {
      console.error(error);
      console.error("Error in posting station");
    }
  };

  return (
    <div className='AddStation-wrapper'>
      <form>
        <div className='addstation-row-0'>
          <h4>Add Station</h4>
        </div>
        <div className='addstation-row-1'>
          <input
            type='text'
            value={name}
            onChange={handleName}
            placeholder='Name of the Station'
            id='station-name'
          />
        </div>
        <div className='addstation-row-2'>
          <input
            type='text'
            value={city}
            onChange={handleCity}
            placeholder='City'
            id='city'
          />
        </div>
        <div className='addstation-row-2'>
          <input
            type='text'
            value={address}
            onChange={handleAddress}
            placeholder='address'
            id='address'
          />
        </div>
        <div className='addstation-row-3'>
          <input type='submit' id='station-submit' onClick={addStationForm} />
        </div>
      </form>
    </div>
  );
}
