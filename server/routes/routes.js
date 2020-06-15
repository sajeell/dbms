const express = require('express');
const router = express.Router();
const models = require('../models');
const {route} = require('./adminjwtAuth');

router.get('/', async (req, res) => {
  try {
    const {source, destination, date} = req.body;

    const getRoutes = models.Routes.findAll({
      where: {
        source_id: source,
        destination_id: destination,
        date: date,
      },
    });
    res.json(getRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting routes');
  }
});

module.exports = router;
