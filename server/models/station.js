'use strict';
module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalcode: DataTypes.INTEGER
  }, {});
  Station.associate = function(models) {
    // associations can be defined here
  };
  return Station;
};