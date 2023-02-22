const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Renter extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Renter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.BLOB("long"),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    boat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "boat",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newRenterData) => {
        newRenterData.password = await bcrypt.hash(newRenterData.password, 10);
        return newRenterData;
      },
      beforeUpdate: async (updatedRenterData) => {
        updatedRenterData.password = await bcrypt.hash(
          updatedRenterData.password,
          10
        );
        return updatedRenterData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "renter",
  }
);

module.exports = Renter;
