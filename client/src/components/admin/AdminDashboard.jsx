import React, { useState, useEffect } from "react";
import AddStation from "./AddStation";
import AddBus from "./AddBus";
import AddRoute from "./AddRoute";
import { Switch, Redirect, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AdminDashboard() {
  const classes = useStyles();

  const [station, setStation] = useState([]);
  const [buses, setBuses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [open, setOpen] = useState(false);
  const [editRouteBus, setEditRouteBus] = useState(0);
  const [editRouteSource, setEditRouteSource] = useState(0);
  const [editRouteDestination, setEditRouteDestination] = useState(0);
  const [editRoutePrice, setEditRoutePrice] = useState(0);
  const [editRouteDate, setEditRouteDate] = useState("");
  const [editRouteTime, setEditRouteTime] = useState("");

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/admin/authentication/verify",
        {
          method: "POST",
          headers: { admin_jwt_token: localStorage.admin_token },
        }
      );

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

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

  const getSchedule = async () => {
    try {
      const response = await fetch(`http://localhost:5000/routes`, {
        method: "GET",
      });

      const jsonData = await response.json(); // Parser
      setSchedules(jsonData);
    } catch (error) {
      console.error(error);
      console.log("Error in getting schedules");
    }
  };

  const deleteRoute = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/routes/${id}`, {
        method: "DELETE",
      });

      const jsonData = await response.json(); // Parser
      alert(jsonData);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error in deleting schedules");
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem("admin_token");
    alert("Succesfully Logged Out");
    window.location.reload();
  };

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    getStations();
  }, []);

  useEffect(() => {
    getBuses();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = async (id) => {
    try {
      if (editRouteSource === editRouteDestination) {
        alert("Invalid Entry");
        return;
      } else if (
        editRouteBus === 0 ||
        editRouteSource === 0 ||
        editRouteDestination === 0 ||
        editRouteDate === "" ||
        editRouteTime === "" ||
        editRoutePrice === 0
      ) {
        alert("Missing Data");
        return;
      }
      const body = {
        editRouteBus,
        editRouteSource,
        editRouteDestination,
        editRouteDate,
        editRouteTime,
        editRoutePrice,
      };
      const response = await fetch(`http://localhost:5000/routes/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonData = await response.json(); // Parser
      alert(jsonData);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error in updating schedules");
    }
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const handleEditRouteBus = (e) => {
    setEditRouteBus(e);
  };

  const handleEditRouteSource = (e) => {
    setEditRouteSource(e);
  };

  const handleEditRouteDestination = (e) => {
    setEditRouteDestination(e);
  };

  const handleEditRoutePrice = (e) => {
    e.preventDefault();
    setEditRoutePrice(e.target.value);
  };

  const handleEditRouteTime = (e) => {
    e.preventDefault();
    setEditRouteTime(e.target.value);
  };

  const handleEditRouteDate = (e) => {
    e.preventDefault();
    setEditRouteDate(e.target.value);
  };

  return (
    <div className='AdminDashboard-wrapper'>
      <Switch>
        <Route
          exact
          path='/admin/login'
          render={(props) =>
            !isAuthenticated ? (
              <AdminLogin {...props} setAuth={setAuth} />
            ) : (
              <Redirect to='/admin/dashboard' />
            )
          }
        />

        <Route
          exact
          path='/admin/register'
          render={(props) =>
            !isAuthenticated ? (
              <AdminRegister {...props} setAuth={setAuth} />
            ) : (
              <Redirect to='/admin/dashboard' />
            )
          }
        />

        <Route
          path='/admin/dashboard'
          render={(props) =>
            isAuthenticated ? (
              <div>
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
                      <p id='admin-header-6'>View Schedules</p>
                    </a>
                    <a href=''>
                      <p
                        id='admin-header-7'
                        onClick={(e) => {
                          logout(e);
                        }}
                      >
                        Log Out
                      </p>
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
                <div id='view/route' className='adminDashboard-routes'>
                  <div className='stations-heading'>
                    <h2>VIEW SCHEDULES</h2>
                  </div>
                  <table>
                    <tbody id='all-routes-table'>
                      <tr>
                        <th>ID</th>
                        <th>Bus #</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Time</th>
                        <th>Occupied Seats</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Edit</th>
                        <th>COMPLETE</th>
                      </tr>
                      {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                          <td>{schedule.id}</td>
                          <td>{schedule.BusId}</td>
                          <td>{schedule.Source.name}</td>
                          <td>{schedule.Destination.name}</td>
                          <td>{schedule.time}</td>
                          <td>
                            {schedule.Bus.occupied_seats
                              ? schedule.Bus.occupied_seats
                              : 0}
                          </td>
                          <td>{schedule.date}</td>
                          <td>{schedule.seat_price}</td>
                          <td
                            id='book-seat-button'
                            onClick={() => {
                              deleteRoute(schedule.id);
                            }}
                          >
                            DELETE
                          </td>
                          <td id='book-seat-button' onClick={handleClickOpen}>
                            {" "}
                            EDIT
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby='form-dialog-title'
                            >
                              <DialogTitle id='form-dialog-title'>
                                EDIT ROUTE
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  To edit this route, please add the following
                                  attributes
                                </DialogContentText>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id='select-source'>
                                    Bus
                                  </InputLabel>
                                  <Select labelId='-label' id=''>
                                    {buses.map((bus) => (
                                      <MenuItem
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                        value={bus.id}
                                        onClick={() => {
                                          handleEditRouteBus(bus.id);
                                        }}
                                      >
                                        {bus.id} -{" "}
                                        <img
                                          src={bus.picture_link}
                                          id='bus-image'
                                          style={{
                                            height: "50px",
                                            marginLeft: "50px",
                                          }}
                                        ></img>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id='select-source'>
                                    Source
                                  </InputLabel>
                                  <Select labelId='-label' id=''>
                                    {station.map((item) => (
                                      <MenuItem
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                        key={item.id}
                                        value={item.id}
                                        onClick={() => {
                                          handleEditRouteSource(item.id);
                                        }}
                                      >
                                        {item.id} - {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                  <InputLabel id='select-source'>
                                    Destination
                                  </InputLabel>
                                  <Select labelId='-label' id=''>
                                    {station.map((element) => (
                                      <MenuItem
                                        value={element.id}
                                        key={element.id}
                                        onClick={() => {
                                          handleEditRouteDestination(
                                            element.id
                                          );
                                        }}
                                      >
                                        {element.id} - {element.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  autoFocus
                                  margin='dense'
                                  id='edit-name'
                                  type='date'
                                  value={editRouteDate}
                                  onChange={handleEditRouteDate}
                                />
                                <TextField
                                  autoFocus
                                  margin='dense'
                                  id='edit-name'
                                  placeholder='Time Format: XX:XX (24-Hour)'
                                  label='Time'
                                  type='text'
                                  fullWidth
                                  value={editRouteTime}
                                  onChange={handleEditRouteTime}
                                />
                                <TextField
                                  autoFocus
                                  margin='dense'
                                  id='edit-name'
                                  placeholder='Cost per Seat'
                                  label='Price'
                                  type='text'
                                  fullWidth
                                  value={editRoutePrice}
                                  onChange={(e) => {
                                    handleEditRoutePrice(e);
                                  }}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color='primary'>
                                  CANCEL
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleForm(schedule.id);
                                  }}
                                  color='primary'
                                >
                                  SAVE
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </td>
                          <td id='book-seat-button'>COMPLETE</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <Redirect to='/admin/login' />
            )
          }
        />
      </Switch>
    </div>
  );
}
