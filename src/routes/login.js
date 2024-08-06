import express from 'express';

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('login/login.ejs', {title: 'Usuarios', view:'users'})
})

router.post('/', (req, res)=>{
    let data = req.body;
    if (data.userName === 'alfredocl2016@gmail.com' && data.userPassword == '4142Lufe'){
        console.log('ingresaste al sistema');
        res.redirect('dashboard');
    }else{
        res.redirect('/')
    }
})
export default router;