const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(id) {
  const payload = {
    admin: {
      id: id,
    },
  };

  return jwt.sign(payload, process.env.adminjwtSecret, {expiresIn: '1h'});
}

module.exports = jwtGenerator;
