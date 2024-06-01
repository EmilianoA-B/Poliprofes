const express = require("express");
const router = express.Router();

const connection = require("./db");

// API para obtener todas las carreras
router.get("/getCarreras", (req, res) => {
  const query = "SELECT carrera FROM carreras";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al desplegar carreras", err);
      res.status(500).send("Error al desplegar carreras");
      return;
    }
    res.json(results);
  });
});

//API para obtener el id dependiendo de una carrera dada
router.post("/getIdByCarrera", (req, res) => {
  const carrera = req.body.carrera;
  const query = "SELECT id FROM carreras WHERE carrera = ?";
  connection.query(query, [carrera], (err, results) => {
    if (err) {
      console.error("Error al buscar ID", err);
      res.status(500).send("Error al buscar ID");
      return;
    }
    if (results.length > 0) {
      res.json({ id: results[0].id }); //Regresa un array, si hay elementos repetidos en la lista, puede ser un problema
    } else {
      res.status(404).send("No se encontro el id");
    }
  });
});

//POST para desplegar las materias ligadas a una carrera
router.post("/getMaterias", (req, res) => {
  const carrera = req.body.carrera;
  console.log("Carrera para buscar sus materias:", carrera);
  const queryforID = "SELECT id FROM carreras WHERE carrera = ?";
  connection.query(queryforID, [carrera], (err, results) => {
    //Se consigue el ID
    if (err) {
      console.error("Error al buscar ID de carrera", err);
      res.status(500).send("Error al buscar ID de carrera");
      return;
    }
    console.log("Exito al buscar ID de carrera");
    const idCarrera = results[0].id;
    const queryforMaterias =
      "SELECT materia FROM materias WHERE carrera_id = ?";
    connection.query(queryforMaterias, [idCarrera], (err, resultado) => {
      //Usando el id se buscan todas las materias
      if (err) {
        console.error("Error al al regresar materias", err);
        res.status(500).send("Error al al regresar materias");
        return;
      }
      console.log("Exito al regresar materias");
      res.json(resultado);
    });
  });
});

//POST para desplegar las materias ligadas a un profesor
router.get("/getMateriasV2", (req, res) => {
    const profesor = req.query.profesor ? `${req.query.profesor}` : "%";
    console.log("Nombre desde la API:", profesor);
    const findProfessorIdQuery = `
      SELECT ID
      FROM PROFESORES
      WHERE CONCAT(NOMBRE, ' ', APELLIDO_PATERNO, ' ', APELLIDO_MATERNO) = ?
      LIMIT 1`;
    connection.query(findProfessorIdQuery, [profesor], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al buscar el profesor");
      }
  
      if (result.length === 0) {
        return res.status(404).send("Profesor no encontrado");
      }
  
      const professorId = result[0].ID;
      console.log("ID prof:", professorId);
      const query = `
        SELECT MATERIAS.MATERIA 
        FROM MATERIAS
        INNER JOIN PROFESOR_MATERIAS ON MATERIAS.ID = PROFESOR_MATERIAS.MATERIA_ID
        WHERE PROFESOR_MATERIAS.PROFESOR_ID = ?;`;
        
      connection.query(query, [professorId], (err, results) => {
        if (err) {
          console.error("Error al desplegar los comentarios", err);
          res.status(500).send("Error al desplegar los comentarios");
          return;
        }
        console.log(results);
        res.json(
          results.map((row) => ({
            materias: row.MATERIA,
            idprof: professorId
          }))
        );
      });
    });
  });

//API para obtener el id de un alumno dado su correo electronico
router.post("/getIdAlumnoByCorreo", (req, res) => {
  const correo = req.body.correo;
  const query = "SELECT id FROM alumnos WHERE correo = ?";
  connection.query(query, [correo], (err, results) => {
    if (err) {
      console.error("Error al buscar ID del alumno", err);
      res.status(500).send("Error al buscar ID del alumno");
      return;
    }
    if (results.length > 0) {
      res.json({ id: results[0].id }); //Regresa un array, si hay elementos repetidos en la lista, puede ser un problema
    } else {
      res.status(404).send("No se encontro el id del alumno");
    }
  });
});

