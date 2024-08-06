import mongoose from 'mongoose';


const { Schema } = mongoose;

// Definir el esquema para el modelo User
const userSchema = new Schema({
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userDocumentNumber: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true, unique: true },
    userDepartment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Crear el modelo User
const User = mongoose.model('User', userSchema);

// Función para obtener usuarios desde la base de datos usando Mongoose
const getUsers = async () => {
    try {     
        const users = await User.find(); // Usa el modelo User para obtener los usuarios
        return users;
    } catch (error) {
        console.error('---userModels.js--- Error al obtener los usuarios', error);
        throw error; // Lanzar el error para manejarlo en el controlador
    }
};

const createUser = async (userData) => {
    try {
        const newUser = User(userData);
        await newUser.save();     
    } catch (error) {
        console.error('---userModels.js--- Error creación de un nuevo usuario', error);
        throw error;      
    }
}

export { getUsers, createUser };
export default User;