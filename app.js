const { name } = require('ejs');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {Schema} = require('mongoose')




//configuracion monitor de platillas EJS
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'));

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Middleware para analizar datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: true }));


//conexion to MongoDB
const mongo_uri = 'mongodb://localhost:27017/cotizador-transporte-apoquindo';

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error al conectar a MongoDB', error);
});


const userSchema = new Schema({
    userFirstName: String,
    userLastName:  String,
    userDocumentNumber:  String,
    userEmail:  String,
    userDepartment:  String,
    created_at:{ type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema);


// ------------------------------- routes: LOGIN ----------------------------------------
app.get('/', (req, res) => {
    res.render('login/login.ejs', {title: 'Login'})
    console.log('Ingresaste al login');
});

app.post('/', (req, res)=>{
    let data = req.body;
    if (data.userName === 'alfredocl2016@gmail.com' && data.userPassword == '4142'){
        console.log('ingresaste al sistema');
        res.redirect('dashboard');
    }else{
        res.redirect('/')
    }
})

// ------------------------------- routes: DASHBOARD ----------------------------------------
app.get('/dashboard', (req, res)=>{
    
    res.render('dashboard/dashboard.ejs', {title: 'Dashboard', view:'dashboard'})
    console.log(date_now)
})


// ------------------------------- routes: COTIZADOR----------------------------------------
app.get('/cotizador', (req, res)=>{
    res.render('quote-generator/quotation-table.ejs', {title: 'Tabla Cotizaciones', view:'cotizador' })
})
app.get('/cotizador/nueva-cotizacion', (req, res)=>{
    res.render('quote-generator/new-quotation.ejs', {title: 'Nueva Cotización', view:'cotizador' })
})


// ------------------------------- routes: USERS ----------------------------------------
app.get('/usuarios', (req, res)=>{
    res.render('users/users-table.ejs', {title: 'Usuarios', view:'users'})
})

// ------------------------------- routes: NEW-USERS ----------------------------------------
app.get('/nuevo-usuario', (req, res)=>{
   res.render('users/new-user.ejs', {title: 'Nuevo Usuario',  view:'users'})
})

app.post('/nuevo-usuario', (req, res)=>{
    let data = req.body; 
    //##### verificar si usuario exite tur y correo 
    //##### colocar todo en minuscula 

    if ( data.userPassword === data.userPasswordConfirmation) {
        const newUser = new User({
            userFirstName: data.userFirstName,
            userLastName: data.userLastName,
            userDocumentNumber: data.userDocumentNumber,
            userEmail: data.userEmail,
            userDepartment: data.userDepartment,
            userPassword: data.userPassword, // hashear
            created_at: new Date()         
        })
        console.table(newUser)
    
        newUser.save()
        .then(() => {
            console.log('Usuario guardado en la base de datos');
        })
        .catch((error) => {
            console.error('Error al guardar el usuario', error);
        });
        res.redirect('dashboard')
    }else{
        console.log('contraseña no coinciden ')
        res.render('/nuevo-usuario', newUser)
    }
})



app.listen(port, (req, res)=> console.log('ingresaste al port: ' + port));
    