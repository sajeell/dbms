'use strict';
module.exports = (sequelize, DataTypes) => {
  const Buses = sequelize.define('Buses', {
    seats: DataTypes.INTEGER,
    picture_link: DataTypes.STRING,
    status: DataTypes.STRING,
    occupied_seats: DataTypes.STRING
  }, {});
  Buse.associate = function(models) {
    // associations can be defined here
  };
  return Buses;
};