const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    locationAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationZip: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    locationLat: {
      type: DataTypes.DECIMAL(3,10),
      allowNull: false,
    },
    locationLon: {
      type: DataTypes.DECIMAL(3,10),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
  }
);

module.exports = Location;