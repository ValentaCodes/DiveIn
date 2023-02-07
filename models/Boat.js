const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Boat extends Model {}

Boat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    boatName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boatCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boatLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boatDayRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    boatWeekRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    boatMonthRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    location_id: {
      type: DataTypes.STRING,
      references: {
        model: 'location',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'boat',
  }
);

module.exports = Boat;