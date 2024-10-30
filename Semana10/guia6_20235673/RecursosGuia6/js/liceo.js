document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const carnet = document.getElementById("carnet").value;
    const nombre = document.getElementById("nombre").value;
    const dui = document.getElementById("dui").value;
    const nit = document.getElementById("nit").value;
    const correo = document.getElementById("correo").value;

    // Nueva expresión regular para asegurar que el carnet comience con dos vocales diferentes
    const carnetRegex = /^[aeiouAEIOU]{2}(?!\1)[0-9]{3}$/;
    const duiRegex = /^\d{8}-\d$/;
    const nitRegex = /^\d{4}-\d{6}-\d{3}-\d$/;
    const correoRegex = /^[A-Za-z]+[A-Za-z]*@[A-Za-z]+\.[A-Za-z]{2,}$/;

    if (!carnetRegex.test(carnet)) {
        alert("Carnet inválido. Debe iniciar con dos vocales distintas seguidas de 3 números.");
        return;
    }

    if (nombre.trim() === "") {
        alert("El nombre no puede estar vacío.");
        return;
    }

    if (!duiRegex.test(dui)) {
        alert("DUI inválido. Debe tener el formato ########-#.");
        return;
    }

    if (!nitRegex.test(nit)) {
        alert("NIT inválido. Debe tener el formato ####-######-###-#.");
        return;
    }

    if (!correoRegex.test(correo)) {
        alert("Correo electrónico inválido. Debe tener el formato NombreApellido@dominio.com.");
        return;
    }

    // Si todas las validaciones son correctas, enviar formulario
    alert("Formulario enviado correctamente.");
    this.reset();
});
