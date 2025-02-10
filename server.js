import express from 'express';
import cors from 'cors';
import connectDB from './backend/database/db.js';
import usuarioRoutes from './backend/routes/usuarioRoutes.js';

const app = express();

connectDB();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('frontend'));
app.use(express.urlencoded({ extended: true }));

app.use('/usuario', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
