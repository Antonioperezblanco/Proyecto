import express from 'express';
import { crearFiesta } from '../Controllers/fiestaController.js';
const router = express.Router();

router.post('/crear', crearFiesta);

export default router; 