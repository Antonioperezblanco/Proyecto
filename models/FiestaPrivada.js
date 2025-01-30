const mongoose = require('mongoose');
const { Fiesta } = require('./Fiesta'); 

const fiestaPrivadaSchema = new mongoose.Schema({
    tuAlcohol: { type: Boolean, required: true }, 
});

fiestaPrivadaSchema.methods.mostrarInfo = function () {
    const baseInfo = this.__proto__.mostrarInfo.call(this); 
    return baseInfo + ` Puedes llevar alcohol: ${this.tuAlcohol ? 'Sí' : 'No'}`;
};

const FiestaPrivada = Fiesta.discriminator('FiestaPrivada', fiestaPrivadaSchema);

module.exports = FiestaPrivada;
