'use strict';
module.exports = (sequelize, DataTypes) => {
  const PreviousTrips = sequelize.define(
    'PreviousTrip',
    {
      RouteId: DataTypes.INTEGER,
      SourceId: DataTypes.INTEGER,
      BusId: DataTypes.INTEGER,
      ScheduledDate: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {}
  );
  PreviousTrips.associate = function (models) {
    // associations can be defined here
  };
  return PreviousTrips;
};
