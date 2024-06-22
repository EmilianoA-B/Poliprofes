const mysql = require('mysql2');
//Archivo de configuracion de conexion JSON
const connectionJSON = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let connection;
function tryConnection(connectionConfig, onSuccess, onFailure){
    //Establecer atributo de conexion en el objeto Connection
    connection = mysql.createConnection(connectionJSON);
    connection.connect(err => {
        if (err) {
            onFailure(err);
        }
        console.log('Connected to the MySQL database.');
        onSuccess(connection);
    });
}
tryConnection(connectionJSON, 
    (connection)=>{
        console.log('Within the first attempt');
    },
    (err) =>{
        connectionJSON.password= 'Pix3l.if071102';
        tryConnection(connectionJSON, 
            (connection)=>{
                console.log('Within the second attempt');
            },
            (err)=>{
                console.error('Error on the db connection: ', err.stack);
            })
    }
);
module.exports = connection;