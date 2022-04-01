const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'adminer',
    password : 'adminer',
    database : 'eduwork-cruds'
  });
module.exports = connection;