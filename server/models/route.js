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
      BusId: DataTypes.INTEGER,
      SourceId: DataTypes.INTEGER,
      DestinationId: DataTypes.INTEGER,
      seat_price: DataTypes.FLOAT,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
    },
    {}
  );
  Routes.associate = function (models) {
    Routes.belongsTo(models.Buses);
    Routes.belongsTo(models.Stations, {
      as: 'Source',
      foreignKey: 'SourceId',
    });
    Routes.belongsTo(models.Stations, {
      as: 'Destination',
      foreignKey: 'DestinationId',
    });
    Routes.hasMany(models.Tickets, {
      foreignKey: 'RouteId',
    });
  };
  return Routes;
};
