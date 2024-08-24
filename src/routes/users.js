import express from 'express';
import { getUsersController, createUserController, getUserKeyController, updateUserController } from '../controllers/userController.js';
import session from 'express-session';

const router = express.Router();

// Ruta para obtener y mostrar todos los usuarios
router.get('/', async (req, res) => {    
    try {
        if ((req.session.userRol == 'r2' || req.session.userRol == 'r1') && req.session.userStatus == 's2'){
            let dataUser = req.session;
            const users = await getUsersController(); // Llamar a la función del controlador para obtener usuarios
            res.render('users/users-table.ejs', { title: 'Usuarios', view: 'users', users, dataUser });
        }else{
            res.redirect('/dashboard');
        }        
    } catch (error) {
        console.error('Error al obtener los usuarios', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.get('/view/:userId', async (req, res)=>{
    try {
        if ((req.session.userRol == 'r2' || req.session.userRol == 'r1') && req.session.userStatus == 's2'){
            let dataUser = req.session;
            let userID = req.params.userId;
            let dataUserByKey = await getUserKeyController(userID);
            res.render('users/user-view.ejs', { title: 'Usuarios', view: 'users',viewType:'view', dataUserByKey, dataUser});
        } else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error)
        throw error;        
    }
})

router.get('/edit/:userId', async (req, res) =>{
    try {
        if ((req.session.userRol == 'r2' || req.session.userRol == 'r1') && req.session.userStatus == 's2'){
            const dataUser = req.session;
            const userID = req.params.userId;
            const dataUserByKey = await getUserKeyController(userID);
            res.render('users/user-view.ejs', { title: 'Usuario', view: 'users',viewType:'edit', dataUserByKey, dataUser});
        }else{
            res.redirect('/dashboard');
        }        
    } catch (error) {
        res.status(500).send('Error al editar usuario');
    }
} )

router.post('/update/:userId', async(req, res)=>{  
    const userID = req.params.userId;
    await updateUserController(req, userID);
    let dataUser = req.session;
    const users = await getUsersController(); // Llamar a la función del controlador para obtener usuarios
    res.render('users/users-table.ejs', { title: 'Usuarios', view: 'users', users, dataUser, alertMessage: 'se actualizo el usuario con exito',
        alertType: 'success' });
})

router.get('/nuevo-usuario', async (req, res) => {
    try {
        const users = await getUsersController();
        res.render('users/new-user.ejs', { title: 'Usuarios', view: 'users', users });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.post('/nuevo-usuario', async (req, res) => {
    try {
        await createUserController(req); 
        res.render('login/login.ejs', {
            title: 'Usuarios',
            view: 'users',
            alertMessage: 'Usuario creado con exito...',
            alertType: 'success' 
        });
    } catch (error) {
        res.status(500).send('Error al crear usuario');
    }
});

export default router;
