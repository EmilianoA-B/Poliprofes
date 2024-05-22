//Definimos que usaremos express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');
const mysql = require ('mysql2');

//Coneccion base de datos
const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});


//Configuraciones
app.set('port', process.env.PORT || 3000);
//Solo definimos que aqui estan las views, podria ser que no lo usemos
//Porque serian documentos de tipo ejs
app.set('views', path.join(__dirname, 'views'));
//igual, podria ser que no usemos el motor de plantillas
app.set('view engine', 'ejs');

//Seccion de middleware

//Sirve para que cuando se haga una solicitud al servidor
//este muestre la ruta que se solicita y el metodo que se utilza
app.use((req, res, next)=>{
    console.log(`${req.url} -${req.method}`);
    next();
})
//Para que el servidor entienda lo que recibe del navegador
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use(routes);
//Configuracion para que la raiz sirva el archivo inicial
/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'pag_dar_alta_prof.html'));
});*/

//Static files, o sea, el front
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})

//Registro de alumno =====> AQUI SE TIENE QUE CAMBIAR COSITAS PARA QUE SOLO HAYA 1 CAMPO DE APELLIDO
app.post('/regAlumno', (req, res) => {
    const{ nombre, apellido_paterno, apellido_materno, correo, contrasenia} = req.body;
    const query = 'INSERT INTO alumnos (nombre, apellido_paterno, apellido_materno, correo, contrasenia) VALUES (?, ?, ?, ?, ?)'
    connection.query(query, [nombre, apellido_paterno, apellido_materno, correo, contrasenia], (err, results) => {
        /*console.log(req.body);*/ //Linea de debug
        if (err) {
            console.error('Error al anadir alumno', err);
            res.status(500).json({ error: 'Error al anadir alumno', details: err });
            return;
        }
        res.status(200).json({ message: 'Se anadio al usuario', userId: results.insertId });
    });
});

//Registro de carreras
app.post('/regCarrera', (req, res) => {
    const{ carrera } = req.body;
    const query = 'INSERT INTO carreras (carrera) VALUES (?)'
    connection.query(query, [carrera], (err, results) => {
        /*console.log(req.body);*/ //Linea de debug
        if (err) {
            console.error('Error anadiendo carrera', err);
            res.status(500).json({ error: 'Error anadiendo carrera', details: err });
            return;
        }
        res.status(200).json({ message: 'Se anadio la carrera', userId: results.insertId });
    });
});

// APi para GET carreras
app.get('/api/carreras', (req, res) => {
    const query = "SELECT carrera FROM carreras";
    connection.query(query, (err, results) => {
        if(err){
            console.error('Error al desplegar carreras', err);
            res.status(500).send('Error al desplegar carreras');
            return;
        }
        //console.log("Success");
        res.json(results);
    });
});

//API para conseguir el ID y POST para insertar materia
app.post('/api/getID', (req, res) => {
    const {carrera} = req.body; 
    const query = "SELECT id FROM carreras WHERE carrera = ?";
    connection.query(query, [carrera], (err, results) => {
        if(err){
            console.error('Error al buscar ID', err);
            res.status(500).send('Error al buscar ID');
            return;
        }
        if (results.length > 0) {
            res.json({ id: results[0].id }); //Regresa un array, si hay elementos repetidos en la lista, puede ser un problema
        } else {
            res.status(404).send('No se encontro el id');
        }
    });
});

app.post('/materias', (req, res) => {
    const materia = req.body.materia; 
    const carrera = req.body.ID_Carrera;
    console.log('ID:',carrera);
    const query = "INSERT INTO materias (materia, carrera_ID) VALUES (?, ?)";
    connection.query(query, [materia, carrera], (err, results) => {
        if(err){
            console.error('Error inserting data', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log("Registro de materia existoso");
        res.status(200).send('Se anadio la materia');
    });
});