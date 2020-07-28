const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


const authCheck=(req,res,next)=>{
    if(!req.user){
        res.redirect('/');
    }else{
        next();
    }
};

router.get('/',indexController.login_view);
router.get('/dashboard',authCheck,indexController.dashboard_view);



module.exports = router;