import express from 'express';
import { getQuoterByIdController } from '../controllers/quoterController.js'
import { getQuoterDetailById } from '../controllers/quoterDetailsController.js'
import { getServicesController } from '../controllers/serviceController.js'

const router = express.Router();

// genera la vista de la cotizacion para el pdf
router.get('/formato/:quoterId', async (req, res)=>{
    const quoterId = req.params.quoterId
    const QuoterById = await getQuoterByIdController(quoterId)
    const quoterDetailById = await getQuoterDetailById(quoterId)
    const servicesList = await getServicesController();

    res.render('pdfs/quotePdfFormat.ejs', {  QuoterById, quoterDetailById,  servicesList })

});

export default router;

