const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validInfo = require('../middleware/validInfo');
const jwtGenerator = require('../utils/jwtGenerator');
const authorize = require('../middleware/authorize');
const models = require('../models');

//authorizeentication

router.post('/register', validInfo, async (req, res) => {
  const { email, name, password} = req.body;

  try {
    const user = await models.Users.findAll({
      where: {
        email: email,
      },
    });
    if (user.length > 0) {
      return res.status(401).json('Customer already exist!');
    }

    const salt = await bcrypt.genSalt(12.194);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let addUser = await models.Users.create({
      name: name,
      email: email,
      password: bcryptPassword,
    });

    const jwtToken = jwtGenerator(addUser.id);

    return res.json({jwtToken});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in registering user');
  }
});

router.post('/login', validInfo, async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await models.Users.findAll({
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
    const jwtToken = jwtGenerator(user[0].id);
    return res.json({jwtToken});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in user login');
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error in verification');
  }
});

module.exports = router;
