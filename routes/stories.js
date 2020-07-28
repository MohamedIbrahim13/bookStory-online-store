const express = require('express')
const router = express.Router();
const StoryController = require('../controllers/StoryController');


const authCheck=(req,res,next)=>{
    if(!req.user){
        res.redirect('/');
    }else{
        next();
    }
};


router.get('/add',authCheck,StoryController.get_add_story );
router.post('/',authCheck, StoryController.post_add_story);
router.get('/',authCheck,StoryController.dashboard_view);
router.get('/:id',authCheck,StoryController.get_single_story);
router.get('/edit/:id',authCheck,StoryController.edit_story );
router.put('/:id', authCheck,StoryController.update_story);
router.delete('/:id',authCheck,StoryController.delete_story);
router.get('/user/:userId', authCheck,StoryController.user_stories);

module.exports = router