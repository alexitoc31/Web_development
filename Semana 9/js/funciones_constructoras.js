function Persona(_nombre, _apellido,_edad){
    this.nombre = _nombre;
    this.apellido= _apellido;
    this.edad = _edad;
    this.saludar = function(){
        console.log(`Hola mi nombre es ${this.nombre}`);
    }
} 
const persona1 = new Persona("Alexis", "Cabrera", 20);
const persona2 = 