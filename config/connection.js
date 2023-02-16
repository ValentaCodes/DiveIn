const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.MYSQLDATABASE,
      process.env.MYSQLUSER,
      process.env.MYSQLPASSWORD,
      {
        host: 'localhost',
        dialect: "mysql",
        port: 3306,
      }
    );

module.exports = sequelize;
