document.getElementById("altaCarreraForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var carrera = document.getElementById("carrera").value;
    darAltaCarrera(carrera);
});

document.getElementById("altaMateriaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var carreraSeleccionada = document.getElementById("carreraSeleccionada").value;
    var materia = document.getElementById("materia").value;
    darAltaMateria(carreraSeleccionada, materia);
});

function darAltaCarrera(carrera) {
    fetch('/ruta/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ carrera: carrera })
    })
    .then(response => response.json())
    .then(data => {
        mostrarPopup();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function darAltaMateria(carreraId, materia) {
    fetch('/ruta/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ carreraId: carreraId, materia: materia })
    })
    .then(response => response.json())
    .then(data => {
        mostrarPopup();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}