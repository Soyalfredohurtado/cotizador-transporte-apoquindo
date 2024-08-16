import  User  from '../models/usersModel.js';
import bcrypt from 'bcrypt'

// Controlador para obtener Usuarios
const getUsersController = async (req, res) => {
    try {
        const users = await User.find(); // Usa el modelo User para obtener los usuarios
        return users;
    } catch (error) {
        console.log('error al obtener los usuario / userController.js - getUsersController', error)
        throw error;
    }
}

const getUserKeyController = async (key) => {
    try {
        const user = await User.findOne({ userID:key });
        return user;
    } catch (error) {
        console.log('error al obtener el usuario por su key / userController.js - getUserKeyController', error)
        throw error;
    }
}

// Controlador para crear un nuevo usuario
const createUserController = async (req) => {
    try {
        const saltRounds = 10;
        const { userID, userFirstName, userLastName, userDocumentNumber, userEmail, userDepartment, userRol, userStatus, userPassword, userPasswordConfirmation } = req.body;
        if(userPasswordConfirmation == userPassword){
            
            const newUser = await User({
                userID,
                userFirstName,
                userLastName,
                userDocumentNumber,
                userEmail,
                userDepartment,
                userRol,
                userStatus,
                userPassword: await bcrypt.hash(userPassword, saltRounds)
            });
            await newUser.save();
        }
    } catch (error) {
        console.log('error al crear usuario / userController.js', error)
        throw error;
    }
};


export { getUsersController, createUserController, getUserKeyController };