// Variables para mostrar la contraseña
const mostrar = document.getElementById("show");  // Icono ojo
const pass = document.getElementById("pass");   // Input contraseña
const confPass = document.getElementById("confPass");   // Input confirmar contraseña
const mostrarPass = document.getElementById("mostrarPass");  // Span texto icono

// Elementos del formulario
const formulario = document.querySelector("form")
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
    if (nombreUsuario.value === "") {
        nombreError.textContent = "Debe introducir un nombre de usuario";
        nombreUsuario.style.outline = 'red 2px solid';
    } else {
        nombreError.textContent = "";
        nombreUsuario.style.outline = 'none';
    }
    checkValidations();
});

correo.addEventListener("input", () => {
    if (!correo.value) {
        correoError.textContent = "Debe introducir un correo";
        correo.style.outline = 'red 2px solid';
    } else if (!emailPattern.test(correo.value)) {
        correoError.textContent = "Debe introducir un correo válido";
        correo.style.outline = 'red 2px solid';
    } else {
        correoError.textContent = "";
        correo.style.outline = 'none';
    }
    checkValidations();
});

pass.addEventListener("input", () => {
    if (!pass.value) {
        passError.textContent = "Debe introducir una contraseña";
        pass.style.outline = 'red 2px solid';
    } else if (pass.value.length < 8) {
        passError.textContent = "La contraseña debe tener al menos 8 caracteres";
        pass.style.outline = 'red 2px solid';
    } else {
        passError.textContent = "";
        pass.style.outline = 'none';
    }
    checkValidations();
});

confPass.addEventListener("input", () => {
    if (pass.value !== confPass.value) {
        confPassError.textContent = "Las contraseñas no son iguales";
        confPass.style.outline = 'red 2px solid';
    } else {
        confPassError.textContent = "";
        confPass.style.outline = 'none';
    }
    checkValidations();
});

edad.addEventListener("input", () => {
    const valorEdad = parseInt(edad.value);
    if (!edad.value) {
        edadError.textContent = "Debe introducir una edad";
        edad.style.outline = 'red 2px solid';
    } else if (valorEdad < 18) {
        edadError.textContent = "Debes ser mayor de edad";
        edad.style.outline = 'red 2px solid';
    } else if (valorEdad > 120) {
        edadError.textContent = "Edad no válida";
        edad.style.outline = 'red 2px solid';
    } else {
        edadError.textContent = "";   // Vacío el span de error en caso de que esté bien
        edad.style.outline = 'none';  
    } 
    checkValidations();
});

ciudad.addEventListener("input", () => {
    if (ciudad.value === "0") {
        ciudadError.textContent = "Debes seleccionar una ciudad";
        ciudad.style.outline = 'red 2px solid';
    } else {
        ciudadError.textContent = "";
        ciudad.style.outline = 'none';
    }
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
    
    submitButton.disabled = !valido;  // Habilita el botón solo si los campos son válidos

    if (valido) {
        submitButton.className = "btn btn-success";
    } else {
        submitButton.className = "btn btn-danger";
    }
}

// Enviar datos al servidor
formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = {
        nombreUsuario: nombreUsuario.value,
        correo: correo.value,
        pass: pass.value,
        edad: edad.value,
        ciudad: ciudad.value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/usuario/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // Guardar en localStorage
            localStorage.setItem('nombreUsuario', nombreUsuario.value);
            localStorage.setItem('correo', correo.value);
            localStorage.setItem('edad', edad.value);
            localStorage.setItem('ciudad', ciudad.value);
            localStorage.setItem('pass', pass.value);

            // Verificar si se guardaron correctamente
            if (
                localStorage.getItem('nombreUsuario') === nombreUsuario.value &&
                localStorage.getItem('correo') === correo.value &&
                localStorage.getItem('edad') === edad.value &&
                localStorage.getItem('ciudad') === ciudad.value &&
                localStorage.getItem('pass') === pass.value
            ) {
                window.location.href = "../busqueda.html"; // Redirección tras registro exitoso
            } else {
                alert("Error al almacenar los datos");
            }
        } else {
            alert("Error: " + resultado.mensaje);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
   
});
