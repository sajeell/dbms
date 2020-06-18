'use strict';
module.exports = (sequelize, DataTypes) => {
  const PreviousTrip = sequelize.define(
    'PreviousTrip',
    {
      RouteId: DataTypes.INTEGER,
      SourceId: DataTypes.INTEGER,
      DestinationId: DataTypes.INTEGER,
      BusId: DataTypes.INTEGER,
      ScheduledDate: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {}
  );
  PreviousTrip.associate = function (models) {
    // associations can be defined here
  };
  return PreviousTrip;
};
