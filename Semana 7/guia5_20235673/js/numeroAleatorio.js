//Numero aleatorio en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() *25) + 1;
//Constante para generar el numero de intentos=3
const numeroIntentos = 3;
//Guardar el numero de intentos realizados
let intentos = 1;
function generarNumeroAleatorio(){
    //Definimos una variable para impresion de mensajes
    let mensaje;
    // Utilizamos el dom para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrado");
    //Verificar en que intentos esta el usuario
    if (intentos <= numeroIntentos){
        let numero = prompt(
            "Qué número se ha generado (Intento  " 