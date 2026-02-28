const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      // If using SSL (recommended for Cloud SQL)
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;