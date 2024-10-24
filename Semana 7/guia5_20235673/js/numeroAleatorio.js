// Número aleatorio en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Constante para generar el número de intentos = 3
const numeroIntentos = 3;
// Guardar el número de intentos realizados
let intentos = 1;

function generarNumeroAleatorio() {
  // Definimos una variable para impresión de mensajes
  let mensaje;
  // Utilizamos el DOM para acceder al párrafo creado
  const parrafo = document.querySelector("#idParrafo");
  // Verificar en qué intentos está el usuario
  if (intentos <= numeroIntentos) {
    let numero = prompt(
      "¿Qué número se ha generado (Intento " + intentos + ")?"
    );
    // Verificar el número ingresado con el número correcto
    if (numero == numeroAleatorio) {
      mensaje =
        "Es sorprendente, pudiste adivinar el número oculto (" +
        numeroAleatorio +
        "). Refresque la página para volver a jugar.";
    } else if (intentos == numeroIntentos) {
      mensaje =
        "Su número de intentos ha terminado. El número oculto era: " +
        numeroAleatorio +
        ". Refresque la página para volver a jugar.";
    } else {
      // Comparar el número ingresado con el número aleatorio
      if (numero < numeroAleatorio) {
        mensaje =
          "El número que ingresaste es más bajo. Vuelve a intentar. Quedan " +
          (numeroIntentos - intentos) +
          " intentos.";
      } else {
        mensaje =
          "El número que ingresaste es más alto. Vuelve a intentar. Quedan " +
          (numeroIntentos - intentos) +
          " intentos.";
      }
    }
    // Aumentar el valor de los intentos
    intentos++;
  } else {
    mensaje =
      "Su número de intentos ha terminado. El número oculto era: " +
      numeroAleatorio +
      ". Refresque la página para volver a jugar.";
  }

  parrafo.innerHTML = mensaje;
}