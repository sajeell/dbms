import React, {useState, useEffect} from 'react';

import './Admin.css';

export default function ViewArchived() {
  const [archived, setArchived] = useState([]);
  const getArchived = async () => {
    try {
      const response = await fetch('http://localhost:5000/archive', {
        method: 'GET',
      });
      const parseData = await response.json();
      setArchived(parseData);
    } catch (error) {
      console.error(error);
      alert('Error in getting archived schedules frontend');
    }
  };

  useEffect(() => {
    getArchived();
  }, []);
  return (
    <div className="ViewArchived-wrapper">
      <h1>VIEW ARCHIVED</h1>
      <table>
        <tbody id="all-routes-table">
          <tr>
            <th>ID</th>
            <th>Route ID</th>
            <th>Bus ID</th>
            <th>Source ID</th>
            <th>Destination ID</th>
            <th>Date</th>
            <th>Price</th>
            <th>Archived On</th>
          </tr>
          {archived.map(archive => (
            <tr key={archive.id}>
              <td>{archive.id}</td>
              <td>{archive.RouteId}</td>
              <td>{archive.BusId}</td>
              <td>{archive.SourceId}</td>
              <td>{archive.DestinationId}</td>
              <td>{archive.ScheduledDate}</td>
              <td>{archive.price}</td>
              <td>{archive.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
