const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    const getRoutes = await models.Stations.findAll({});
    res.json(getRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting routes');
  }
});

router.post('/', async (req, res) => {
  try {
    const {name, city, address} = req.body;

    const postStation = await models.Stations.create({
      name: name,
      city: city,
      address: address,
    });

    res.json('Station Posted Succesfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in posting Station');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {name, city, address} = req.body;
    const editRoute = await models.Stations.update(
      {
        name: name,
        city: city,
        address: address,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json('Station succesfully updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in editing Station');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStation = await models.Stations.destroy({
      where: {
        id: id,
      },
    });
    res.json('Station succesfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in deleting Station');
  }
});

module.exports = router;
