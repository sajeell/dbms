import React, { useState, useEffect } from "react";

import "./Schedule.css";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const getSchdule = async () => {
    try {
      const source = parseInt(window.localStorage.getItem("source_id"));
      const destination = parseInt(
        window.localStorage.getItem("destination_id")
      );
      const date = window.localStorage.getItem("date");
      const body = { source, destination, date };
      const response = await fetch(
        `http://localhost:5000/routes/get-schedules`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

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
            <th>Bus #</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Time</th>
            <th>Date</th>
            <th>Price</th>
            <th>Book</th>
          </tr>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.BusId}</td>
              <td>{schedule.Source.name}</td>
              <td>{schedule.Destination.name}</td>
              <td>{schedule.time}</td>
              <td>{schedule.date}</td>
              <td>{schedule.seat_price}</td>
              <td id='book-seat-button'>Book</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
