import mongoose from "mongoose";

const url = "mongodb://127.0.0.1/proyecto"; 

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1); 
    }
};

// Exportar la función para usarla en otros archivos
export default connectDB;