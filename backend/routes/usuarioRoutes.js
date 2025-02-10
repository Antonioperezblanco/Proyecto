import express from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/crear', async (req, res) => {
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
});

router.post('/inicioSesion', async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);  // Verifica que los datos se están enviando
        const { nombreUsuario, correo, pass } = req.body;

        if (!(nombreUsuario || correo)) {
            return res.status(400).json({ mensaje: 'Faltan campos necesarios' });
        }

        const usuario = await Usuario.findOne({ $or: [{ nombreUsuario }, { correo }] });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        const coincidePass = await bcrypt.compare(pass, usuario.pass);
        if (!coincidePass) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        console.log("Autenticación exitosa, redirigiendo...");  // Verifica que el código pase esta parte
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
});
export default router;
