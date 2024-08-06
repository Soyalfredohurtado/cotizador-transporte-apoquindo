import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Schema } from 'mongoose';
import { name } from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//routers
import userRouter from  './src/routes/users.js'
import dashboardRouter from './src/routes/dashboard.js'
import loginRouter from './src/routes/login.js'
import quoteGeneratorRouter from './src/routes/quote-generator.js'
import serviceRouter from './src/routes/services.js'
import priceListRouter from './src/routes/price-list.js'

const app = express();
const port = 3000;

const mongoUri = 'mongodb://localhost:27017/cotizador-transporte-apoquindo';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configuracion monitor de platillas EJS
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'));

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Middleware para analizar datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/usuarios', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/', loginRouter);
app.use('/cotizador', quoteGeneratorRouter)
app.use('/servicios', serviceRouter)
app.use('/lista-de-precios', priceListRouter)

app.get('/', (req, res) => {
    res.render('login/login.ejs', {title: 'Login'})
    console.log('Ingresaste al login');
});


app.listen(port, ()=> console.log('ingresaste al port: ' + port));
    