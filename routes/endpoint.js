const express = require('express');
const router = express.Router();

const connection = require('./db');

//Registro de alumno
router.post('/regAlumno', (req, res) => {
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const correo = req.body.correo;
    const contrasenia = req.body.contrasenia;
    const query = 'INSERT INTO alumnos (nombre, apellidos, correo, contrasenia) VALUES (?, ?, ?, ?)'
    connection.query(query, [nombre, apellidos, correo, contrasenia], (err, results) => {
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
router.post('/regCarrera', (req, res) => {
    const carrera = req.body.carrera;
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

//Registro de materia
router.post('/regMateria', (req, res) => {
    const materia = req.body.materia;
    const carrera = req.body.ID_Carrera;
    console.log('ID:',carrera);
    const query = "INSERT INTO materias (materia, carrera_ID) VALUES (?, ?)";
    connection.query(query, [materia, carrera], (err, results) => {
        if(err){
            console.error('Error agregando la materia', err);
            res.status(500).send('Error agregando la materia');
            return;
        }
        console.log("Registro de materia existoso");
        res.status(200).send('Registro de materia exitoso');
    });
});

//Alta de profesores desde ADMIN 
router.post('/regProf', (req, res) => {
    const carrera = req.body.ID_Carrera;
    const nombreProf = req.body.
    console.log('ID:',carrera);
    const query = "INSERT INTO profesores (nombreProf, carrera) VALUES (?, ?)";
    connection.query(query, [nombreProf, carrera], (err, results) => {
        if(err){
            console.error('Error agregando al profesor', err);
            res.status(500).send('Error agregando al profesor');
            return;
        }
        console.log("Registro de materia existoso");
        res.status(200).send('Registro de materia exitoso');
    });
});

module.exports = router;