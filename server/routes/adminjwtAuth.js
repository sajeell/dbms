const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const validInfo = require('../middleware/validInfo');
const jwtGenerator = require('../utils/adminjwtGenerator');
const authorize = require('../middleware/adminAuthorize');

router.post('/register', validInfo, async (req, res) => {
  const {id, email, name, password} = req.body;

  try {
    const user = await models.Admin.findAll({
      where: {
        id: id,
      },
    });
    if (user.length > 0) {
      return res.status(401).json('Admin already exist!');
    }

    const salt = await bcrypt.genSalt(9);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let addUser = await models.User.create({
      name: name,
      email: email,
      password: bcryptPassword,
    });

    const adminjwtToken = jwtGenerator(addUser.id);

    return res.json({adminjwtToken});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in registering admin');
  }
});

router.post('/login', validInfo, async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await models.Admin.findAll({
      where: {
        email: email,
      },
    });
    if (user.length === 0) {
      return res.status(401).json('Invalid Credential');
    }
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(401).json('Invalid Credential');
    }
    const adminjwtToken = jwtGenerator(user[0].id);
    return res.json({adminjwtToken});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in admin login');
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error in admin verification');
  }
});

module.exports = router;
