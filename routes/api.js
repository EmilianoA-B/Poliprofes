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

module.exports = router;