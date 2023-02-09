const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Boat extends Model {}

Boat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // NOTE: added image table so we can store boat images
    image: {
      type: DataTypes.BLOB("long"),
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "location",
        key: "id",
      },
    },
    // added this so we can create a connection between boat and renter. now we know what boat is rented by who
    renter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "renter",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "boat",
  }
);

module.exports = Boat;
