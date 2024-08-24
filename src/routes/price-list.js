import express from 'express';
const router = express.Router();
import { getServicesController } from '../controllers/serviceController.js'
import { createPriceListController, getPriceListController, getPriceListByIDController, getPriceListController_ID  } from '../controllers/priceListController.js';


router.get('/', async(req, res) =>{
    try {
        let dataUser = req.session;
        const priceList = await getPriceListController();
        res.render('price-list/price-list-table.ejs', {title:'Lista de Precios', view:'price-list', priceList, dataUser} )
    }catch (error) {
            res.status(500).send(error);        
        }
})


router.get('/nueva-lista', async (req, res) =>{
    try {
        let dataUser = req.session;
        const services = await getServicesController();
        const dbPriceListID = await getPriceListController_ID('priceListID');
        res.render('price-list/new-price-list.ejs', {title:'Lista de Precios', view:'price-list', services,   btnEdit: '', dbPriceListID, dataUser});
        
    }catch (error) {
            res.status(500).send(error);        
        }
})


router.post('/nueva-lista', async (req, res) =>{
    try {
        const priceList = await createPriceListController(req);    
        res.redirect('/lista-de-precios/nueva-lista');         
    } catch (error) {
        console.log('--- price-list.js ---', error)
        res.status(500).send('Error al crear servicio', error);
    }
})


router.get('/view/:priceListID', async (req, res) => {
    try {
        let dataUser = req.session;
        const priceListID = req.params.priceListID;
        const priceListData = await getPriceListByIDController(priceListID);

        if(priceListData !== null ){
            const services = await getServicesController();
            res.render('price-list/price-list-edit.ejs', {
                title: 'Lista de Precios view',
                view: 'price-list',
                btnEdit: 'readonly',
                services,
                priceListData,
                viewType: 'view',
                dataUser
            });
        }else {
            res.redirect('/lista-de-precios');
        }
        
    } catch (error) {
        console.log('--- price-list.js ---', error);
        res.status(500).send(error);
    }
});


router.get('/edit/:priceListID', async (req, res)=>{
    try {
        let dataUser = req.session;
        res.render('price-list/price-list-edit.ejs', {title:'Lista de Precios', view:'price-list', btnEdit:'', dataUser});  
        
    } catch (error) {
        console.log('--- price-list.js ---', error)
        res.status(500).send(error);
        
    }
})


export default router;