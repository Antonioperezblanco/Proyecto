import Discoteca from '../models/Discoteca.js'
import FiestaPrivada from '../models/FiestaPrivada.js'

export const crearFiesta = async (req, res) => {
 
    try{
        const {tipo, ciudad, localizacion, fecha, hora, vestimenta, musica, precioCombinado, precioCerveza, precioRefresco, nombre, precio, tuAlcohol} = req.body
        console.log("Datos recibidos en req.body:", req.body);

        if(tipo === 'fiestaPrivada'){
            const nuevaFiestaPricada = new FiestaPrivada({
                ciudad,
                localizacion,
                fecha,
                hora,
                vestimenta,
                musica,
                precioCombinado: precioCombinado || null,
                precioCerveza: precioCerveza || null,
                precioRefresco :precioRefresco || null,
                tuAlcohol,
            });
            await nuevaFiestaPricada.save()
            res.json({message: 'Fiesta Privada creada con exito'})
        }else if(tipo === 'discoteca'){
            const nuevaDiscoteca = new Discoteca({
                ciudad,
                localizacion,
                fecha,
                hora,
                vestimenta,
                musica,
                precioCombinado,
                precioCerveza,
                precioRefresco,
                nombre,
                precio,
            });
            await nuevaDiscoteca.save() 
            res.json({message: 'Discoteca creada con exito'})
        }
    } catch(error){
        console.error('Error al crear la fiesta', error);
        res.status(500).json({message: 'Error al crear la fiesta', error: error.message});
    }
}