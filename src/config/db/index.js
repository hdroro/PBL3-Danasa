const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sa123',
  database: 'danasa'
});

module.exports = connection;
