    const formFiesta = document.querySelector("form")


    //Campos a rellenar
    const tipoFiesta = document.getElementById("tipoFiesta");
    const ciudad = document.getElementById("ciudad");
    const localizacion = document.getElementById("localizacion");
    const fecha = document.getElementById("fecha");
    const hora = document.getElementById("hora");
    const vestimenta = document.getElementById("vestimenta");
    const tipoMusica = document.getElementById("tipoMusica");
    const combinado = document.getElementById("combinado");
    const cerveza = document.getElementById("cerveza");
    const refresco = document.getElementById("refresco");
    const botonSubmit = document.getElementById("botonSubmit");

    //Campos opcionales
    const nombre = document.getElementById("nombre");
    const precioDisco = document.getElementById("precioDiscoteca");
    const tuAlcohol = document.getElementById("tuAlcohol");

    //Variables fecha y hora actual pasados a como se reciben en un input
    const fechaActual = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toISOString().split('T')[1].split(':')[0];

    //Variables para mostrar errores
    const tipoFiestaErr = document.getElementById("tipoFiestaErr");
    const ciudadErr = document.getElementById("ciudadErr");
    const localizacionErr = document.getElementById("localizacionErr");
    const fechaErr = document.getElementById("fechaErr");
    const horaErr = document.getElementById("horaErr");
    const vestimentaErr = document.getElementById("vestimentaErr");
    const tipoMusicaErr = document.getElementById("musicaErr");
    const precioDiscoErr = document.getElementById("precioDiscotecaErr");
    const combinadoErr = document.getElementById("combinadoErr");
    const cervezaErr = document.getElementById("cervezaErr");
    const refrescoErr = document.getElementById("refrescoErr");

    //Evento para cuando seleccionen un tipo de fiesta aparezcan los input correspondientes
    tipoFiesta.addEventListener("change", function() {

        
        if(tipoFiesta.value =="discoteca"){
            nombre.innerHTML ="";
            precioDisco.innerHTML="";
            tuAlcohol.innerHTML="";

            const labelNombre = document.createElement("label");
            labelNombre.textContent = "Nombre de la discoteca: ";

            const inputNombre = document.createElement("input");
            inputNombre.type = "text";
            inputNombre.name="nombre";
            inputNombre.id="nombreDiscoteca";

            const nombreErr = document.createElement("span");
            nombreErr.id="nombreErr";
            nombreErr.textContent = "";

            nombre.appendChild(labelNombre);
            nombre.appendChild(inputNombre);
            nombre.appendChild(nombreErr);
            nombre.appendChild(document.createElement("br"));
        
            const labelPrecio = document.createElement("label");
            labelPrecio.textContent = "Precio de la discoteca: ";

            const inputPrecio = document.createElement("input");
            inputPrecio.type="number";
            inputPrecio.name="precioDiscoteca";
            inputPrecio.id="precioDisco";

            const spanPrecio = document.createElement("span");
            spanPrecio.id="precioDiscoErr";
            spanPrecio.textContent ="";

            precioDisco.appendChild(labelPrecio);
            precioDisco.appendChild(inputPrecio);
            precioDisco.appendChild(spanPrecio);
            precioDisco.appendChild(document.createElement("br"));

            nombre.addEventListener("input", ()  => {
                nombreErr.textContent = inputNombre.value  ? "" : "Debe introducir un nombre de discoteca";
                checkValidations();
            });
            inputPrecio.addEventListener("input", ()  => {
                spanPrecio.textContent = inputPrecio.value  ? "" : "Debe introducir un precio de discoteca";
                checkValidations();
            });
            
        } else if(tipoFiesta.value =="fiestaPrivada"){
                nombre.innerHTML ="";
                precioDisco.innerHTML="";
                tuAlcohol.innerHTML="";

                const labelAlcohol = document.createElement("label");
                labelAlcohol.textContent = "¿Pueden llevar su alcohol?";

                const inputAlcohol = document.createElement("input");
                inputAlcohol.type = "checkbox";
                inputAlcohol.name = "alcohol";
                inputAlcohol.id = "alcohol";
                tuAlcohol.appendChild(labelAlcohol);
                tuAlcohol.appendChild(inputAlcohol);
                tuAlcohol.appendChild(document.createElement("br"));

                //Si en una fiesta p`rivada puedes llevar su alcohol se desactiva los campos de los precios
                inputAlcohol.addEventListener("change", () => {
                    if(inputAlcohol.checked){
                        combinado.disabled=true;
                        combinado.value=null;
                        cerveza.disabled=true;
                        cerveza.value=null;
                        refresco.disabled=true;
                        refresco.value=null;
                    }else {
                        combinado.disabled = false;
                        cerveza.disabled = false;
                        refresco.disabled = false;
                    }
                    checkValidations();
                });
            
            }
    });

    //Eventos para mostrar errores
    tipoFiesta.addEventListener("change", () => {
        tipoFiestaErr.textContent = tipoFiesta.value ? "" : "Debe introducir un tipo de fiesta";
        checkValidations();
    });

    ciudad.addEventListener("change", () => {
        ciudadErr.textContent = ciudad.value ? "" : "Debe introducir una ciudad";
        checkValidations();
    });

    localizacion.addEventListener("input", () => {
        localizacionErr.textContent = localizacion.value ? "" : "Debe introducir una localización";
        checkValidations();
    });

    fecha.addEventListener("input", () => {
        fechaErr.textContent = fecha.value ? "" : "Debe introducir una fecha";
        if(fecha.value < fechaActual) {
            fechaErr.textContent = "La fecha debe ser mayor o igual a la actual";
        }
        checkValidations();
    });

    hora.addEventListener("input", () => {
        horaErr.textContent = hora.value ? "" : "Debe introducir una hora";
        if (fecha.value == fechaActual && hora.value < horaActual) {
            horaErr.textContent = "La hora no puede ser anterior a la actual";
        
        }
        checkValidations();
    });

    vestimenta.addEventListener("change", () => {
        vestimentaErr.textContent = vestimenta.value ? "" : "Debe introducir un tipo de vestimenta";
        checkValidations();
    });

    tipoMusica.addEventListener("input", () => {
        tipoMusicaErr.textContent = tipoMusica.value ? "" : "Debe introducir un tipo de musica";
        checkValidations();
    });



    combinado.addEventListener("input", () => {
        const inputAlcohol = document.getElementById("alcohol");
        if(tipoFiesta.value ==  "discoteca" || (tipoFiesta.value=="fiestaPrivada" && !inputAlcohol.checked)){
        combinadoErr.textContent = combinado.value ? "" : "Debe introducir un precio del combinado";
        checkValidations();
        }
    });

    cerveza.addEventListener("input", () => {
        const inputAlcohol = document.getElementById("alcohol");
        if(tipoFiesta.value == "discoteca" || !inputAlcohol.checked){
        cervezaErr.textContent = cerveza.value ? "" : "Debe introducir un precio de la cerveza";
        checkValidations();
        }
    });

    refresco.addEventListener("input", () => {
        const inputAlcohol = document.getElementById("alcohol");
        if(tipoFiesta.value == "discoteca" || !inputAlcohol.checked){
        refrescoErr.textContent = refresco.value ? "" : "Debe introducir un precio del refresco";
        checkValidations();
        }
    });

    //Función para habilitar o deshabilitar el botón submit
    function checkValidations() {
        let valido = true;

        if (!tipoFiesta.value) valido = false;
        if (!ciudad.value) valido = false;
        if (!localizacion.value) valido = false;
        if (!fecha.value || fecha.value < fechaActual) valido = false;
        if (!hora.value || (fecha.value == fechaActual && hora.value < horaActual)) valido = false;
        if (!vestimenta.value) valido = false;
        if (!tipoMusica.value) valido = false;

        if (tipoFiesta.value === "discoteca"){
            const nombre = document.getElementById("nombreDiscoteca");
            const precioDisco = document.getElementById("precioDisco");
            if (!nombre.value) valido = false;
            if (!precioDisco.value) valido = false;
            
            if (!combinado.value) valido = false;
            if (!cerveza.value) valido = false;
            if (!refresco.value) valido = false;

        }else if (tipoFiesta.value == "fiestaPrivada"){
            const inputAlcohol = document.getElementById("alcohol");

            if (inputAlcohol.checked) {

                combinadoErr.textContent = "";
                cervezaErr.textContent = "";
                refrescoErr.textContent = "";
            } else {
    
                if (!combinado.value) valido = false;
                if (!cerveza.value) valido = false;
                if (!refresco.value) valido = false;
            }
        }

        botonSubmit.disabled = !valido;
    }