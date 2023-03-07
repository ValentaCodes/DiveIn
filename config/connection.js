const Sequelize = require("sequelize");
require("dotenv").config();

// Connect to heroku db if not run these variables and connect
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.MYSQLDATABASE,
      process.env.MYYSQLUSER,
      process.env.MYSQLPASSWORD,
      {
        host: process.env.MYSQLHOST,
        dialect: "mysql",
        port: process.env.MYSQLPORT,
      }
    );

module.exports = sequelize;
