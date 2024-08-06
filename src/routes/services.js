import express from 'express'
import { getServicesController, createServiceController } from '../controllers/serviceController.js'

const router = express.Router();

router.get('/', async (req, res)=>{
    const services = await getServicesController();
    res.render('services/service-table.ejs', {title:'Servicios', view:'services', services});
})


router.get('/nuevo-servicio', async (req, res) =>{
    try {
        res.render('services/new-service.ejs', {title:'Nuevo Servicio', view:'service'})
        
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');        
    }
})

router.post('/nuevo-servicio', async(req, res) => {
    try {
        await createServiceController(req);
        res.redirect('/servicios');        
    } catch (error) {
        console.log('--- service.js ---', error)
        res.status(500).send('Error al crear servicio', error);
    }
})

export default router


