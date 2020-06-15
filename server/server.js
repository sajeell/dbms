('use strict');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Express Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Importing Route Files
const userCredential = require('./routes/userCredential');
const adminCredential = require('./routes/adminCredential');
const routes = require('./routes/routes');
const station = require('./routes/stations');
const bus = require('./routes/bus');

// Routes
app.use('/user/authentication', require('./routes/userjwtAuth'));
app.use('/admin/authentication', require('./routes/adminjwtAuth'));
app.use('/user/credential', userCredential);
app.use('/admin/credential', adminCredential);
app.use('/routes', routes);
app.use('/station', station);
app.use('/bus', bus);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started listening on ${PORT}`);
});
