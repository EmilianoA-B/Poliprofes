//Limpia input
limpiarInput('altaCarreraForm');
limpiarInput('altaMateriaForm');

//Desplegar carreras existentes
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/getCarreras')
        .then(response => response.json())
        .then(data => {
            const carreraList = document.getElementById('carreraSeleccionada');
            data.forEach(carrera => {
                const newCarrera = document.createElement('option');
                newCarrera.textContent = `${carrera.carrera}`;
                carreraList.appendChild(newCarrera);
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
});

//Dar de alta carrera
document.getElementById('altaCarreraForm').addEventListener('submit', async function(event){
    event.preventDefault();

    const carrera = document.getElementById('carrera').value;
    
    try{
        const response = await fetch('http://localhost:3000/endpoint/regCarrera', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ carrera })
        });

        if (response.ok) {
            mostrarPopup();
            console.error('Se anadio la carrera');
            limpiarInput('altaCarreraForm');
        } else {
            console.error('Error al anadir carrera');
        }
    }catch (error) {
        console.error('Error:', error);
    }
});

//Dar de alta materia
document.getElementById('altaMateriaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const carrera = document.getElementById('carreraSeleccionada').value;
    if (!carrera) {
        console.error('Carrera is required');
        return;
    }
    console.log('Carrera Seleccionada:', carrera);
    try {
        const response = await fetch('http://localhost:3000/api/getIdByCarrera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carrera })
        });

        if (response.ok) {    
            const data = await response.json();
            addMateria(data.id);
        } else {
            console.error('Error fetching ID:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//Funcion POST para ingresar materia    
async function addMateria (ID_Carrera){
    const materia = document.getElementById("materia").value;
    try {
        const response = await fetch('http://localhost:3000/endpoint/regMateria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ materia, ID_Carrera })
        });

        if (response.ok) {    
            console.log('Se registro la materia correctamente');
            mostrarPopup();
            limpiarInput('altaMateriaForm');
        } else {
            console.error('Error al registrar:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function mostrarPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function limpiarInput(input){
    document.getElementById(input).reset();
}