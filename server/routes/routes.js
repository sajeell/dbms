const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    const getRoutes = await models.Routes.findAll({
      include: [
        {
          model: models.Buses,
        },
        {
          model: models.Stations,
          as: 'Source',
          foreignKey: 'SourceId',
        },
        {
          model: models.Stations,
          as: 'Destination',
          foreignKey: 'DestinationId',
        },
      ],
    });
    res.json(getRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting routes');
  }
});

router.post('/get-schedules', async (req, res) => {
  try {
    const {source, destination, date} = req.body;
    const getRoutes = await models.Routes.findAll({
      attributes: [
        'id',
        'BusId',
        'SourceId',
        'DestinationId',
        'date',
        'time',
        'seat_price',
        'Source.name',
        'Destination.name',
      ],
      include: [
        {
          model: models.Buses,
        },
        {
          model: models.Stations,
          as: 'Source',
          foreignKey: 'SourceId',
        },
        {
          model: models.Stations,
          as: 'Destination',
          foreignKey: 'DestinationId',
        },
      ],
      where: {
        SourceId: source,
        DestinationId: destination,
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
      BusId: bus,
      SourceId: source,
      DestinationId: destination,
      seat_price: price,
      time: time,
      date: date,
    });

    res.json('Schedule Posted Succesfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in posting Route');
  }
});

router.post('/complete', async (req, res) => {
  try {
    const {
      RouteId,
      SourceId,
      ScheduledDate,
      price,
      BusId,
      DestinationId,
    } = req.body;
    console.log(DestinationId);
    const deleteRoute = await models.Routes.destroy({
      where: {
        id: RouteId,
      },
    });

    const archiveRoute = await models.PreviousTrip.create({
      RouteId: RouteId,
      SourceId: SourceId,
      ScheduledDate: ScheduledDate,
      price: price,
      BusId: BusId,
      DestinationId: DestinationId,
    });
    res.json('Scheduled Succesfully Archived');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in completing Route in Backend');
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {
      editRouteBus,
      editRouteSource,
      editRouteDestination,
      editRouteDate,
      editRouteTime,
      editRoutePrice,
    } = req.body;
    const editRoute = await models.Routes.update(
      {
        BusId: editRouteBus,
        SourceId: editRouteSource,
        DestinationId: editRouteDestination,
        date: editRouteDate,
        time: editRouteTime,
        seat_price: editRoutePrice,
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
