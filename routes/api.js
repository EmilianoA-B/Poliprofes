const express = require('express');
const router = express.Router();

const connection = require('./db');
// APi para GET carreras
router.get('/carreras', (req, res) => {
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

//API para conseguir el ID y POST para insertar materia
router.post('/getID', (req, res) => {
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

module.exports = router;