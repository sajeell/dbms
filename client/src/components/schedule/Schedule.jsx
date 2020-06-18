import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./Schedule.css";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [credential, setCredential] = useState([]);
  async function getProfile() {
    try {
      const res = await fetch("http://localhost:5000/user/credential", {
        method: "POST",
        headers: { jwt_token: localStorage.getItem("customer_token") },
      });

      const parseData = await res.json();
      setCredential(parseData);
    } catch (err) {
      console.error(err);
      console.log("Error in getting profile");
    }
  }

  const getSchedule = async () => {
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

  const bookTicket = async (customer, route) => {
    try {
      if (quantity < 1) {
        alert("Invalid Quantity");
        return;
      }
      const body = { customer, route, quantity };
      const response = await fetch(`http://localhost:5000/ticket/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const ticketId = await response.json();
      console.log(ticketId);
      alert("Ticket Booked");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error in booking ticket");
    }
  };

  const handleQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='Wrapper'>
      {credential.map((cred) => (
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
              <th>Seats Remaining</th>
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
                <td>
                  {schedule.Bus.seats - schedule.Bus.occupied_seats < 1
                    ? "Sold"
                    : schedule.Bus.seats - schedule.Bus.occupied_seats}
                </td>
                <td id='book-seat-button' onClick={handleClickOpen}>
                  BOOK
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='form-dialog-title'
                  >
                    <DialogTitle id='form-dialog-title'>Seats</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To book, please enter quantity of the seats you want
                      </DialogContentText>
                      <input
                        id='ticket-quantity'
                        type='number'
                        placeholder='Quantity'
                        value={quantity}
                        onChange={handleQuantity}
                      ></input>
                      <br />
                      <br />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                        }}
                        color='primary'
                      >
                        CANCEL
                      </Button>
                      <Button
                        color='primary'
                        onClick={() => {
                          bookTicket(cred.id, schedule.id);
                        }}
                      >
                        BOOK
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
