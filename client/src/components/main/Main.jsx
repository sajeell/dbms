import React, { useState } from "react";
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

export default function ({ getSource, getDestination, getDate }) {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  function handleSource(e) {
    setSource(e.target.value);
  }

  function handleDestination(e) {
    setDestination(e.target.value);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function submitForm() {
    getSource("Islamabad");
    getDestination("Peshawar");
    getDate("2020-06-16");
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
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={source}
              onChange={handleSource}
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='input-2'>
          <FormControl className={classes.formControl}>
            <InputLabel id='select-destination'>Destination</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={destination}
              onChange={handleDestination}
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
