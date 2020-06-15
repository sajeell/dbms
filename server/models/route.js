'use strict';

const {Sequelize} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Routes = sequelize.define(
    'Routes',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bus_id: DataTypes.INTEGER,
      source_id: DataTypes.INTEGER,
      destination_id: DataTypes.INTEGER,
      seat_price: DataTypes.INTEGER,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
    },
    {}
  );
  Routes.associate = function (models) {
    // associations can be defined here
  };
  return Routes;
};
