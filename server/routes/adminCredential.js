const router = require('express').Router();
const authorize = require('../middleware/adminAuthorize');

router.post('/', authorize, async (req, res) => {
  try {
    const customer = await models.Admin.findAll({
      where: {
        id: req.admin.id,
      },
    });

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    console.error('Error in getting admin credentials');
    res.status(500).send('Server error');
  }
});

module.exports = router;
