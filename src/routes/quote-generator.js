import express from 'express';
import { getServicesController } from '../controllers/serviceController.js'
import { createQuoterController, getQuoterController, getQuoterByIdController } from '../controllers/quoterController.js';
import { createQuoterDetailController, getQuoterDetailById } from '../controllers/quoterDetailsController.js';
import { getPriceListController } from '../controllers/priceListController.js'; 
import { v4 as uuid4 } from 'uuid';
import { createPdfQuoteController } from '../controllers/downloadsPdfController.js';

const router = express.Router();

router.get('/', async (req, res) => { 
    let dataUser = req.session;
    if(dataUser.userID){
        const quoters = await getQuoterController()
        res.render('quote-generator/quotation-table.ejs', {title:'Cotizador', view:'cotizador', quoters, dataUser} )
    }else{
        res.redirect('/')
    }
})

router.get('/nueva-cotizacion', async (req, res) => { 
    let dataUser = req.session;
    if(dataUser.userID){
        const quoterID = uuid4()
        const services = await getServicesController();
        const priceList = await getPriceListController();
        res.render('quote-generator/new-quotation.ejs', {title:'Cotizador', view:'cotizador', dataUser, services, quoterID, priceList } )
    }else{
        res.redirect('/')
    }
   
})

router.post('/nueva-cotizacion', async(req, res)  =>{
    try {
        const quoterData = req.body;
        await createQuoterController(req);
        await createQuoterDetailController(req);
        await createPdfQuoteController(quoterData);
        res.redirect('/cotizador')        
    } catch (error) {
        console.log('--- quoter-generetor.js ---', error)
        throw error
    }
})

//  view quote
router.get('/view/:quoteId', async(req, res)=>{
    const quoteId = req.params.quoteId;
    let dataUser = req.session;
    //dataUser.userID
    if(true){
        const priceList = await getPriceListController();
        let quoterDetailById = await getQuoterDetailById(quoteId);
        const QuoterById = await getQuoterByIdController(quoteId);
        let servicesList = await getServicesController();
        let title = `Cotización ${QuoterById.quoterNumber}`
        res.render('quote-generator/quotation-view.ejs', {title, view:'cotizador', dataUser, viewType:'view', QuoterById, quoterDetailById, servicesList, priceList} )
    }else{
        res.redirect('/cotizador')
    }    
})

export default router;