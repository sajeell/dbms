import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./Admin.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddRoute() {
  const [source, setSource] = useState();
  const [bus, setBus] = useState();
  const [destination, setDestination] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [buses, setBuses] = useState([]);
  const [station, setStation] = useState([]);

  const classes = useStyles();

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

  const postRoute = async () => {
    try {
      const body = { bus, source, destination, date, time, price };
      const response = await fetch("http://localhost:5000/routes/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      alert("Route Added");
    } catch (error) {
      console.error(error);
      console.error("Error while posting stations add route component");
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  useEffect(() => {
    getStations();
  }, []);

  const handleSource = (e) => {
    setSource(e);
  };

  const handleDestination = (e) => {
    setDestination(e);
  };

  const handleBus = (e) => {
    setBus(e);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const handleDate = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const handleTime = (e) => {
    e.preventDefault();
    setTime(e.target.value);
  };

  return (
    <div className='AddRoute-wrapper'>
      <form>
        <div className='addRoute-row-0'>
          <h4>Add Schedule</h4>
        </div>
        <div className='addRoute-row-1'>
          <FormControl className={classes.formControl}>
            <InputLabel id='select-source'>Source</InputLabel>
            <Select labelId='demo-simple-select-label' id='demo-simple-select'>
              {station.map((station) => (
                <MenuItem
                  value={station.id}
                  onClick={() => {
                    handleSource(station.id);
                  }}
                >
                  {station.id} - {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='addRoute-row-2'>
          <FormControl className={classes.formControl}>
            <InputLabel id='select-source'>Destination</InputLabel>
            <Select labelId='demo-simple-select-label' id='demo-simple-select'>
              {station.map((station) => (
                <MenuItem
                  value={station.id}
                  onClick={() => {
                    handleDestination(station.id);
                  }}
                >
                  {station.id} - {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='addRoute-row-3'>
          <FormControl className={classes.formControl}>
            <InputLabel id='select-source'>Bus</InputLabel>
            <Select labelId='demo-simple-select-label' id='demo-simple-select'>
              {buses.map((bus) => (
                <MenuItem
                  style={{ display: "flex", justifyContent: "center" }}
                  value={bus.id}
                  onClick={() => {
                    handleBus(bus.id);
                  }}
                >
                  {bus.id} -{" "}
                  <img
                    src={bus.picture_link}
                    id='bus-image'
                    style={{ height: "50px", marginLeft: "50px" }}
                  ></img>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='addRoute-row-4'>
          <input
            type='date'
            id='addroute-date'
            value={date}
            onChange={handleDate}
          />
        </div>
        <div className='addRoute-row-5'>
          <input
            type='text'
            id='addroute-time'
            placeholder='Time in 24 Hours format e.g. 23:30'
            value={time}
            onChange={handleTime}
          />
        </div>
        <div className='addRoute-row-5'>
          <input
            type='text'
            id='addroute-price'
            placeholder='Enter Per Seat Price'
            value={price}
            onChange={handlePrice}
          />
        </div>
        <div className='addRoute-row-6'>
          <input
            type='button'
            id='route-submit'
            onClick={postRoute}
            value='Submit'
          />
        </div>
      </form>
    </div>
  );
}
