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


const updateUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { userFirstName, userLastName, userDocumentNumber, userEmail, userDepartment, userRol, userStatus } = req.body;
    
        // Buscar el usuario por ID
        const user = await User.findOne({ userID: userId });
        
        if (user) {
            // Actualizar los campos proporcionados
            user.userFirstName = userFirstName || user.userFirstName;
            user.userLastName = userLastName || user.userLastName;
            user.userDocumentNumber = userDocumentNumber || user.userDocumentNumber;
            user.userEmail = userEmail || user.userEmail;
            user.userDepartment = userDepartment || user.userDepartment;
            user.userRol = userRol || user.userRol;
            user.userStatus = userStatus || user.userStatus;

            // Guardar los cambios en la base de datos
            await user.save();            
        }

    } catch (error) {
        console.error('Error al actualizar usuario / updateUserController', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};



export { getUsersController, createUserController, getUserKeyController, updateUserController };