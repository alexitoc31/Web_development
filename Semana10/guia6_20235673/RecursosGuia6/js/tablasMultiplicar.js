// Accedemos al contenedor donde se mostrara los estudiantes
const containerResultado = document.querySelector("#idContenedorResultado");

// Accedemos a cada boton por medio de la API DOM
const btnCalcular = document.querySelector("#idBtnCalcular");

// Agregamos el evento click al boton calcular
// se le asigna la funcion que realizará la operación
btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    // Capturando el valor del campo
    const inputTabla = document.querySelector("#inputTabla").value;

    // Inicializamos nuestro contador
    let contador = 1;

    // Verifiquemos que el dato colocado sea un numero entero positivo
    if (inputTabla > 0) {
        let tabla = `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;
        // Utilizamos un do while para generar la tabla de multiplicar
        // que el usuario ha indicado
        do {
            let resultado = contador * inputTabla;
            tabla += `<div class="row text-center">`;
            tabla += `<div class="col-md-1 col-sm-3 column">${contador}</div>`;
            tabla += `<div class="col-md-1 col-sm-3 column">x</div>`;
            tabla += `<div class="col-md-1 col-sm-3 column">${inputTabla}</div>`;
            tabla += `<div class="col-md-1 col-sm-3 column">=</div>`;
            tabla += `<div class="col-md-1 col-sm-3 column">${resultado}</div>`;
            tabla += `</div>`;
            
            // Incrementamos el valor del contador para que podamos salir del do while
            contador++;
        } while (contador <= 12);

        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = tabla;
    } else {
        alert("No se ha ingresado un número válido");
    }
}
