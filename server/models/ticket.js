'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Tickets',
    {
      CustomerId: DataTypes.INTEGER,
      RouteId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {}
  );
  Ticket.associate = function (models) {
    // associations can be defined here
    Ticket.belongsTo(models.Routes, {
      foreignKey: 'RouteId',
    });
  };
  return Ticket;
};