//API para obtener el id de un profesor dados sus apellidos
router.post("/getIdProfesorByApellidos", (req, res) => {
  const apellidos = req.body.apellidos;
  const query = "SELECT id FROM profesores WHERE apellidos = ?";
  connection.query(query, [apellidos], (err, results) => {
    if (err) {
      console.error("Error al buscar ID del profesor", err);
      res.status(500).send("Error al buscar ID del profesor");
      return;
    }
    if (results.length > 0) {
      res.json({ id: results[0].id }); //Regresa un array, si hay elementos repetidos en la lista, puede ser un problema
    } else {
      res.status(404).send("No se encontro el id del profesor");
    }
  });
});


//API para get solicitudes de profesores
router.get("/getSolProf", (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const start = (page - 1) * limit;

  connection.query(
    "SELECT COUNT(ID) AS total FROM PROFESORES WHERE verificado = 0",
    (err, result) => {
      if (err) throw err;
      const totalRows = result[0].total;
      const totalPages = Math.ceil(totalRows / limit);

      connection.query(
        `SELECT 
            CONCAT(P.NOMBRE, ' ', P.APELLIDO_PATERNO, ' ', P.APELLIDO_MATERNO) AS NOMBRE,
            C.CARRERA,
            GROUP_CONCAT(M.MATERIA SEPARATOR ', ') AS MATERIAS
        FROM PROFESOR_MATERIAS AS PM
        INNER JOIN MATERIAS AS M ON PM.MATERIA_ID = M.ID
        INNER JOIN PROFESORES AS P ON PM.PROFESOR_ID = P.ID
        INNER JOIN CARRERAS AS C ON M.CARRERA_ID = C.ID
        WHERE P.VERIFICADO = FALSE
        GROUP BY P.ID, P.NOMBRE, P.APELLIDO_PATERNO, P.APELLIDO_MATERNO, C.CARRERA
        ORDER BY P.ID ASC
        LIMIT ?, ?`,
        [start, limit],
        (err, results) => {
          if (err) throw err;
          res.json({
            profesores: results,
            totalPages: totalPages,
            currentPage: page,
          });
        }
      );
    }
  );
});

//API para index, 3 profes aleatorios
router.get("/getProfesAleatorios", (req, res) => {
  const query = `SELECT 
    CONCAT(PROFESORES.NOMBRE, ' ', PROFESORES.APELLIDO_PATERNO, ' ', PROFESORES.APELLIDO_MATERNO) AS NOMBRE,
    ROUND(COMENTS.PROMEDIO, 1) AS CALIFICACION,
    ROUND(APROBADO.INDICE * 100) AS INDICE_APROBACION
    FROM PROFESOR_MATERIAS
    INNER JOIN MATERIAS ON PROFESOR_MATERIAS.MATERIA_ID = MATERIAS.ID
    INNER JOIN PROFESORES ON PROFESOR_MATERIAS.PROFESOR_ID = PROFESORES.ID
    INNER JOIN (
    SELECT 
        PROFESORES_ID,
        AVG(CALIFICACION) AS PROMEDIO
        FROM COMENTARIOS
        GROUP BY PROFESORES_ID
    ) AS COMENTS ON PROFESOR_MATERIAS.PROFESOR_ID = COMENTS.PROFESORES_ID
    INNER JOIN (
    SELECT 
        PROFESORES_ID,
        AVG(APROBO) AS INDICE
        FROM COMENTARIOS
        GROUP BY PROFESORES_ID
    ) AS APROBADO ON PROFESOR_MATERIAS.PROFESOR_ID = APROBADO.PROFESORES_ID
    WHERE PROFESORES.VERIFICADO = TRUE
    ORDER BY RAND()
    LIMIT 3`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al desplegar solicitudes de profesor", err);
      res.status(500).send("Error al desplegar solicitudes de profesor");
      return;
    }
    res.json(results);
  });
});

