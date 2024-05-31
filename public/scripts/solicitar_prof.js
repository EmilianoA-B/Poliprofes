window.onload = function alCargar (){
    limpiarInput('professorForm');
    cargarCarreras();
}

/*document.addEventListener("DOMContentLoaded", function() {
    var accountButton = document.getElementById("account-button");
    var accountDropdown = document.getElementById("account-dropdown");

    // Ocultar el menú de cuenta al cargar la página
    hideAccountMenu();

    // Manejar clic en el botón de cuenta para mostrar/ocultar el menú desplegable
    accountButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Detener la propagación para evitar que se cierre inmediatamente
        if (accountDropdown.style.display === "none" || accountDropdown.style.display === "") {
            showAccountMenu();
        } else {
            hideAccountMenu();
        }
    });

    // Función para mostrar el menú de cuenta
    function showAccountMenu() {
        accountDropdown.style.display = "block";
    }

    // Función para ocultar el menú de cuenta
    function hideAccountMenu() {
        accountDropdown.style.display = "none";
    }

    // Manejar envío de formulario
    const form = document.getElementById('professorForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const carrera = document.getElementById('carrera').value;

        // Mostrar un mensaje de confirmación
        const mensaje = `Enviado`;
        mostrarMensaje(mensaje);

        // Resetear el formulario
        form.reset();
    });
});*/

//En submit de formulario
document.getElementById("professorForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const nombreProf = document.getElementById("nombre").value;
    const apellidoP = document.getElementById("apellidoP").value;
    const apellidoM = document.getElementById("apellidoM").value;
    const divtodasLasMaterias = document.getElementById("contieneTodasMaterias");
    const carrera = document.getElementById("carrera").value;
    const id_carrera = await getIDCarrera(carrera);

    const todosLosSelects = divtodasLasMaterias.querySelectorAll('select');
    const todasLasMaterias = Array.from(todosLosSelects).map(todosLosSelects => todosLosSelects.value);
    try {
        const response = await fetch('http://localhost:3000/endpoint/regProf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreProf, apellidoP, apellidoM, selections:todasLasMaterias, id_carrera , verificado: 0 })
        });
        if (response.ok) {
            console.log('Se registro el profesor');
            mostrarPopup(); //Mostrar confirmacion de alta
            limpiarInput('altaProf');
            document.getElementById("selectsDeMateria").innerHTML = "";
        } else {
            console.error('No se pudo registrar al profesor');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//Para cuando cambias de carrera
document.getElementById("carrera").addEventListener("change", function(){
    const carreraSelect = document.getElementById("carrera").value;
    limpiarSelect();
    document.getElementById("selectsDeMateria").innerHTML = "";
    getIdForMaterias(carreraSelect);
});
//Para cuando quieras poner una materia
document.getElementById("agregarMateria").addEventListener("click", function(){
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
async function cargarCarreras(){
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
async function getIdForMaterias(carrera){
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
async function getIDCarrera(carrera){
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
function limpiarSelect(){
 document.getElementById("materia").length = 1;
}

// Para limpiar el formulario
function limpiarInput(input){
    document.getElementById(input).reset();
}

function mostrarPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    setTimeout(function () {
        cerrarPopup();
        window.location.href = "./index.html";
    }, 3000);
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

document.getElementById('buscarProf').addEventListener('click', function(event) {
    event.preventDefault();
    const inputBusqueda = document.getElementById('inputBusqueda').value;
    window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
});

