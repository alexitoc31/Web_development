// Accedemos al contenedor donde se mostraran los estudiantes
const containerArreglo = document.querySelector("#idContenedorArreglo");
const containerArregloOrdenado = document.querySelector("#idContenedorArregloOrdenado");

// Accedemos a cada boton por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

// Agregamos el evento click a los botones, adicionalmente
// Se le asigna la funcion que realizará la operación
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElemento() {
    const numero = parseInt(document.querySelector("#inputNumero").value);

    // Verificar que sea un número válido
    if (isNaN(numero)) {
        alert("Debe ingresar un número válido");
        return;
    }

    // Agregamos el nuevo elemento al arreglo
    arreglo.push(numero);

    // Utilizamos la API DOM para crear un elemento HTML
    let caja = document.createElement("div"); // Creamos un elemento <div>
    caja.className = "col-md-1 column-green"; // Asignamos clase al elemento <div>
    let valor = document.createElement("h3"); // Creamos un elemento <h3>
    valor.textContent = numero; // Asignamos el numero a mostrar
    caja.appendChild(valor); // Añadimos <h3> como hijo de <div>

    // Insertamos los elementos en el contenedor
    containerArreglo.insertAdjacentElement("beforeend", caja);
}

function ordenarElementos() {
    // Utilizamos un for...of para recorrer el arreglo
    // A su vez se utilizara .sort() para ordenarlo
    for (let i of arreglo.sort((a, b) => a - b)) {
        let caja = document.createElement("div");
        caja.className = "col-md-1 column-green";
        let valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);

        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}
