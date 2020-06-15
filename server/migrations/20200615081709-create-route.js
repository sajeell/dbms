'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bus_id: {
        type: Sequelize.INTEGER,
      },
      source_id: {
        type: Sequelize.INTEGER,
      },
      destination_id: {
        type: Sequelize.INTEGER,
      },
      seat_price: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Routes');
  },
};
