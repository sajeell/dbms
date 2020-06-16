'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stations = sequelize.define(
    'Stations',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {}
  );
  Stations.associate = function (models) {
    // associations can be defined here
    Stations.hasMany(models.Routes, {
      foreignKey: 'SourceId',
    });
    Stations.hasMany(models.Routes, {
      foreignKey: 'DestinationId',
    });
  };
  return Stations;
};
