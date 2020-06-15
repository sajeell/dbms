import React, { useState, useEffect } from "react";

import "./Schedule.css";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const getSchdule = async () => {
    try {
      const source = 1;
      const destination = 2;
      const date = "2020-06-15";
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

  useEffect(() => {
    getSchdule();
  }, []);

  return (
    <div className='Wrapper'>
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
              <td>{}</td>
              <td>{}</td>
              <td id='book-seat-button'>Book</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
