import { MongoClient } from "mongodb";

const getConnection = async () => {
    try {
        const mongoUrl = "mongodb://localhost:27017/cotizador-transporte-apoquindo";
        const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db(); // Devuelve la base de datos conectada
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
}

export { getConnection };