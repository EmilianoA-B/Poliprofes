// Variable global para almacenar una referencia al divProfesor que se debe eliminar
var divProfesorToRemove;

// Función para dar de baja al profesor
function darDeBaja() {
        // Verificar si divProfesorToRemove está definido y no es null
     if (divProfesorToRemove) {
            // Remover el divProfesor
        divProfesorToRemove.remove();
            // Limpiar la variable global
        divProfesorToRemove = null;
    }
    cerrarModal();
}

// Función para mostrar el modal de confirmación
function mostrarModal() {
    var modal = document.getElementById("modal");
    var overlay = document.getElementById("overlay");
    modal.style.display = "block";
    overlay.style.display = "block";
}


// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById("modal");
    var overlay = document.getElementById("overlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}


document.addEventListener('DOMContentLoaded', () => {
    // Datos del profesor recibidos del backend (suponiendo que sea un array de objetos)
    var profesores = [
        {
            nombre: "Juan Pérez",
            carrera: "Ingeniería Informática",
            materias: ["Programación", "Bases de Datos"]
        },
        {
            nombre: "María López",
            carrera: "Matemáticas",
            materias: ["Cálculo", "Álgebra"]
        },
        // Agrega más objetos según necesites
        {
            nombre: "Carlos Gómez",
            carrera: "Matemáticas",
            materias: ["Cálculo", "Álgebra"]
        }
    ];
    
    // Función para crear un contenedor de profesor
    function crearContenedor(profesor) {
        var divProfesor = document.createElement("div");
        divProfesor.classList.add("profesor-container");
        
        var nombre = document.createElement("div");
        nombre.classList.add("nombre");
        nombre.textContent = profesor.nombre;
        
        var carrera = document.createElement("div");
        carrera.classList.add("carrera");
        carrera.textContent = profesor.carrera;
        
        var materias = document.createElement("div");
        materias.classList.add("materias");
        materias.textContent = profesor.materias.join(", ");
        
        var containerButton = document.createElement("div");
        containerButton.classList.add("container-button");
        
        var button = document.createElement("button");
        button.classList.add("baja-btn");
        button.textContent = "Dar de baja";
        button.onclick = mostrarModal;

          // Asociar el divProfesor al botón "Dar de baja"
        button.onclick = function() {
            mostrarModal();
             // Almacenar una referencia al divProfesor asociado con este botón
            divProfesorToRemove = divProfesor;
        };
    
        
        containerButton.appendChild(button);
        
        divProfesor.appendChild(nombre);
        divProfesor.appendChild(carrera);
        divProfesor.appendChild(materias);
        divProfesor.appendChild(containerButton);
        
        return divProfesor;
    }


    // Función para agregar los profesores al contenedor principal
    function agregarProfesores() {
        var container = document.querySelector(".list_container");
        profesores.forEach(function(profesor) {
            var contenedor = crearContenedor(profesor);
            container.appendChild(contenedor);
        });
    }

    // Llamar a la función para agregar los profesores cuando el DOM se haya cargado completamente
    agregarProfesores();
});
