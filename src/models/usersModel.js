import mongoose from 'mongoose';


const { Schema } = mongoose;

// Definir el esquema para el modelo User
const userSchema = new Schema({
    userID: { type: String, required: true, unique: true }, 
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userDocumentNumber: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true, unique: true },
    userDepartment: { type: String, required: true },
    userRol: { type: String, required: true },
    userPassword: { type: String, required:true },
    userStatus: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Crear el modelo User
const User = mongoose.model('User', userSchema);

export default User;