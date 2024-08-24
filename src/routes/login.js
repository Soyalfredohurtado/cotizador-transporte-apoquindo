import express from 'express';
import { getUserKeyController } from '../controllers/userController.js'
import { getUserByEmail } from'../controllers/loginController.js'
import bcrypt from 'bcrypt'

const router = express.Router();

router.get('/', async (req, res) => { 
    try {
        res.render('login/login.ejs', {
            title: 'Usuarios',
            view: 'users' 
        });

    } catch (error) {
        console.error('Error al obtener los datos de login:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/', async (req, res) => {
    try {
        const loginEmail = req.body.userName.toLowerCase();
        const userExists = await getUserByEmail(loginEmail);

        if (userExists) {
            const plainPassword = req.body.userPassword;
            const hashedPassword = userExists.userPassword;
            const match = await bcrypt.compare(plainPassword, hashedPassword);

            if (match) {
                let dataUser = await getUserKeyController(userExists.userID);
                req.session.userID = dataUser.userID;
                req.session.userFirstName = dataUser.userFirstName;
                req.session.userLastName = dataUser.userLastName;
                req.session.userDocumentNumber = dataUser.userDocumentNumber;
                req.session.userEmail = dataUser.userEmail;
                req.session.userDepartment = dataUser.userDepartment;
                req.session.userRol = dataUser.userRol;
                req.session.userStatus = dataUser.userStatus;

                if(dataUser.userStatus == 's3'){
                    res.render('login/login.ejs', {
                        title: 'Usuarios',
                        view: 'users',
                        alertMessage: 'Usuario se encuentra deshabilitado',
                        alertType: 'danger' })
                }else{
                    res.redirect('/dashboard');
                }                
            } else {
                res.render('login/login.ejs', {
                    title: 'Usuarios',
                    view: 'users',
                    alertMessage: 'Contraseña errónea',
                    alertType: 'danger'
                });
            }
        } else {
            res.render('login/login.ejs', {
                title: 'Usuarios',
                view: 'users',
                alertMessage: 'Usuario no registrado.',
                alertType: 'danger'
            });
        }
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        res.status(500).render('login/login.ejs', {
            title: 'Usuarios',
            view: 'users',
            alertMessage: 'Ocurrió un error. Por favor, intente de nuevo.',
            alertType: 'danger'
        });
    }
});


router.get('/logout', (req, res) => {
    // Destruir la sesión
    req.session.destroy(err => {
        if (err) {
            // Manejar el error si la sesión no se pudo destruir
            return res.redirect('/dashboard');
        }
        // Eliminar la cookie de sesión
        res.clearCookie('connect.sid');
        // Redirigir al usuario a la página de inicio de sesión
        res.redirect('/');
    });
});

export default router;