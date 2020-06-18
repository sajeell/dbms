import React, { useState } from "react";

import "./Admin.css";

export default function AddBus() {
  const [seats, setSeats] = useState(0);
  const [pictureLink, setPictureLink] = useState("");

  const handleSeats = (e) => {
    setSeats(e.target.value);
  };

  const handlePictureLink = (e) => {
    setPictureLink(e.target.value);
  };

  const addBusForm = async () => {
    try {
      if (seats < 1) {
        alert("Invalid Capacity");
        return;
      }
      const body = { seats, pictureLink };
      const response = await fetch("http://localhost:5000/bus", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      console.log(parseData);
      alert("Bus has been Posted");
    } catch (error) {
      console.error(error);
      console.error("Error in posting Bus");
    }
  };

  return (
    <div className='addBus-wrapper'>
      <form>
        <div className='addBus-row-0'>
          <h4>Add Bus</h4>
        </div>
        <div className='addBus-row-1'>
          <input
            type='number'
            value={seats}
            onChange={handleSeats}
            placeholder='Capacity'
            id='bus-capacity'
          />
        </div>
        <div className='addBus-row-2'>
          <input
            type='text'
            value={pictureLink}
            onChange={handlePictureLink}
            placeholder='Picture Link'
            id='picture-link'
          />
        </div>
        <div className='addBus-row-3'>
          <input type='submit' id='bus-submit' onClick={addBusForm} />
        </div>
      </form>
    </div>
  );
}
