// Variables para mostrar la contraseña
const mostrar = document.getElementById("show");  //Icono ojo
const pass = document.getElementById("pass");   //input contraseña
const confPass = document.getElementById("confPass");   //input confirmar contraseña
const mostrarPass = document.getElementById("mostrarPass");  //Span texto icono

// Elementos del formulario
const formulario = document.querySelector("body");
const submitButton = document.querySelector('input[type="submit"]');

// Campos del formulario
const nombreUsuario = document.getElementById("nombreUsuario");
const correo = document.getElementById("correo");
const edad = document.getElementById("edad");
const ciudad = document.getElementById("ciudad");

// Variables para mostrar los errores
const nombreError = document.getElementById("nombreError");
const correoError = document.getElementById("correoError");
const passError = document.getElementById("passError");
const confPassError = document.getElementById("confPassError");
const edadError = document.getElementById("edadError");
const ciudadError = document.getElementById("ciudadError");

// Patrón de correo electrónico
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Función para inicializar las validaciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    checkValidations();
});

// Ocultar y mostrar contraseña
mostrar.addEventListener("click", () => {
    if (pass.type === "password") {
        pass.type = "text";
        confPass.type = "text";
        mostrarPass.textContent = "Ocultar contraseña";
        mostrar.className = "fa-solid fa-eye-slash";
    } else {
        pass.type = "password";
        confPass.type = "password";
        mostrarPass.textContent = "Mostrar contraseña";
        mostrar.className = "fa-solid fa-eye";
    }
});

// Validación de los campos al escribir
nombreUsuario.addEventListener("input", () => {
    nombreError.textContent = nombreUsuario.value ? "" : "Debe introducir un nombre de usuario";
    checkValidations();
});

correo.addEventListener("input", () => {
    if (!correo.value) {
        correoError.textContent = "Debe introducir un correo";
    } else if (!emailPattern.test(correo.value)) {
        correoError.textContent = "Debe introducir un correo válido";
    } else {
        correoError.textContent = "";
    }
    checkValidations();
});

pass.addEventListener("input", () => {
    if (!pass.value) {
        passError.textContent = "Debe introducir una contraseña";
    } else if (pass.value.length < 8) {
        passError.textContent = "La contraseña debe tener al menos 8 caracteres";
    } else {
        passError.textContent = "";
    }
    checkValidations();
});

confPass.addEventListener("input", () => {
    confPassError.textContent = pass.value !== confPass.value ? "Las contraseñas no son iguales" : "";
    checkValidations();
});

edad.addEventListener("input", () => {
    const valorEdad = parseInt(edad.value);
    if (!edad.value) {
        edadError.textContent = "Debe introducir una edad";
    } else if (valorEdad < 18) {
        edadError.textContent = "Debes ser mayor de edad";
    } else if (valorEdad > 120) {
        edadError.textContent = "Edad no válida";
    } else {
        edadError.textContent = "";   //Vacío el span de error en casa de que este bien
    } 
    checkValidations();
});

ciudad.addEventListener("input", () => {
    ciudadError.textContent = ciudad.value === "0" ? "Debes seleccionar una ciudad" : "";  //ciudad value == "0", ciudad por defecto (no válida)
    checkValidations();
});

// Función para comprobar si todos los campos son válidos
function checkValidations() {
    let valido = true;

    if (!nombreUsuario.value) valido = false;
    if (!correo.value || !emailPattern.test(correo.value)) valido = false;
    if (!pass.value || pass.value.length < 8) valido = false;
    if (pass.value !== confPass.value) valido = false;
    if (!edad.value || parseInt(edad.value) < 18 || parseInt(edad.value) > 120) valido = false;
    if (ciudad.value === "0") valido = false;

    submitButton.disabled = !valido;  //Si todos los campos son válidos habilita el botón de submit
}
