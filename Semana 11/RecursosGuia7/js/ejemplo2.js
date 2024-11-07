// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aquí se está utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE = PASSWORD
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = DATE
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de INPUT TYPE = SELECT
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.innerHTML = resultado;
    // Funcion que permite mostrar el modal de Bootstrap
    // Esta funcion es definida por Bootstrap
    modal.show();
};

// Validación del formulario
const validarFormulario = () => {
    let valid = true;
    let mensajes = [];

    // Validar campos vacíos
    Array.from(formulario.elements).forEach(elemento => {
        if (elemento.type !== "submit" && elemento.type !== "button" && elemento.value.trim() === "") {
            valid = false;
            mensajes.push(`${elemento.name} no debe estar vacío.`);
        }
    });

    // Validar fecha de nacimiento
    const fechaNacimiento = formulario.elements["fechaNacimiento"];
    if (fechaNacimiento && new Date(fechaNacimiento.value) > new Date()) {
        valid = false;
        mensajes.push("La fecha de nacimiento no puede ser futura.");
    }

    // Validar formato de correo electrónico
    const email = formulario.elements["email"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) {
        valid = false;
        mensajes.push("El correo electrónico no es válido.");
    }

    // Validar contraseñas coinciden
    const password = formulario.elements["password"];
    const passwordRepeat = formulario.elements["passwordRepeat"];
    if (password && passwordRepeat && password.value !== passwordRepeat.value) {
        valid = false;
        mensajes.push("Las contraseñas no coinciden.");
    }

    // Validar al menos un interés seleccionado (corrección aquí)
    const intereses = formulario.querySelectorAll('input[name="intereses"]:checked');
    if (intereses.length === 0) {
        valid = false;
        mensajes.push("Debe seleccionar al menos un interés.");
    }

    // Validar selección de carrera
    const carrera = formulario.elements["carrera"];
    if (carrera && carrera.value === "") {
        valid = false;
        mensajes.push("Debe seleccionar una carrera.");
    }

    // Validar selección de país
    const pais = formulario.elements["pais"];
    if (pais && pais.value === "") {
        valid = false;
        mensajes.push("Debe seleccionar un país de origen.");
    }

    if (!valid) {
        alert(mensajes.join("\n"));  // Puedes cambiar esto a un modal o mensaje en la página si prefieres
    }

    return valid;
};

// Mostrar datos en una tabla si es válido
const mostrarDatosEnModal = () => {
    if (!validarFormulario()) return;

    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped");

    const tbody = document.createElement("tbody");
    Array.from(formulario.elements).forEach(elemento => {
        if (elemento.type !== "submit" && elemento.type !== "button") {
            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = elemento.name;
            fila.appendChild(celdaNombre);

            const celdaValor = document.createElement("td");
            celdaValor.textContent = elemento.value;
            fila.appendChild(celdaValor);

            tbody.appendChild(fila);
        }
    });

    tabla.appendChild(tbody);
    bodyModal.innerHTML = ""; // Limpia el contenido del modal
    bodyModal.appendChild(tabla);
    modal.show();
};

// Asignar el evento al botón
button.onclick = (event) => {
    event.preventDefault();  // Prevenir el envío automático del formulario
    mostrarDatosEnModal();
};
