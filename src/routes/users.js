import express from 'express';
import { getUsersController, createUserController } from '../controllers/userController.js';

const router = express.Router();

// Ruta para obtener y mostrar todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await getUsersController(); // Llamar a la función del controlador para obtener usuarios
        res.render('users/users-table.ejs', { title: 'Usuarios', view: 'users', users });
    } catch (error) {
        console.error('Error al obtener los usuarios', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.get('/nuevo-usuario', async (req, res) => {
    try {
        const users = await getUsersController(); // Llamar a la función del controlador para obtener usuarios
        res.render('users/new-user.ejs', { title: 'Usuarios', view: 'users', users });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});


router.post('/nuevo-usuario', async (req, res) => {
    try {
        await createUserController(req); 
        res.redirect('/'); 
    } catch (error) {
        res.status(500).send('Error al crear usuario');
    }
});


export default router;
