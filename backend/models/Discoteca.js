import mongoose from 'mongoose';
import Fiesta from './Fiesta.js' 

// Esquema extendido: Discoteca
const discotecaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  
    precio: { type: Number, required: true }, 
});


discotecaSchema.methods.mostrarInfo = function () {
    const baseInfo = this.__proto__.mostrarInfo.call(this);  
    return baseInfo + `
        Nombre: ${this.nombre},
        Precio: ${this.precio} €
    `;
};

const Discoteca = Fiesta.discriminator('Discoteca', discotecaSchema);

export default Discoteca;