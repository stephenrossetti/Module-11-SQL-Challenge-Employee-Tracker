const MySQL = require('mysql');
require('dotenv').config();

const connection = MySQL.createConnection(
    {
        host: 'localhost',
        port: 3001,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
);

module.exports = connection;