//API para obtener profes por nombre, calificacion y materias
router.get("/getProfesByCalificacionAndMaterias", (req, res) => {
  const carrera = req.query.carrera ? `%${req.query.carrera}%` : "%";
  const profesor = req.query.profesor ? `%${req.query.profesor}%` : "%";
  const evaluacion = req.query.evaluacion;
  const queryParams = [];
  let query = `SELECT 
        CONCAT(NOMBRE, ' ', APELLIDO_PATERNO, ' ',APELLIDO_MATERNO) AS NOMBRE, 
        IFNULL(ROUND(AVG(CALIFICACION), 1), 0) AS CALIFICACION,
        IFNULL(GROUP_CONCAT(MATERIA SEPARATOR ', '), '') AS MATERIAS FROM PROFESOR_MATERIAS
        RIGHT JOIN PROFESORES ON PROFESOR_MATERIAS.PROFESOR_ID = PROFESORES.ID
        LEFT JOIN MATERIAS ON PROFESOR_MATERIAS.MATERIA_ID = MATERIAS.ID
        LEFT JOIN CARRERAS ON MATERIAS.CARRERA_ID = CARRERAS.ID
        LEFT JOIN (
            SELECT PROFESORES_ID, AVG(CALIFICACION) AS CALIFICACION 
            FROM COMENTARIOS GROUP BY PROFESORES_ID)
        AS CALIFICACIONES ON PROFESORES.ID = CALIFICACIONES.PROFESORES_ID
        WHERE VERIFICADO = TRUE`;
  if (evaluacion !== "mas_recientes") {
    if (carrera != "%") {
      query += ` AND CARRERA LIKE ? GROUP BY PROFESORES.ID`;
      queryParams.push(carrera);
    } else if (profesor != "%") {
      query += ` GROUP BY PROFESORES.ID HAVING NOMBRE LIKE ?`;
      queryParams.push(profesor);
    } else {
      query += ` GROUP BY PROFESORES.ID`;
      if (evaluacion === "mejores") query += ` ORDER BY CALIFICACION DESC`;
      else if (evaluacion === "peores") query += ` ORDER BY CALIFICACION ASC`;
    }
  } else {
    query += ` GROUP BY PROFESORES.ID ORDER BY CALIFICACION`;
  }
  connection.query(query, [queryParams], (err, results) => {
    if (err) {
      console.error("Error al desplegar solicitudes de profesor", err);
      res.status(500).send("Error al desplegar solicitudes de profesor");
      return;
    }
    res.json(
      results.map((row) => ({
        nombre: row.NOMBRE,
        calificacion: row.CALIFICACION,
        materias: row.MATERIAS ? row.MATERIAS.split(", ") : [],
      }))
    );
  });
});

router.get(
  "/getProfesorWithMateriasCalificacionAndProbabilidad",
  (req, res) => {
    const profesor = req.query.profesor ? `%${req.query.profesor}%` : "%";
    const query = `SELECT 
        CONCAT(NOMBRE, ' ', APELLIDO_PATERNO, ' ',APELLIDO_MATERNO) AS NOMBRE, 
        IFNULL(GROUP_CONCAT(MATERIA SEPARATOR ', '), '') AS MATERIAS,
        IFNULL(ROUND(AVG(CALIFICACION), 1), 0) AS CALIFICACION,
        IFNULL(ROUND(AVG(PROBABILIDAD),0), 0) AS PROBABILIDAD
        FROM PROFESOR_MATERIAS
        RIGHT JOIN PROFESORES ON PROFESOR_MATERIAS.PROFESOR_ID = PROFESORES.ID
        LEFT JOIN MATERIAS ON PROFESOR_MATERIAS.MATERIA_ID = MATERIAS.ID
        LEFT JOIN CARRERAS ON MATERIAS.CARRERA_ID = CARRERAS.ID
        LEFT JOIN (
            SELECT PROFESORES_ID, AVG(CALIFICACION) AS CALIFICACION, ROUND(AVG(APROBO)*100,0) AS PROBABILIDAD
            FROM COMENTARIOS GROUP BY PROFESORES_ID)
        AS CALIFICACIONES ON PROFESORES.ID = CALIFICACIONES.PROFESORES_ID
        WHERE VERIFICADO = TRUE
        GROUP BY PROFESORES.ID
        HAVING NOMBRE LIKE ?`;

    connection.query(query, [profesor], (err, results) => {
      if (err) {
        console.error("Error al desplegar solicitudes de profesor", err);
        res.status(500).send("Error al desplegar solicitudes de profesor");
        return;
      }
      res.json(
        results.map((row) => ({
          nombre: row.NOMBRE,
          materias: row.MATERIAS ? row.MATERIAS.split(", ") : [],
          calificacion: row.CALIFICACION,
          probabilidad: row.PROBABILIDAD,
        }))
      );
    });
  }
);

