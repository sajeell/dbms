const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    const getRoutes = await models.Routes.findAll();
    res.json(getRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting routes');
  }
});

router.post('/', async (req, res) => {
  try {
    const {source, destination, date} = req.body;
    const getRoutes = await models.Routes.findAll({
      where: {
        source_id: source,
        destination_id: destination,
        date: date,
      },
    });
    res.json(getRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting post-routes');
  }
});

router.post('/create', async (req, res) => {
  try {
    const {bus, source, destination, price, time, date} = req.body;

    const postRoute = await models.Routes.create({
      bus_id: bus,
      source_id: source,
      destination_id: destination,
      seat_price: price,
      time: time,
      date: date,
    });

    res.json('Route Posted Succesfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in posting Route');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {
      bus_id,
      source_id,
      destination_id,
      date,
      timing,
      seat_price,
    } = req.body;
    const editRoute = await models.Routes.update(
      {
        bus_id: bus_id,
        source_id: source_id,
        destination_id: destination_id,
        date: date,
        timing: timing,
        seat: seat_price,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json('Route succesfully updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in editing Route');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteRoute = await models.Routes.destroy({
      where: {
        id: id,
      },
    });
    res.json('Route succesfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in deleting Route');
  }
});

module.exports = router;
