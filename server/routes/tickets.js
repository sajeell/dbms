const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    const getTickets = await models.Tickets.findAll({});
    res.json(getTickets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting tickets');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const getTickets = await models.Tickets.findAll({
      include: [
        {
          model: models.Routes,
          foreignKey: 'RouteId',
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
        },
      ],
      where: {
        CustomerId: req.params.id,
      },
    });
    res.json(getTickets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting tickets');
  }
});

router.post('/', async (req, res) => {
  try {
    let {customer, route, quantity} = req.body;

    const getRoutes = await models.Routes.findAll({
      include: [
        {
          model: models.Buses,
        },
      ],
      where: {
        id: route,
      },
    });

    const busId = getRoutes[0].Bus.id;
    quantity = parseInt(quantity);
    console.log(quantity);
    const getBusSeats = await models.Buses.findOne({
      where: {
        id: parseInt(busId),
      },
    });

    let seats = parseInt(getBusSeats.occupied_seats) + parseInt(quantity);

    const incrementBusId = await models.Buses.update(
      {
        occupied_seats: seats,
      },
      {
        where: {
          id: busId,
        },
      }
    );

    const postTicket = await models.Tickets.create({
      RouteId: route,
      CustomerId: customer,
      quantity: quantity,
    });

    res.json('Ticket Booked');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in booking ticket');
  }
});

// Ticket can't be edited, so there will be no PUT route

router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let {route, quantity} = req.body;

    const getRoutes = await models.Routes.findAll({
      include: [
        {
          model: models.Buses,
        },
      ],
      where: {
        id: route,
      },
    });

    const busId = getRoutes[0].Bus.id;
    quantity = parseInt(quantity);
    console.log(quantity);
    const getBusSeats = await models.Buses.findOne({
      where: {
        id: parseInt(busId),
      },
    });

    let seats = parseInt(getBusSeats.occupied_seats) - parseInt(quantity);

    const incrementBusId = await models.Buses.update(
      {
        occupied_seats: seats,
      },
      {
        where: {
          id: busId,
        },
      }
    );
    const deleteTicket = await models.Tickets.destroy({
      where: {
        id: id,
      },
    });

    res.json('Ticket succesfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in deleting Ticket');
  }
});

module.exports = router;
