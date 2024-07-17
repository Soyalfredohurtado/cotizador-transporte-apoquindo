import { getConnection } from "./connectionMongoDB"; // Asumiendo que "ruta-documento" es el nombre correcto del archivo

const getUsers_db = async () => {
    try {
        const database = await getConnection();

        // "collection" está mal escrito como "colletion"
        const users_db = await database.collection("users").find().toArray();
        console.table(users_db); // "consolesole" está mal escrito como "console" y "table" está bien

    } catch (error) {
        console.error(error);
    }
}

export { getUsers_db};
