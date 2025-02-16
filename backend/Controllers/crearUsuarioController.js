import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

export const crearUsuario = async (req, res) => {
    try {
        const { nombreUsuario, correo, pass, edad, ciudad, idFiestas, amigos } = req.body;

        const usuarioExistente = await Usuario.findOne({ nombreUsuario });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso' });
        }

        const correoExiste = await Usuario.findOne({ correo });
        if (correoExiste) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso' });
        }

        const salt = await bcrypt.genSalt(10);
        const passEncriptada = await bcrypt.hash(pass, salt);

        const nuevoUsuario = new Usuario({
            nombreUsuario,
            correo,
            pass: passEncriptada,
            edad,
            ciudad,
            idFiestas: idFiestas || [],
            amigos: amigos || []
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ mensaje: 'Error creando usuario', error: error.message });
    }
}