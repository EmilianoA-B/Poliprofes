const express = require('express');
const router = express.Router();

const connection = require('./db');

// API para obtener todas las carreras
router.get('/getCarreras', (req, res) => {
    const query = "SELECT carrera FROM carreras";
    connection.query(query, (err, results) => {
        if(err){
            console.error('Error al desplegar carreras', err);
            res.status(500).send('Error al desplegar carreras');
            return;
        }
        res.json(results);
    });
});

//API para obtener el id dependiendo de una carrera dada
router.post('/getIdByCarrera', (req, res) => {
    const carrera = req.body.carrera;
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

//POST para desplegar las materias ligadas a una carrera
router.post('/getMaterias', (req, res) => {
    const carrera = req.body.carrera;
    console.log('Carrera para buscar sus materias:',carrera);
    const queryforID = "SELECT id FROM carreras WHERE carrera = ?"; 
    connection.query(queryforID, [carrera], (err, results) => { //Se consigue el ID
        if(err){
            console.error('Error al buscar ID de carrera', err);
            res.status(500).send('Error al buscar ID de carrera');
            return;
        }
        console.log("Exito al buscar ID de carrera");
        const idCarrera = results[0].id;
        const queryforMaterias = 'SELECT materia FROM materias WHERE carrera_id = ?'
            connection.query(queryforMaterias, [idCarrera], (err, resultado) => { //Usando el id se buscan todas las materias 
            if(err){
                console.error('Error al al regresar materias', err);
                res.status(500).send('Error al al regresar materias');
                return;
            }
            console.log("Exito al regresar materias");
            res.json(resultado);
        });
    });
});

module.exports = router;