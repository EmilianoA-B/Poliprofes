const express = require("express");
const router = express.Router();

const connection = require("./db");

//Registro de alumno
router.post("/regAlumno", (req, res) => {
  const nombre = req.body.nombre;
  const apellidos = req.body.apellidos;
  const correo = req.body.correo;
  const contrasenia = req.body.contrasenia;
  const query =
    "INSERT INTO alumnos (nombre, apellidos, correo, contrasenia) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [nombre, apellidos, correo, contrasenia],
    (err, results) => {
      /*console.log(req.body);*/ //Linea de debug
      if (err) {
        console.error("Error al anadir alumno", err);
        res.status(500).json({ error: "Error al anadir alumno", details: err });
        return;
      }
      res
        .status(200)
        .json({ message: "Se anadio al usuario", userId: results.insertId });
    }
  );
});

//Registro de carreras
router.post("/regCarrera", (req, res) => {
  const carrera = req.body.carrera;
  const query = "INSERT INTO carreras (carrera) VALUES (?)";
  connection.query(query, [carrera], (err, results) => {
    /*console.log(req.body);*/ //Linea de debug
    if (err) {
      console.error("Error anadiendo carrera", err);
      res.status(500).json({ error: "Error anadiendo carrera", details: err });
      return;
    }
    res
      .status(200)
      .json({ message: "Se anadio la carrera", userId: results.insertId });
  });
});

//Registro de materia
router.post("/regMateria", (req, res) => {
  const materia = req.body.materia;
  const carrera = req.body.ID_Carrera;
  console.log("ID:", carrera);
  const query = "INSERT INTO materias (materia, carrera_ID) VALUES (?, ?)";
  connection.query(query, [materia, carrera], (err, results) => {
    if (err) {
      console.error("Error agregando la materia", err);
      res.status(500).send("Error agregando la materia");
      return;
    }
    console.log("Registro de materia existoso");
    res.status(200).send("Registro de materia exitoso");
  });
});

//Alta de profesores desde ADMIN ===> CUIDADO CON REGISTRAR REPETIDOS, SE PETA EL SERVIDOR
router.post("/regProf", (req, res) => {
  const nombreProf = req.body.nombreProf;
  const apellido_p = req.body.apellidoP;
  const apellido_m = req.body.apellidoM;
  const todasLasMaterias = req.body.selections;
  const verificado = req.body.verificado;
  console.log(req.body.selections);
  //QUERY PARA BUSCAR REPETIDOS
  const queryRepetido = "SELECT id FROM profesores WHERE nombre = ? AND apellido_paterno = ? AND apellido_materno = ?"
  connection.query(queryRepetido,[nombreProf, apellido_p, apellido_m], (err, results) => {
    if (err) {
      console.error("Error al buscar repetidos", err);
      res.status(500).send("Error al repetidos");
      return;
    }else if(results.length !== 0){
      return res.status(400).json({error: "Se encontraron repetidos"});
    }else{
      console.log("No se encontraron repetidos");
    }
  });
  //QUERY PARA INSERTAR
  const query1 =
    "INSERT INTO profesores (nombre, apellido_paterno, apellido_materno, verificado) VALUES (?, ?, ?, ?)";
  connection.query(query1,[nombreProf, apellido_p, apellido_m, verificado], (err, results) => {
      if (err) {
        console.error("Error agregando al profesor", err);
        res.status(500).send("Error agregando al profesor");
        return;
      }
      console.log("Exito agregando al profesor");
    }
  );
  //Segundo query para sacar ID de profesor
  const query2 =
    "SELECT id FROM profesores WHERE nombre = ? AND apellido_paterno = ? AND apellido_materno = ? ORDER BY id DESC LIMIT 1";
  connection.query(query2,[nombreProf, apellido_p, apellido_m], (err, results) => {
      if (results.length.id === 0) {
        return res.status(400).send("No se encontro IDS");
      }
      if (err) {
        console.error("Error al buscar id del prof", err);
        res.status(500).send("Error al buscar id del prof");
        return;
      }
      console.log("Exito encontrando el ID del profesor");
      console.log(results);
      const idProfesor = results[0].id;

      //3ER query para materias
      const materiasConComas = todasLasMaterias.map(() => "?").join(",");
      const query3 = `SELECT id FROM materias WHERE materia IN (${materiasConComas})`;
      connection.query(query3, todasLasMaterias, (err, results) => {
        if (err) {
          console.error("Error encontrando el ID de las materias", err);
          res.status(500).send("Error encontrando el ID de las materias");
          return;
        }
        console.log("Exito encontrando el ID de las materias");
        console.log(results);
        const idMaterias = results.map((row) => row.id);
        console.log("MATERIAS ID:", idMaterias);

        //4to query para insertar en tabla profesores_materias
        const materiasConProf = idMaterias.map(() => "(?, ?)").join(",");
        const valoresQuery = [];
        idMaterias.forEach((id) => {
          valoresQuery.push(id, idProfesor);
        });

        const query4 = `INSERT INTO profesor_materias (materia_id, profesor_id) VALUES ${materiasConProf}`;
        connection.query(query4, valoresQuery, (err, results) => {
          if (err) {
            console.error("Error registrando materias en tabla", err);
            res.status(500).send("Error registrando materias en tabla");
            return;
          }
          console.log("Exito registrando materias en tabla");
          res
            .status(200)
            .json({
              message: "Se registro el profesor y sus materias con exito",
            });
        });
      });
    }
  );
});

