import express from 'express'; //Crea una aplicación
import mongoose from 'mongoose';
import cors from 'cors';    //Permite solicitudes de otros dominios
import bcrypt from 'bcrypt';  //Encriptar contraseña
import Usuario from './models/Usuario.js';


const app = express();  //Define rutas como /crear o /inicioSesion
app.use(cors({
    origin: 'http://127.0.0.1:5500', // o tu dominio si es diferente
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/"; //Conexión 127.0.0.1 (localhost, no me lo reconoce)

mongoose.connect(url)  
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');   //Inicia el servidor en el puerto 3000
});
app.post('/usuario/crear', async (req, res) => {
    try {
        const { nombreUsuario, correo, pass, edad, ciudad, idFiestas, amigos } = req.body;
        if (!pass || typeof pass !== 'string' || pass.trim() === '') {
            return res.status(400).json({ mensaje: 'Contraseña inválida' });
        }
        
        console.log("Contraseña recibida:", pass);  
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

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado', id: nuevoUsuario.id });
    } catch (error) {
        console.error('Error al crear el usuario:', error);  // Aquí logueamos el error con más detalles.
        res.status(500).json({ mensaje: 'Error creando usuario', error: error.message });
    }
});

