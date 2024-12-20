const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true
});

module.exports = pool;