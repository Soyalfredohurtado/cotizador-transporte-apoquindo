import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/cotizador-transporte-apoquindo';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1); // Salir del proceso si la conexión falla
    }
};

export default connectToMongoDB;
