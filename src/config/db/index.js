const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'phuongha35',
  database: 'danasa'
});

module.exports = connection;
