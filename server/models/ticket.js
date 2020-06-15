'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Tickets', {
    customer_id: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    seatnum: DataTypes.INTEGER
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};