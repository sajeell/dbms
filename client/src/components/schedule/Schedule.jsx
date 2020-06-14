import React from "react";

import "./Schedule.css";

export default function Schedule() {
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
          <tr>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td>Hahahahah</td>
            <td id='book-seat-button'>Book</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
