const mysql = require('mysql2');

//Conexion a base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pandora',
    database: 'poliprofes'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;