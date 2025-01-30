const mongoose = require('mongoose');
const { Fiesta } = require('./Fiesta');  

// Esquema extendido: Discoteca
const discotecaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  
    precio: { type: Number, required: true }, 
    edadMinima: { type: Number, required: true },
});


discotecaSchema.methods.mostrarInfo = function () {
    const baseInfo = this.__proto__.mostrarInfo.call(this);  
    return baseInfo + `
        Nombre: ${this.nombre},
        Edad mínima: ${this.edadMinima} años,
        Precio: ${this.precio} €
    `;
};

const Discoteca = Fiesta.discriminator('Discoteca', discotecaSchema);

module.exports = Discoteca;
