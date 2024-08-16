import express from 'express';
import { getServicesController } from '../controllers/serviceController.js'
import { createQuoterController, getQuoterController } from '../controllers/quoterController.js';
import { createQuoterDetailController } from '../controllers/quoterDetailsController.js';
import { getPriceListController } from '../controllers/priceListController.js'; 
import { v4 as uuid4 } from 'uuid'



const router = express.Router();

router.get('/', async (req, res) => { 
    let dataUser = req.session;
    const quoters = await getQuoterController()
    res.render('quote-generator/quotation-table.ejs', {title:'Cotizador', view:'cotizador', quoters, dataUser} )
})

router.get('/nueva-cotizacion', async (req, res) => { 
    const quoterID = uuid4()
    const services = await getServicesController();
    const priceList = await getPriceListController();
    res.render('quote-generator/new-quotation.ejs', {title:'Cotizador', view:'cotizador', services, quoterID, priceList} )
})

router.post('/nueva-cotizacion', async(req, res)  =>{
    try {
        const quoter = await createQuoterController(req);
        const quoterDetails = await createQuoterDetailController(req);
        res.redirect('/cotizador')
        
    } catch (error) {
        console.log('--- quoter-generetor.js ---', error)
        res.status(500).send('Error al crear la cotización', error);
    }
})

export default router;