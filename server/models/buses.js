'use strict';
module.exports = (sequelize, DataTypes) => {
  const Buses = sequelize.define(
    'Buses',
    {
      seats: DataTypes.INTEGER,
      picture_link: DataTypes.STRING,
      status: DataTypes.STRING,
      occupied_seats: DataTypes.INTEGER,
    },
    {}
  );
  Buses.associate = function (models) {
    Buses.hasMany(models.Routes, {
      foreignKey: 'BusId',
    });
  };
  return Buses;
};
