'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    bus_id: DataTypes.INTEGER,
    source_id: DataTypes.INTEGER,
    destination_id: DataTypes.INTEGER,
    seat_price: DataTypes.INTEGER
  }, {});
  Route.associate = function(models) {
    // associations can be defined here
  };
  return Route;
};