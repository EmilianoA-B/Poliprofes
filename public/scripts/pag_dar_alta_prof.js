
window.onload = function alCargar() {
    limpiarInput('altaProf');
    cargarCarreras();
}

document.addEventListener("DOMContentLoaded", function () {
    var adminButton = document.getElementById("admin-button");
    var adminDropdown = document.getElementById("admin-dropdown");

    //Carga carreras y materiasdesde la base de datos
    // Ocultar el menú de cuenta al cargar la página
    // hideAccountMenu();

    // Manejar clic en el botón de cuenta para mostrar/ocultar el menú desplegable
    /*
    adminButton.addEventListener("click", function() {
        if (adminDropdown.style.display === "none" || adminDropdown.style.display === "") {
            showAccountMenu();
        } else {
            hideAccountMenu();
        }
    });
    
    // Función para mostrar el menú de cuenta
    function showAccountMenu() {
        adminDropdown.style.display = "block";
    }
    
    // Función para ocultar el menú de cuenta
    function hideAccountMenu() {
        adminDropdown.style.display = "none";
    }
    */
    // Mostrar el nombre y email del usuario simulado
    /*const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    userNameElement.textContent = "John Doe"; // Nombre simulado del usuario
    userEmailElement.textContent = "john@example.com"; // Email simulado del usuario*/
});
//En submit de formulario
document.getElementById("altaProf").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombreProf = document.getElementById("nombre").value;
    const apellidoP = document.getElementById("apellidoP").value;
    const apellidoM = document.getElementById("apellidoM").value;
    const divtodasLasMaterias = document.getElementById("contieneTodasMaterias");
    const carrera = document.getElementById("carrera").value;
    const id_carrera = await getIDCarrera(carrera);

    let valid = true;
    // Validación de nombre
    if (nombreProf === "") {
        valid = false;
        const errorNombre = document.getElementById('error-nombre');
        errorNombre.innerText = 'Necesita ser llenado';
        errorNombre.style.display = 'inline';
    }

    // Validación de apellidos
    if (apellidoP === "") {
        valid = false;
        const errorApellidoP = document.getElementById('error-apellidoP');
        errorApellidoP.innerText = 'Necesita ser llenado';
        errorApellidoP.style.display = 'inline';
    }

    // Validación de apellidos
    if (apellidoM === "") {
        valid = false;
        const errorApellidoM = document.getElementById('error-apellidoM');
        errorApellidoM.innerText = 'Necesita ser llenado';
        errorApellidoM.style.display = 'inline';
    }

    const carreraSelect = document.getElementById("carrera");
    const materiaSelect = document.getElementById("materia");

    if (carreraSelect.value === "") {
        valid = false;
        const errorDato = document.getElementById('error-sindato');
        errorDato.innerText = 'Sin seleccionar';
        errorDato.style.display = 'inline';

    } 
    
    if (materiaSelect.value === "") {
        valid = false;
        const errorD = document.getElementById('error-sindato2');
        errorD.innerText = 'Sin seleccionar';
        errorD.style.display = 'inline';
    }

    const todosLosSelects = divtodasLasMaterias.querySelectorAll('select');
    const todasLasMaterias = Array.from(todosLosSelects).map(todosLosSelects => todosLosSelects.value);

    if (!valid) {
        return; // Detener la ejecución si hay errores de validación
    }

    try{
        const response = await fetch('http://localhost:3000/api/checkRepetidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreProf, apellidoP, apellidoM })
        });
        
        if(response.ok) {
            try {
                const response = await fetch('http://localhost:3000/endpoint/regProf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombreProf, apellidoP, apellidoM, selections: todasLasMaterias, id_carrera, verificado: 1 })
                });
                if (response.ok) {
                    console.log('Se registro el profesor');
                    mostrarPopup(); //Mostrar confirmacion de alta
                    limpiarInput('altaProf');
                    document.getElementById("selectsDeMateria").innerHTML = "";
                }
            }catch (error) {
                console.error('Error:', error);
            }
        }else{
            const errorData = await response.json(); // Parsear la respuesta de error del servidor
            if (!response.ok) {
                console.error('El nombre del profesor ya existe.'); // Manejar error de nombre duplicado
                alert('El nombre del profesor ya existe.');
            } else {
                console.error('Error ajeno a repeticion', errorData.message); // Manejar otros errores
            }
        }
    }catch(error){
        console.error('Error:', error);
    }

    
});

//Para cuando cambias de carrera
document.getElementById("carrera").addEventListener("change", function () {
    const carreraSelect = document.getElementById("carrera").value;
    limpiarSelect();
    document.getElementById("selectsDeMateria").innerHTML = "";
    getIdForMaterias(carreraSelect);
});
//Para cuando quieras poner una materia
document.getElementById("agregarMateria").addEventListener("click", function () {
    const selectMateria = document.getElementById("materia");
    const divParaSelects = document.getElementById("selectsDeMateria");
    const newSelect = document.createElement("select");

    Array.from(selectMateria.options).forEach(opcionOriginal => {
        const opcionNueva = document.createElement('option');
        opcionNueva.value = opcionOriginal.value;
        opcionNueva.text = opcionOriginal.text;
        newSelect.appendChild(opcionNueva);
    });
    divParaSelects.appendChild(newSelect);
});
//Para cargar todas las carreras
async function cargarCarreras() {
    fetch('http://localhost:3000/api/getCarreras')
        .then(response => response.json())
        .then(data => {
            const carreraList = document.getElementById('carrera');
            data.forEach(carrera => {
                const newCarrera = document.createElement('option');
                newCarrera.textContent = `${carrera.carrera}`;
                carreraList.appendChild(newCarrera);
            });
        })
        .catch(error => console.error('Error al cargar carreras:', error));
}
//Para conseguir todas las materias de la carrera seleccionada
async function getIdForMaterias(carrera) {
    console.log('Carrera Seleccionada:', carrera);
    try {
        const response = await fetch('http://localhost:3000/api/getMaterias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carrera })
        });

        if (response.ok) {
            const selectMaterias = document.getElementById('materia');
            const listaMaterias = await response.json();
            listaMaterias.forEach(materia => {
                const newMateria = document.createElement('option');
                newMateria.textContent = `${materia.materia}`;
                selectMaterias.appendChild(newMateria);
            });
        } else {
            console.error('Error fetching ID:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
//Para conseguir ID de la carrera
async function getIDCarrera(carrera) {
    try {
        const response = await fetch('http://localhost:3000/api/getIdByCarrera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carrera })
        });
        if (response.ok) {
            console.log('Exito al conseguir el ID');
            const id_carrera = await response.json();
            return id_carrera.id;
        } else {
            console.error('No se pudo conseguir el ID');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Para limpiar los selects cada que se cambie de carrera
function limpiarSelect() {
    document.getElementById("materia").length = 1;
}

// Para limpiar el formulario
function limpiarInput(input) {
    document.getElementById(input).reset();
}

function mostrarPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
document.getElementById('buscarProf').addEventListener('click', function (event) {
    event.preventDefault();

    const inputBusqueda = document.getElementById('inputBusqueda').value;
    window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
});