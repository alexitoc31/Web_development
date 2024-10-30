// Accediendo a los elementos del HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idTxtNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAgregarPais");

const notificacion = document.getElementById("idNotificacion");
const mensaje = document.getElementById("idMensaje");

// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);

// Componente modal
const idModal = document.getElementById("idModal");

// Arreglo global de pacientes
let arrayPaciente = [];

// Variable para el modo edición
let editIndex = null;

// Función para limpiar el formulario
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();
    editIndex = null;
    buttonAgregarPaciente.textContent = "Agregar Paciente"; // Restablecer el botón a "Agregar Paciente"
};

// Función para agregar o guardar cambios en un paciente
const addPaciente = function() {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked ? "Hombre" : "Mujer";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (nombre && apellido && fechaNacimiento && sexo && pais !== "0" && direccion) {
        if (editIndex === null) {
            // Modo de agregar
            arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            // Modo de edición
            arrayPaciente[editIndex] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            mensaje.innerHTML = "Paciente editado correctamente";
        }

        toast.show();
        limpiarForm();
        imprimirPacientes();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Función que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let fila = "";
    arrayPaciente.forEach((element, index) => {
        fila += `
            <tr>
                <td class="text-center fw-bold">${index + 1}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td>${element[3]}</td>
                <td>${element[4]}</td>
                <td>${element[5]}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-editar" data-index="${index}">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button type="button" class="btn btn-danger btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash3-fill"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
    return fila;
}

// Función para mostrar la tabla de pacientes
const imprimirPacientes = () => {
    let table = `
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center" style="width: 5%">#</th>
                        <th scope="col" class="text-center" style="width: 15%">Nombre</th>
                        <th scope="col" class="text-center" style="width: 15%">Apellido</th>
                        <th scope="col" class="text-center" style="width: 10%">Fecha nacimiento</th>
                        <th scope="col" class="text-center" style="width: 10%">Sexo</th>
                        <th scope="col" class="text-center" style="width: 30%">País</th>
                        <th scope="col" class="text-center" style="width: 25%">Dirección</th>
                        <th scope="col" class="text-center" style="width: 10%">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${imprimirFilas()}
                </tbody>
            </table>
        </div>
    `;
    document.getElementById("idTablaPacientes").innerHTML = table;
};

// Función para cargar un paciente en los campos de entrada para edición
function editarPaciente(index) {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    paciente[3] === "Hombre" ? inputRdMasculino.checked = true : inputRdFemenino.checked = true;
    cmbPais.value = Array.from(cmbPais.options).find(option => option.text === paciente[4]).value;
    inputDireccion.value = paciente[5];

    editIndex = index; // Guarda el índice para identificar el paciente en edición
    buttonAgregarPaciente.textContent = "Guardar Cambios"; // Cambia el texto del botón a "Guardar Cambios"
}

// Función para eliminar un paciente
function eliminarPaciente(index) {
    arrayPaciente.splice(index, 1); // Elimina el paciente del arreglo
    imprimirPacientes(); // Actualiza la tabla después de la eliminación

    mensaje.innerHTML = "Paciente eliminado";
    toast.show();
}

// Delegación de eventos para botones de editar y eliminar
document.getElementById("idTablaPacientes").addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("btn-editar")) {
        const index = target.getAttribute("data-index");
        editarPaciente(index);
    } else if (target.classList.contains("btn-eliminar")) {
        const index = target.getAttribute("data-index");
        eliminarPaciente(index);
    }
});

// Agregar nuevo país al select
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew) {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = cmbPais.children.length + 1;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Eventos para los botones
buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Limpiar formulario al cargar la página
limpiarForm();
