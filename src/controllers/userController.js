import { getUsers, createUser } from '../models/usersModel.js';

const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        return users;
    } catch (error) {
        throw error;
    }
}


// Controlador para crear un nuevo usuario
const createUserController = async (req) => {
    try {
        const { userFirstName, userLastName, userDocumentNumber, userEmail, userDepartment } = req.body;
        await createUser({
            userFirstName,
            userLastName,
            userDocumentNumber,
            userEmail,
            userDepartment
        });
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
};

export { getUsersController, createUserController };