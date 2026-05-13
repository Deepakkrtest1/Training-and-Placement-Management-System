const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Deepak@123',
    database: 'placement',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = dbConnection;
