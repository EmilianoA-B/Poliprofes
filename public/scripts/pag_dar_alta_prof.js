
window.onload = function alCargar (){
    limpiarInput('altaProf');
    cargarCarreras();
}

document.addEventListener("DOMContentLoaded", function() {
    var adminButton = document.getElementById("admin-button");
    var adminDropdown = document.getElementById("admin-dropdown");

    //Carga carreras y materiasdesde la base de datos
    // Ocultar el menú de cuenta al cargar la página
    hideAccountMenu();

    // Manejar clic en el botón de cuenta para mostrar/ocultar el menú desplegable

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

    // Mostrar el nombre y email del usuario simulado
    /*const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    userNameElement.textContent = "John Doe"; // Nombre simulado del usuario
    userEmailElement.textContent = "john@example.com"; // Email simulado del usuario*/
});
//En submit de formulario
document.getElementById("altaProf").addEventListener("submit", async function(event){
    event.preventDefault();

    const nombreProf = document.getElementById("nombre").value;
    const apellidoP = document.getElementById("apellidoP").value;
    const apellidoM = document.getElementById("apellidoM").value;
    const divtodasLasMaterias = document.getElementById("contieneTodasMaterias");
    
    const todosLosSelects = divtodasLasMaterias.querySelectorAll('select');
    const todasLasMaterias = Array.from(todosLosSelects).map(todosLosSelects => todosLosSelects.value);
    try {
        const response = await fetch('http://localhost:3000/endpoint/regProf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreProf, apellidoP, apellidoM, selections:todasLasMaterias })
        });
        if (response.ok) {
            console.log('Se registro el profesor');
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
//Para cuando pongas una materia
document.getElementById("agregarMateria").addEventListener("click", function(){
    const selectMateria = document.getElementById("materia");
    const divParaSelects = document.getElementById("selectsDeMateria");
    const newSelect = document.createElement("select");
    /*if (selectMateria.options.length === 1) {
        alert('Primero selecciona una carrera');
        return;
    }*/
    Array.from(selectMateria.options).forEach(opcionOriginal => {
        const opcionNueva = document.createElement('option');
        opcionNueva.value = opcionOriginal.value;
        opcionNueva.text = opcionOriginal.text;
        newSelect.appendChild(opcionNueva);
    });
    divParaSelects.appendChild(newSelect);
});

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
// Para limpiar los selects cada que se cambie de carrera
function limpiarSelect(){
 document.getElementById("materia").length = 1;
}

// Para limpiar el formulario
function limpiarInput(input){
    document.getElementById(input).reset();
}
