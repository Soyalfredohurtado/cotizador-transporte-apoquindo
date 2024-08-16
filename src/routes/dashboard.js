import express from 'express';

const router = express.Router();


router.get('/', (req, res) =>{
    let dataUser = req.session;
    res.render('dashboard/dashboard.ejs', {title: 'Dashboard', view:'dashboard', dataUser })
})

export default router;