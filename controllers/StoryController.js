const Story = require('../models/Story');
const moment = require('moment');
const truncate = (str, len)=>{
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
};


const get_add_story = (req, res) => {
    res.render('add',{title:' Add A Story'})
};

const post_add_story =(req, res) => {
    req.body.user = req.user.id;
    const story = new Story(req.body);
    story.save().then(result=>res.redirect('/dashboard')).catch(err=>{
        console.error(err);
        res.render('err');
    });
};

const dashboard_view = (req, res) => {
    Story.find({status: 'public'}).populate('user').sort({createdAt: -1}).then(stories=>res.render('home',{title: 'The Stories',stories,moment:moment,truncate:truncate})).catch(err=>{
        console.error(err);
        res.render('err');
    });  
};

const get_single_story = (req, res) => {
    Story.findById({_id:req.params.id}).populate('user').then(story=>{
        if(!story){
            res.render('err');
        };
        res.render('story',{title:'Story Details',story,moment:moment,truncate:truncate});
    });   
};

const edit_story =(req, res) => {
    Story.findById({_id:req.params.id}).then(story=>{
        if(!story){
            res.render('err');
        };
        res.render('edit',{title:'Edit',story});
    }); 
};

const update_story =(req, res) => {
    Story.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true}).then(story=>{
        if(!story){
            res.render('err');
        };
        res.redirect('/dashboard');
    });
};

const delete_story = (req, res) => {
    Story.findByIdAndDelete({_id:req.params.id}).then(story=>res.redirect('/dashboard')).catch(err=>{
        console.error(err);
        res.render('err');
    });
};

const user_stories =(req, res) => {
    Story.find({user: req.params.userId,status: 'public',}).populate('user').then(stories=>res.render('home',{title:'User Posts',stories,truncate:truncate})).catch(err=>{
        console.error(err);
        res.render('err');
    });
};

module.exports ={
    get_add_story,
    post_add_story,
    dashboard_view,
    get_single_story,
    edit_story,
    update_story,
    delete_story,
    user_stories
}