//API para el despliegue de comentarios
router.get("/getComentariosV2", (req, res) => {
  const profesor = req.query.profesor ? `%${req.query.profesor}%` : "%";
  const query = `SELECT DISTINCT
        CONCAT(PROFESORES.NOMBRE, ' ', PROFESORES.APELLIDO_PATERNO, ' ', PROFESORES.APELLIDO_MATERNO) AS NOMBRE,
        COMENTARIOS.CALIFICACION,
        COMENTARIOS.DIFICULTAD,
        COMENTARIOS.COMENTARIO,
        COMENTARIOS.APROBO,
        COMENTARIOS.RECOMIENDA,
        COMENTARIOS.ID AS ID_COMENTARIO,
        DATE_FORMAT(COMENTARIOS.FECHA, '%e de %M de %Y a la %l:%i%p') AS FECHA,
        MATERIA
    FROM PROFESOR_MATERIAS
    INNER JOIN MATERIAS ON PROFESOR_MATERIAS.MATERIA_ID = MATERIAS.ID
    INNER JOIN PROFESORES ON PROFESOR_MATERIAS.PROFESOR_ID = PROFESORES.ID
    INNER JOIN COMENTARIOS ON PROFESOR_MATERIAS.PROFESOR_ID = COMENTARIOS.PROFESORES_ID
    WHERE PROFESORES.VERIFICADO = TRUE`;

  connection.query(query, [profesor], (err, results) => {
    if (err) {
      console.error("Error al desplegar los comentarios", err);
      res.status(500).send("Error al desplegar los comentarios");
      return;
      
    }
    res.json(
      results.map((row) => ({
        nombre: row.NOMBRE,
        calificacion: row.CALIFICACION,
        dificultad: row.DIFICULTAD,
        comentario: row.COMENTARIO,
        aprobo: row.APROBO,
        recomienda: row.RECOMIENDA,
        id_comentario: row.ID_COMENTARIO,
        fecha: row.FECHA,
        materia: row.MATERIA
      }))
    );
  });
});

//API para el despliegue de comentarios para pag del prof
router.get("/getComentariosV3", (req, res) => {
  const profesor = req.query.profesor ? `${req.query.profesor}` : "%";
  console.log("Nombre desde la API:", profesor);
  const findProfessorIdQuery = `
    SELECT ID
    FROM PROFESORES
    WHERE CONCAT(NOMBRE, ' ', APELLIDO_PATERNO, ' ', APELLIDO_MATERNO) = ?
    LIMIT 1`;
  connection.query(findProfessorIdQuery, [profesor], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al buscar el profesor");
    }

    if (result.length === 0) {
      return res.status(404).send("Profesor no encontrado");
    }

    const professorId = result[0].ID;
    console.log("ID prof:", professorId);
    const query = `
    SELECT 
    CONCAT(ALUMNOS.NOMBRE, ' ', ALUMNOS.APELLIDOS) AS NOMBRE,
    COMENTARIOS.CALIFICACION,
    COMENTARIOS.DIFICULTAD,
    COMENTARIOS.COMENTARIO,
    COMENTARIOS.APROBO,
    COMENTARIOS.RECOMIENDA,
    COMENTARIOS.ID AS ID_COMENTARIO,
    DATE_FORMAT(COMENTARIOS.FECHA, '%e de %M de %Y a la %l:%i%p') AS FECHA,
    MATERIAS.MATERIA
    FROM COMENTARIOS
    INNER JOIN ALUMNOS ON COMENTARIOS.ALUMNOS_ID = ALUMNOS.ID
    INNER JOIN MATERIAS ON COMENTARIOS.MATERIA_ID = MATERIAS.ID
    WHERE COMENTARIOS.PROFESORES_ID = ?;
`;

    connection.query(query, [professorId], (err, results) => {
      if (err) {
        console.error("Error al desplegar los comentarios", err);
        res.status(500).send("Error al desplegar los comentarios");
        return;
      }
      res.json(
        results.map((row) => ({
          nombre: row.NOMBRE,
          calificacion: row.CALIFICACION,
          dificultad: row.DIFICULTAD,
          comentario: row.COMENTARIO,
          aprobo: row.APROBO,
          recomienda: row.RECOMIENDA,
          id_comentario: row.ID_COMENTARIO,
          fecha: row.FECHA,
          materia: row.MATERIA
        }))
      );
    });
  });
});

module.exports = router;
