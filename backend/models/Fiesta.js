const mongoose = require('mongoose');

const fiestaSchema = new mongoose.Schema({
    ciudad: { type: String, required: true },
    localizacion: { type: String, required: true },
    hora: { type: String, required: true },
    vestimenta: { type: String, required: true },
    precioCombinado: { type: Number, required: true },
    precioCerveza: { type: Number, required: true },
    precioRefresco: { type: Number, required: true },
    musica: { type: String, required: true },
    fecha: { type: Date, required: true },
    id: { type: String, required: true, unique: true },
    contador: { type: Number, default: 0 },
});

fiestaSchema.methods.mostrarInfo = function () {
    return `
        Ciudad: ${this.ciudad},
        Localización: ${this.localizacion},
        Hora: ${this.hora},
        Vestimenta: ${this.vestimenta},
        Precio combinado: ${this.precioCombinado} euros,
        Precio cerveza: ${this.precioCerveza} euros,
        Precio refresco: ${this.precioRefresco} euros,
        Música: ${this.musica},
        Fecha: ${this.fecha},
        ID: ${this.id},
        Contador: ${this.contador}
    `;
};

fiestaSchema.methods.añadirPersona = function () {
    this.contador += 1;
    return this.contador;
};

module.exports = mongoose.model('Fiesta', fiestaSchema);
