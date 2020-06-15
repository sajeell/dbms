const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    const getBuses = await models.Buses.findAll({});
    res.json(getBuses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting Buses');
  }
});

router.post('/', async (req, res) => {
  try {
    const {seats, pictureLink} = req.body;

    const postBus = await models.Buses.create({
      seats: seats,
      picture_link: pictureLink,
    });

    res.json('Bus Posted Succesfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in posting Bus');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {seats, pictureLink, status} = req.body;
    const editRoute = await models.Stations.update(
      {
        seats: seats,
        status: status,
        picture_link: pictureLink,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json('Bus succesfully updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in editing Bus');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStation = await models.Buses.destroy({
      where: {
        id: id,
      },
    });
    res.json('Bus succesfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in deleting Bus');
  }
});

module.exports = router;
