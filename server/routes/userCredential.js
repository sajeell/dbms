const router = require('express').Router();
const authorize = require('../middleware/authorize');
const models = require('../models');

router.post('/', authorize, async (req, res) => {
  try {
    const customer = await models.User.findAll({
      where: {
        id: req.customer.id,
      },
    });

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    console.error('Error in getting customer credentials');
    res.status(500).send('Server error');
  }
});

module.exports = router;
