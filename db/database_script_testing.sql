DROP DATABASE poliprofes;
CREATE DATABASE IF NOT EXISTS POLIPROFES;
USE POLIPROFES;

CREATE TABLE IF NOT EXISTS CARRERAS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CARRERA VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS MATERIAS(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    MATERIA VARCHAR(50) NOT NULL,
    CARRERA_ID INT NOT NULL, 
    FOREIGN KEY (CARRERA_ID) REFERENCES CARRERAS(ID)
);

CREATE TABLE IF NOT EXISTS PROFESORES(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(50) NOT NULL,
    APELLIDO_PATERNO VARCHAR(50) NOT NULL,
    APELLIDO_MATERNO VARCHAR(50) NOT NULL,
    VERIFICADO BOOL NOT NULL
);

CREATE TABLE IF NOT EXISTS PROFESOR_MATERIAS(
	PROFESOR_ID INT,
    MATERIA_ID INT, 
    PRIMARY KEY(PROFESOR_ID, MATERIA_ID),
    FOREIGN KEY (PROFESOR_ID) REFERENCES PROFESORES(ID),
    FOREIGN KEY (MATERIA_ID) REFERENCES MATERIAS(ID)
);

CREATE TABLE IF NOT EXISTS ALUMNOS(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(50) NOT NULL,
    APELLIDOS VARCHAR(50) NOT NULL, 
    CORREO VARCHAR(50) NOT NULL,
    CONTRASENIA VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS COMENTARIOS(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    ALUMNOS_ID INT,
    PROFESORES_ID INT,
    CALIFICACION INT NOT NULL,
    DIFICULTAD ENUM('Muy Facil', 'Facil', 'Intermedio', 'Dificil', 'Muy Dificil') NOT NULL,
    COMENTARIO VARCHAR(350) NOT NULL,
    RECOMIENDA BOOL NOT NULL,
    APROBO BOOL NOT NULL,
    FECHA DATETIME NOT NULL,
    FOREIGN KEY (ALUMNOS_ID) REFERENCES ALUMNOS(ID),
    FOREIGN KEY (PROFESORES_ID) REFERENCES PROFESORES(ID)
);

INSERT INTO CARRERAS (CARRERA) VALUES ('Ingenieria en computacion');
INSERT INTO CARRERAS (CARRERA) VALUES ('Ingenieria en comunicaciones y electronica');
INSERT INTO CARRERAS (CARRERA) VALUES ('Ingenieria mecanica');
INSERT INTO CARRERAS (CARRERA) VALUES ('Ingenieria en sistemas automotrices');

INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Roberto', 'Martinez', 'robertomartinez@alumno.ipn.mx', '24681012');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Maria', 'Lopez', 'marialopez@alumno.ipn.mx', '12345678');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Juan', 'Perez', 'juanperez@alumno.ipn.mx', '87654321');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Ana', 'Garcia', 'anagarcia@alumno.ipn.mx', 'abcdefg1');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Carlos', 'Hernandez', 'carloshernandez@alumno.ipn.mx', 'hijklmn2');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Luis', 'Ramirez', 'luisramirez@alumno.ipn.mx', 'mnopqr3');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Laura', 'Sanchez', 'laurasanchez@alumno.ipn.mx', 'stuvwx4');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Jose', 'Diaz', 'josediaz@alumno.ipn.mx', 'yzabcd5');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Sofia', 'Martinez', 'sofiamartinez@alumno.ipn.mx', 'efghij6');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Diego', 'Gomez', 'diegogomez@alumno.ipn.mx', 'klmnop7');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Fernanda', 'Gonzalez', 'fernandagonzalez@alumno.ipn.mx', 'qrstuv8');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Miguel', 'Rodriguez', 'miguelrodriguez@alumno.ipn.mx', 'wxyzab9');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Isabel', 'Morales', 'isabelmorales@alumno.ipn.mx', 'cdefgh10');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Ricardo', 'Ortega', 'ricardoortega@alumno.ipn.mx', 'ijklmn11');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Elena', 'Ruiz', 'elenaruiz@alumno.ipn.mx', 'opqrst12');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Jorge', 'Mendoza', 'jorgemendoza@alumno.ipn.mx', 'uvwxyz13');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Valeria', 'Silva', 'valeriasilva@alumno.ipn.mx', 'abcde14');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Francisco', 'Castro', 'franciscocastro@alumno.ipn.mx', 'fghij15');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Paola', 'Navarro', 'paolanavarro@alumno.ipn.mx', 'klmno16');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Alberto', 'Reyes', 'albertoreyes@alumno.ipn.mx', 'pqrst17');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Adriana', 'Cruz', 'adrianacruz@alumno.ipn.mx', 'uvwxy18');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Oscar', 'Flores', 'oscarflores@alumno.ipn.mx', 'zabcd19');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Monica', 'Torres', 'monicatorres@alumno.ipn.mx', 'efghi20');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Guillermo', 'Chavez', 'guillermochavez@alumno.ipn.mx', 'jklmn21');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Patricia', 'Ramos', 'patriciaramos@alumno.ipn.mx', 'opqrs22');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Raul', 'Lozano', 'raullozano@alumno.ipn.mx', 'tuvwx23');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Gabriela', 'Vega', 'gabrielavega@alumno.ipn.mx', 'yzabc24');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Rafael', 'Medina', 'rafaelmedina@alumno.ipn.mx', 'defgh25');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Diana', 'Soto', 'dianasoto@alumno.ipn.mx', 'ijklm26');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Martin', 'Rojas', 'martinrojas@alumno.ipn.mx', 'nopqr27');
INSERT INTO ALUMNOS (NOMBRE, APELLIDOS, CORREO, CONTRASENIA) 
VALUES ('Teresa', 'Pineda', 'teresapineda@alumno.ipn.mx', 'stuvw28');

INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Christian', 'Martinoli', 'Bolaños', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Juan', 'Perez', 'Gomez', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Maria', 'Lopez', 'Hernandez', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Carlos', 'Ramirez', 'Torres', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Laura', 'Gonzalez', 'Martinez', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Luis', 'Fernandez', 'Ruiz', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Ana', 'Sanchez', 'Diaz', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Miguel', 'Garcia', 'Jimenez', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Sandra', 'Rodriguez', 'Morales', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Jorge', 'Hernandez', 'Castro', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Patricia', 'Mendoza', 'Vargas', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Diego', 'Cruz', 'Mendez', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Gabriela', 'Navarro', 'Santos', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Rafael', 'Flores', 'Cortes', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Sofia', 'Ortega', 'Rios', 1);
INSERT INTO PROFESORES (NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, VERIFICADO)
VALUES ('Alberto', 'Chavez', 'Reyes', 1);
 
INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (1, 2, 9, 'Facil', 'Excelente profesor, explica de manera clara y concisa. Sus clases son muy interesantes y motivadoras.', 1, 1, '2024-05-23 12:00:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (2, 5, 10, 'Muy Facil', 'El profesor es increíblemente bueno. Su forma de enseñar hace que los temas difíciles sean fáciles de entender. ¡Lo recomiendo completamente!', 1, 1, '2024-05-20 10:30:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (3, 8, 9, 'Facil', 'El profesor tiene un gran dominio del tema y lo explica de manera clara y dinámica. Sin duda alguna, uno de los mejores profesores que he tenido.', 1, 1, '2024-05-17 14:45:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (4, 12, 8, 'Intermedio', 'A pesar de que el tema era complicado, el profesor logró explicarlo de manera comprensible. Sin embargo, creo que podría mejorar en su método de evaluación.', 0, 1, '2024-05-15 09:00:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (5, 3, 7, 'Dificil', 'El profesor tiene conocimientos sólidos, pero su forma de enseñar puede ser confusa a veces. Considero que necesita mejorar su claridad en la explicación de los temas.', 0, 0, '2024-05-25 11:20:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (6, 10, 9, 'Facil', 'El profesor tiene un estilo de enseñanza muy ameno y se preocupa por el aprendizaje de sus alumnos. Me gustaría seguir teniéndolo como profesor en futuras asignaturas.', 1, 1, '2024-05-28 16:00:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (7, 6, 8, 'Intermedio', 'Aunque el profesor tiene buenas intenciones, a veces su explicación puede ser un poco confusa. Sugiero que sea más claro en sus ejemplos y enfoque más en los conceptos clave.', 0, 1, '2024-05-13 10:15:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (8, 14, 10, 'Muy Facil', 'El profesor es simplemente brillante. Su pasión por el tema se refleja en sus clases y hace que incluso los conceptos más difíciles sean fáciles de entender.', 1, 1, '2024-05-30 09:45:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (9, 1, 9, 'Facil', 'El profesor tiene una gran habilidad para explicar los temas difíciles de manera sencilla. Además, siempre está dispuesto a ayudar a sus alumnos.', 1, 1, '2024-05-19 13:30:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (10, 11, 8, 'Intermedio', 'El profesor tiene un buen manejo del tema, pero a veces sus clases pueden ser un poco monótonas. Sugiero que incorpore actividades más interactivas para mantener la atención de los alumnos.', 0, 1, '2024-05-21 15:00:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (11, 9, 7, 'Dificil', 'El profesor tiene un enfoque único en la enseñanza, pero a veces su estilo puede ser abrumador. Considero que podría proporcionar más material de apoyo para ayudar a los estudiantes.', 0, 0, '2024-05-24 10:10:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (12, 7, 9, 'Facil', 'El profesor es muy dedicado y se preocupa por el progreso de sus alumnos. Sin embargo, creo que podría ser un poco más claro en la explicación de ciertos conceptos.', 1, 1, '2024-05-16 14:20:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (13, 4, 8, 'Intermedio', 'El profesor tiene un buen manejo del tema, pero su método de enseñanza puede ser un poco repetitivo. Sugiero que incorpore más variedad en sus clases para mantener el interés de los alumnos.', 0, 1, '2024-05-22 11:30:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (14, 16, 10, 'Muy Facil', 'El profesor es excelente en todos los sentidos. Tiene una pasión contagiosa por el tema y hace que aprender sea divertido y emocionante. Lo recomendaría sin dudarlo.', 1, 1, '2024-05-29 08:50:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (15, 13, 8, 'Facil', 'El profesor tiene un buen manejo del tema, pero su método de enseñanza puede ser un poco repetitivo. Sugiero que incorpore más variedad en sus clases para mantener el interés de los alumnos.', 0, 1, '2024-05-18 12:40:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (16, 15, 9, 'Facil', 'El profesor es muy dedicado y se preocupa por el progreso de sus alumnos. Sin embargo, creo que podría ser un poco más claro en la explicación de ciertos conceptos.', 1, 1, '2024-05-26 10:00:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (17, 2, 7, 'Dificil', 'El profesor tiene conocimientos sólidos, pero su forma de enseñar puede ser un poco aburrida. Sugiero que incorpore ejemplos prácticos y actividades más interactivas.', 0, 0, '2024-05-14 09:15:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (18, 5, 9, 'Facil', 'El profesor es excepcional en su forma de enseñar. Siempre está dispuesto a ayudar y se asegura de que todos los alumnos comprendan completamente el material.', 1, 1, '2024-05-27 15:30:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (19, 8, 8, 'Intermedio', 'El profesor tiene un buen conocimiento del tema, pero su método de enseñanza puede ser un poco repetitivo. Sugiero que incorpore más variedad en sus clases para mantener el interés de los alumnos.', 0, 1, '2024-05-16 11:45:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (20, 12, 10, 'Muy Facil', 'El profesor es simplemente excepcional. Su pasión por el tema se refleja en sus clases y hace que aprender sea un placer. Lo recomendaría sin reservas.', 1, 1, '2024-05-30 10:20:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (21, 3, 8, 'Facil', 'El profesor tiene un buen conocimiento del tema, pero su explicación puede ser un poco desorganizada a veces. Sugiero que organice mejor sus clases para una mejor comprensión.', 0, 1, '2024-05-19 14:50:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (22, 10, 9, 'Facil', 'El profesor es muy apasionado por el tema y esto se refleja en sus clases. Siempre está disponible para responder preguntas y ayudar a los estudiantes.', 1, 1, '2024-05-18 08:40:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (23, 6, 7, 'Dificil', 'El profesor tiene un buen conocimiento del tema, pero su estilo de enseñanza puede ser un poco aburrido. Sugiero que incorpore más ejemplos prácticos y actividades dinámicas.', 0, 0, '2024-05-14 11:15:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (24, 14, 10, 'Muy Facil', 'El profesor es excepcional en todos los aspectos. Sus clases son dinámicas, interesantes y fáciles de seguir. Lo recomendaría sin dudarlo.', 1, 1, '2024-05-29 09:30:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (25, 1, 8, 'Facil', 'El profesor tiene un buen conocimiento del tema, pero a veces su explicación puede ser un poco confusa. Sugiero que proporcione más ejemplos prácticos para ayudar a los estudiantes a comprender mejor.', 0, 1, '2024-05-20 12:50:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (26, 11, 9, 'Facil', 'El profesor es muy dedicado y se preocupa por el progreso de sus alumnos. Sus explicaciones son claras y siempre está dispuesto a ayudar.', 1, 1, '2024-05-17 10:40:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (27, 9, 7, 'Intermedio', 'El profesor tiene un buen dominio del tema, pero a veces su explicación puede ser un poco confusa. Sugiero que organice mejor sus clases para una mejor comprensión.', 0, 1, '2024-05-16 13:20:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (28, 7, 9, 'Facil', 'El profesor es excelente en su forma de enseñar. Siempre está disponible para responder preguntas y explicar conceptos difíciles de manera clara.', 1, 1, '2024-05-15 15:00:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (29, 16, 10, 'Muy Facil', 'El profesor es simplemente excepcional. Su pasión por el tema se refleja en sus clases y hace que aprender sea un placer. Lo recomendaría sin reservas.', 1, 1, '2024-05-14 11:30:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (30, 2, 8, 'Facil', 'El profesor tiene un buen manejo del tema, pero su explicación puede ser un poco confusa a veces. Sugiero que proporcione más ejemplos prácticos para ayudar a los estudiantes a comprender mejor.', 0, 1, '2024-05-13 14:20:00');

INSERT INTO COMENTARIOS (ALUMNOS_ID, PROFESORES_ID, CALIFICACION, DIFICULTAD, COMENTARIO, RECOMIENDA, APROBO, FECHA)
VALUES (31, 4, 9, 'Facil', 'El profesor es excepcional en su forma de enseñar. Siempre está disponible para ayudar a los estudiantes y proporcionarles el apoyo que necesitan.', 1, 1, '2024-05-12 16:45:00');

INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Programacion orientada a objetos', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Estructuras de Datos', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Bases de Datos', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Redes de Computadoras', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas Operativos', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Inteligencia Artificial', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Ingeniería de Software', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Seguridad Informática', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Algoritmos Avanzados', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Computación Gráfica', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Arquitectura de Computadoras', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Desarrollo Web', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas Distribuidos', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Cómputo en la Nube', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Minería de Datos', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Procesamiento de Lenguaje Natural', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Ciberseguridad', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Desarrollo de Aplicaciones Móviles', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Robótica', 1);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Big Data', 1);

INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Circuitos Eléctricos', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electrónica Digital', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Telecomunicaciones', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Antenas y Propagación', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Microcontroladores', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Señales y Sistemas', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electrónica de Potencia', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Comunicaciones Digitales', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Procesamiento de Señales', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Redes de Comunicaciones', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Radiofrecuencia', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electrónica Analógica', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas Embebidos', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electromagnetismo', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Transmisión de Datos', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Control', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Televisión Digital', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Fibras Ópticas', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Comunicaciones Inalámbricas', 2);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Tecnologías de Satélites', 2);

INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Termodinámica', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Mecánica de Fluidos', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Resistencia de Materiales', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Dibujo Técnico', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Manufactura', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Máquinas Térmicas', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Elementos de Máquinas', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Dinámica de Sistemas Mecánicos', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Procesos de Fabricación', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Control Automático', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Vibraciones Mecánicas', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Diseño de Máquinas', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Transmisión de Calor', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Mecánica de Materiales', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Robótica Industrial', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Ingeniería de Materiales', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Ingeniería Automotriz', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Energías Renovables', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Mecánica Computacional', 3);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas Neumáticos e Hidráulicos', 3);

INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Mecánica de Vehículos', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electrónica Automotriz', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Suspensión', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Frenos', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Motores de Combustión Interna', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Aerodinámica de Vehículos', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Diagnóstico Automotriz', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Tecnología de Combustibles', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electromecánica Automotriz', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Transmisión', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Ingeniería de Vehículos Eléctricos', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Seguridad Activa y Pasiva', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Control de Emisiones', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Tecnología de Baterías', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Electrificación de Vehículos', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Infoentretenimiento', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Mantenimiento Automotriz', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Diseño de Chasis', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Materiales Automotrices', 4);
INSERT INTO MATERIAS(MATERIA, CARRERA_ID) VALUES ('Sistemas de Gestión de Energía', 4);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(1, 3),
(1, 12),
(1, 7),
(1, 18);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(2, 21),
(2, 35),
(2, 29),
(2, 37);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(3, 45),
(3, 50),
(3, 56),
(3, 48);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(4, 65),
(4, 71),
(4, 63),
(4, 76);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(5, 4),
(5, 13),
(5, 7),
(5, 18);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(6, 22),
(6, 34),
(6, 28),
(6, 30);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(7, 41),
(7, 58),
(7, 55),
(7, 44);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(8, 67),
(8, 65),
(8, 78),
(8, 79);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(9, 1),
(9, 6),
(9, 19),
(9, 4);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(10, 21),
(10, 35),
(10, 33),
(10, 22);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(11, 60),
(11, 51),
(11, 57),
(11, 56);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(12, 75),
(12, 78),
(12, 68),
(12, 73);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(13, 3),
(13, 4),
(13, 7),
(13, 10);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(14, 22),
(14, 23),
(14, 27),
(14, 32);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(15, 47),
(15, 44),
(15, 43),
(15, 52);

INSERT INTO PROFESOR_MATERIAS (PROFESOR_ID, MATERIA_ID) VALUES 
(16, 63),
(16, 78),
(16, 75),
(16, 70);