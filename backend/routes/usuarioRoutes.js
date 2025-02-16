import express from 'express';
import { crearUsuario } from '../Controllers/crearUsuarioController.js';
import { inicioSesion } from '../Controllers/inicioSesionController.js';
const router = express.Router();

router.post('/crear', crearUsuario);
    
router.post ('/inicioSesion', inicioSesion);
    
export default router;
