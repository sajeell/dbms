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
      busid: {
        type: Sequelize.INTEGER,
        references: {model: 'Buses', key: 'id'},
      },
      source_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Stations', key: 'id'},
      },
      destination_id: {
        type: Sequelize.INTEGER,
        references: {model: 'Stations', key: 'id'},
      },
      seat_price: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
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
