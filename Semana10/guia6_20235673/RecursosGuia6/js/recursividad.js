// Otra forma de acceder a un elemento HTML es utilizando el getElementById del DOM
// Note que para este caso no se antepone el carácter #
const campo = document.getElementById("idTxtNumero");

// Definimos una función anónima que permita validar en tiempo real el ingreso de un número
const validarNumero = function(e) {
  // Creamos una expresión regular que valida que sean números
  const validar = /^[0-9]{1}$/;
  let tecla = e.key;

  // Testa si la expresión regular coincide con el valor ingresado
  // Podrá observar que al intentar teclear una letra u otro carácter diferente
  // a un número este no se escribe en el campo
  if (!validar.test(tecla)) e.preventDefault();
};

// Añadiendo el evento keypress para el campo
campo.addEventListener("keypress", validarNumero);

// Trabajando con el botón calcular
const boton = document.getElementById("idBtnCalcular");

// Definimos una función anónima para calcular el factorial de un número
function calcularFactorial(numero) {
  return numero <= 1 ? 1 : numero * calcularFactorial(numero - 1);
}

// Definimos una función de tipo flecha para imprimir el resultado del factorial
const imprimir = (numero, resultado) => {
  const contenedor = document.getElementById("idDivResultado");
  contenedor.innerHTML = `El factorial de ${numero}! es ${resultado}`;
};

// Definiendo una función tradicional
function calcular() {
  let numero = document.getElementById("idTxtNumero").value;
  if (numero !== "") {
    // Llamamos a la función anónima para que calcule el factorial
    let resultado = calcularFactorial(numero);
    // Enviando el resultado a una función de tipo flecha
    imprimir(numero, resultado);
  } else {
    alert("Debe ingresar un número válido");
  }
}

// Definiendo el evento click para el botón
boton.addEventListener("click", calcular);