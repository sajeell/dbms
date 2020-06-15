'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define(
    'Route',
    {
      bus_id: DataTypes.INTEGER,
      source_id: DataTypes.INTEGER,
      destination_id: DataTypes.INTEGER,
      seat_price: DataTypes.INTEGER,
      timing: DataTypes.STRING,
      date: DataTypes.DATEONLY,
    },
    {}
  );
  Route.associate = function (models) {
    Route.hasMany(models.Buses);
    Route.hasOne(models.Station);
    Route.belongsTo(models.ticket);
  };
  return Route;
};
