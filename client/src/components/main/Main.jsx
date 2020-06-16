import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// CSS File
import "./Main.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Main() {
  const classes = useStyles();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [date, setDate] = useState("");
  const [station, setStation] = useState([]);

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

  useEffect(() => {
    getStations();
  }, []);

  function handleSource(e) {
    setSource(e);
  }

  function handleDestination(e) {
    setDestination(e);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function submitForm() {
    if (source === destination) {
      alert("Invalid Entries");
      return;
    }
    alert(`${source}-${destination}-${date}`);
    window.localStorage.setItem("source_id", source);
    window.localStorage.setItem("destination_id", destination);
    window.localStorage.setItem("date", date);

    window.location.replace("/schedule");
  }

  return (
    <div className='Wrapper'>
      <div className='image'>
        <img
          src='https://i.ibb.co/tXvnZkz/Mainbg.jpg'
          id='image'
          alt='Main Background not found'
        ></img>
      </div>
      <div className='row-1'>
        <div className='input-1'>
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
        <div className='input-2'>
          <FormControl className={classes.formControl}>
            <InputLabel id='select-destination'>Destination</InputLabel>
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
        <div className='input-3'>
          <input type='date' id='date' value={date} onChange={handleDate} />
        </div>
        <div className='input-4'>
          <input
            type='button'
            value='Check Schedule'
            id='schedule-button'
            onClick={submitForm}
          />
        </div>
      </div>
    </div>
  );
}
