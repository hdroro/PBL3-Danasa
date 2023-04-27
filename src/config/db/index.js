const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sa123',
  database: 'danasa'
});

module.exports = connection;
