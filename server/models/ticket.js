'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define(
    'ticket',
    {
      customer_id: DataTypes.INTEGER,
      route_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      seatnum: DataTypes.INTEGER,
    },
    {}
  );
  ticket.associate = function (models) {
    ticket.hasOne(models.Route);
    ticket.hasOne(models.User);
  };
  return ticket;
};
