const btnUsuario = document.getElementById("btnUsuario");    //Variable para iniciar sesión con nombre de usuario
const btnCorreo = document.getElementById("btnCorreo");     //Variable para iniciar sesión con correo electrónico
const labelRegistro = document.getElementById("registroLabel");     //label del inicio de sesión
const mostrar = document.getElementById("show");  //Boton para mostrar contraseña

btnUsuario.addEventListener("click", () => {
    labelRegistro.textContent = "Nombre de usuario"  //Cambia el texto del label
    registro.name = "nombreUsuario"  //Cambio el  atributo name
});

btnCorreo.addEventListener("click", () => {
    labelRegistro.textContent = "Correo electrónico"
    inputRegistro.name = "correo"
});

mostrar.addEventListener("click", (event) =>{
    event.preventDefault();    //Evito que se envie el formulario al hacer click en el botón para mostrar la contraseña
    if(pass.type == "password"){ 
        pass.type = "text"           //Al hacer click cambio el tipo del input password a text y el icono del ojo
        show.className = "fa-solid fa-eye-slash" 
    } else{
        pass.type = "password"
        show.className = "fas fa-eye"
    }
});
const formInicio = document.querySelector("form");
formInicio.addEventListener("submit", function(event){
   
    const registro = document.getElementById("registro");
    const pass = document.getElementById("pass");  

    const registroErr = document.getElementById("registroErr");
    const passErr = document.getElementById("passErr");

    registroErr.textContent = "";
    passErr.textContent = "" ;
    let valido= true;

    if(!registro.value){
        registroErr.textContent= "Este campo no puede estar vacío"
        valido = false;
    }

    if(!pass.value){
        passErr.textContent = "La contraseña no puede estar vacía"
        valido = false;
    }


    if(!valido){ 
        event.preventDefault();   
}

});