//Eliminacion de comentario
router.post("/eliminarComentario", (req, res) => {
  const id_comentario = req.body.id_comentario;
  const query = "DELETE from COMENTARIOS where ID = ?";
  connection.query(query, [id_comentario], (err, results) => {
    if (err) {
      console.error("Error eliminando el comentario", err);
      return res
        .status(500)
        .json({ error: "Error eliminando el comentario", details: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el comentario" });
    }
    res.status(200).json({ message: "Comentario eliminado con éxito" });
  });
});

// Eliminación de profesor
router.post("/eliminarProfesor", (req, res) => {
  const nombreCompleto = req.body.nombre;
  console.log("Nombre desde el end:",nombreCompleto);
  const findProfessorIdQuery = `
    SELECT ID
    FROM PROFESORES
    WHERE CONCAT(NOMBRE, ' ', APELLIDO_PATERNO, ' ', APELLIDO_MATERNO) = ?
    LIMIT 1
`;

  connection.query(findProfessorIdQuery, [nombreCompleto], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al buscar el profesor");
    }

    if (result.length === 0) {
      return res.status(404).send("Profesor no encontrado");
    }

    const professorId = result[0].ID;
    console.log("ID prof:",professorId);

    // SQL query to delete related records in PROFESOR_MATERIAS
    const deleteProfesorMateriasQuery = `
        DELETE FROM PROFESOR_MATERIAS
        WHERE PROFESOR_ID = ?
    `;

    connection.query(deleteProfesorMateriasQuery, [professorId], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al eliminar materias del profesor");
      }

      // SQL query to delete related records in COMENTARIOS
      const deleteComentariosQuery = `
            DELETE FROM COMENTARIOS
            WHERE PROFESORES_ID = ?
        `;

      connection.query(deleteComentariosQuery, [professorId], (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("Error al eliminar comentarios del profesor");
        }

        // SQL query to delete the professor
        const deleteProfessorQuery = `
                DELETE FROM PROFESORES
                WHERE ID = ?
            `;

        connection.query(deleteProfessorQuery, [professorId], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar el profesor");
          }

          res.status(200).send("Profesor eliminado con éxito");
        });
      });
    });
  });
});

//Solicitud de profesor
router.post("/solcitarProf", (req, res) => {
  const nombreProf = req.body.nombreProf;
  const apellidoP = req.body.apellidoP;
  const apellidoM = req.body.apellidoM;
  const id_carrera = req.body.id_carrera;
  const query1 =
    "INSERT INTO profesores (nombre, apellido_paterno, apellido_materno, verificado) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query1,
    [nombreProf, apellidoP, apellidoM, 0, id_carrera],
    (err, results) => {
      if (err) {
        console.error("Error al subir solicitud de profesor", err);
        return res
          .status(500)
          .json({
            error: "Error al subir solicitud de profesor",
            details: err,
          });
      }
      res.status(200).json({ message: "Exito al subir solicitud de profesor" });
    }
  );
});

//Aceptar solicitud de profesor
router.post("/aceptarProf", (req, res) => {
  const nombreProf = req.body.nombre;
  const query = `UPDATE PROFESORES
    SET VERIFICADO = TRUE
    WHERE ID = (
        SELECT ID
        FROM (
            SELECT ID
            FROM PROFESORES
            WHERE CONCAT(NOMBRE, ' ', APELLIDO_PATERNO, ' ', APELLIDO_MATERNO) = ?
            LIMIT 1
        ) AS subquery
    )`;
  connection.query(query, [nombreProf], (err, results) => {
    if (err) {
      console.error("Error al aceptar prof", err);
      return res
        .status(500)
        .json({ error: "Error al saceptar prof", details: err });
    }
    res.status(200).json({ message: "Exito al aceptar prof" });
  });
});

//Calificar profesor
router.post("/calProfesor", (req, res) => {
  const nombreMateria = req.body.materia;
  query1 = `
    SELECT 
    id FROM materias 
    WHERE materia = ?
    LIMIT 1`
  connection.query(query1, [nombreMateria], (err, results) => {
    if (err) {
      console.error("Error al conseguir id de materia", err);
      return res
        .status(500)
        .json({ error: "Error al conseguir id de materia", details: err });
    }

    const idMateria = results[0].id;

    const idAlumno = req.body.idAlumno;
    const idProfesor = req.body.idProfesor;
    const calificacion = req.body.calif;
    const dificultad = req.body.dificultad;
    const comentario = req.body.comentario;
    const recomienda = req.body.recomienda;
    const aprobo = req.body.aprobo;
    const query2 = `INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, MATERIA_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query2, [idAlumno, idProfesor, idMateria, calificacion, dificultad, comentario, recomienda, aprobo], (err, results) => {
      if (err) {
        console.error("Error al calificar profesor", err);
        return res
          .status(500)
          .json({ error: "Error al calificar profesor", details: err });
      }
      res.status(200).json({ message: "Exito al calificar profesor" });
    });
  });
});

module.exports = router;
