const Story = require('../models/Story');
const moment = require('moment');

const login_view = (req,res)=>{
    res.render('login',{title: 'StoryBooks Login'})
};

const dashboard_view = (req,res)=>{
    Story.find({user:req.user.id}).then(stories=>res.render('dashboard',{title: 'StoryBooks',moment:moment,name:req.user.firstName,stories})).catch(err=>{
        console.error(err);
        res.render('err');
    });
};

module.exports = {
    login_view,
    dashboard_view
}