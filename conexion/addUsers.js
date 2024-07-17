import { getConnection } from "./connectionMongoDB"; // Asumiendo que "ruta-documento" es el nombre correcto del archivo
import { getUsers_db } from "./conexion"



const addLanguages = async () => {
    try {
        const newLanguage = {
            name: "python",  // Corregido el nombre del lenguaje de "pythoo" a "python"
            disponible: true
        };
        const database = await getConnection();
        const result = await database.collection("languages").insertOne(newLanguage);
        console.log("Language added successfully:", result.ops[0]);  // Imprime el documento insertado
        
    } catch (error) {
        console.error(error);
    }
}

export { addLanguages };
