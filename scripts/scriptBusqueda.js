document.addEventListener("DOMContentLoaded", function() {
            
    fetch('./parts/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Después de cargar el header, buscar el elemento #info
            const info = document.getElementById('info');
            if (info) {
                const nombreUsuario = localStorage.getItem('nombreUsuario') || "Usuario no encontrado";
                info.textContent = nombreUsuario;
                console.log("Nombre de usuario cargado:", nombreUsuario);
            } else {
                console.error("Elemento con id 'info' no encontrado.");
            }
        })
        .catch(error => console.error('Error cargando el header:', error));

    console.log(localStorage.getItem('nombre'));
});
const fecha = document.getElementById('fecha');
const sinFecha = document.getElementById('sinFecha');
const botones = document.querySelectorAll('#btnDiscoteca, #btnFiesta, #btnAmbas');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const fechaIngresada = new Date(fecha.value);
        const fechaActual = new Date();

        //Para comparar solo la fecha, sin horas ni minutos
        fechaActual.setHours(0, 0, 0, 0);
        fechaIngresada.setHours(0, 0, 0, 0);
        if (!fecha.value) {
            sinFecha.textContent = "Debes seleccionar una fecha";
        }else if (fechaIngresada < fechaActual) {
            sinFecha.textContent = "No puedes seleccionar una fecha anterior a hoy";
        } else {
            sinFecha.textContent = "";
        }
    });
});