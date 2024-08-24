import express from 'express';
import { countQuoterController } from '../controllers/quoterController.js';

const router = express.Router();

router.get('/', async (req, res) =>{
    const dataUser = req.session;
    const countQuoter = await countQuoterController();
    res.render('dashboard/dashboard.ejs', {title: 'Dashboard', view:'dashboard', dataUser, countQuoter })
})

export default router;