import mongoose from 'mongoose';
import  Fiesta from './Fiesta.js' 

const fiestaPrivadaSchema = new mongoose.Schema({
    tuAlcohol: { type: Boolean, default: false }
});

fiestaPrivadaSchema.methods.mostrarInfo = function () {
    const baseInfo = this.__proto__.mostrarInfo.call(this); 
    return baseInfo + ` Puedes llevar alcohol: ${this.tuAlcohol ? 'Sí' : 'No'}`;
};

const FiestaPrivada = Fiesta.discriminator('FiestaPrivada', fiestaPrivadaSchema);

export default FiestaPrivada;