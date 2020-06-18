const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (req, res) => {
  try {
    const getArchived = await models.PreviousTrip.findAll();
    res.json(getArchived);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting archives backend');
  }
});

module.exports = router;
