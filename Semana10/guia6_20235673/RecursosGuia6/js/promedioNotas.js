// Accedemos al contenedor donde se mostrara los estudiantes
const containerEstudiantes = document.querySelector("#idContenedorEstudiantes");

// Accedemos a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

// Agregamos el evento click a los botones, adicionalmente
// se le asigna la funcion que realizará la operación
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    // Utilizamos un array para guardar la información del estudiante
    let arrayEstudiantes = new Array();

    let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value;
    let nombre, calificacion, nota;
    let contador = 1;

    // Utilizamos un while para recorrer el total de estudiantes
    while (contador <= totalEstudiantes) {
        nombre = prompt(`Ingrese el nombre del estudiante ${contador}`);

        // Verificamos que el nombre sea válido
        while (nombre === "" || nombre == null) {
            nombre = prompt(`Ingrese un nombre válido para el estudiante ${contador}`);
        }

        calificacion = prompt(`Ingrese la calificación del estudiante ${contador}`);

        // Convertir a número y asegurar que sea positivo
        let convertir = parseFloat(calificacion);
        while (isNaN(convertir) || convertir < 0 || convertir > 10) {
            calificacion = prompt(`Ingrese una calificación entre 0 y 10`);
            convertir = parseFloat(calificacion);
        }

        // Asignamos los valores al array
        arrayEstudiantes.push({ nombre: nombre, nota: parseFloat(calificacion).toFixed(2) });
        contador++;
    }

    // Recorriendo el arreglo con for-of
    let calificacionAlta = 0;
    let posicion = 0;

    // Verificación de calificación más alta
    for (let indice in arrayEstudiantes) {
        nota = parseFloat(arrayEstudiantes[indice].nota);
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = indice;
        }
    }

    // Calculando el promedio
    let promedio = 0;
    for (let estudiante of arrayEstudiantes) {
        promedio += parseFloat(estudiante.nota);
    }
    promedio = (promedio / arrayEstudiantes.length).toFixed(2);

    // Mostrando los resultados
    let listado = `<h3>Listado de estudiantes registrados</h3>`;
    listado += `<ul>`;
    for (let estudiante of arrayEstudiantes) {
        listado += `<li><b>Nombre:</b> ${estudiante.nombre} - <b>Calificación:</b> ${estudiante.nota}</li>`;
    }
    listado += `</ul>`;

    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${arrayEstudiantes[posicion].nombre} - ${calificacionAlta}</p>`;

    containerEstudiantes.innerHTML = listado;
}
