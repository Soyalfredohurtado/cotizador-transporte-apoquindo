import express from 'express'
import { getServicesController, createServiceController, getServicesByIDController, getSerciceByKeyController, updateServiceController } from '../controllers/serviceController.js'

const router = express.Router();

router.get('/', async (req, res)=>{
    const services = await getServicesController();
    res.render('services/service-table.ejs', {title:'Servicios', view:'services', services});
})

router.get('/nuevo-servicio', async (req, res) =>{
    try {
        let seviceListID_ = await getServicesByIDController();
        res.render('services/new-service.ejs', {title:'Nuevo Servicio', view:'services', seviceListID_});        
    } catch (error) {
        res.status(500).send('Error al obtener los services');        
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

router.get('/view/:serviceid', async(req, res) => {
    try {
        const serviceID = String(req.params.serviceid);
        const services = await getServicesController();
        const serviceByKey = await getSerciceByKeyController(serviceID);
        if(serviceByKey){
            res.render('services/service-view.ejs', {title:'Servicio View', view:'services', services, serviceByKey, viewType:'view'}); 
        }else{
            res.redirect('/servicios');
        }      
    } catch (error) {
        console.log('--- service.js ---', error)
        res.status(500).send('Error al crear servicio', error);
    }
})

router.get('/view/:serviceid/edit', async(req, res) => {
    try {
        const serviceID = String(req.params.serviceid);
        const services = await getServicesController();
        const serviceByKey = await getSerciceByKeyController(serviceID);
        if(serviceByKey){
            res.render('services/service-view.ejs', {title:'Servicio View', view:'services', services, serviceByKey, viewType:'edit'}); 
        }else{
            res.redirect('/servicios');
        }     
    } catch (error) {
        console.log('--- service.js ---', error)
        res.status(500).send('Error al crear servicio', error);
    }
})


router.post('/edit/:serviceid', async (req, res) => {
    const serviceID  = String(req.params.serviceid);
    try {        
        await updateServiceController(req, serviceID);
        res.redirect('/servicios');    
    } catch (error) {
        console.error('--- service.js / actualizar servicio ---', error);
        res.status(500).send(`Error al actualizar servicio: ${error.message}`);
    }
})

export default router