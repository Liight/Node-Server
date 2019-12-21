const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-server',
    password: 'password'
});

module.exports = pool.promise();