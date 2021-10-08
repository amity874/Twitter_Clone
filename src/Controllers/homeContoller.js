const ejs=require('ejs');
const post=require('../models/tweet');
const expressEjsLayouts = require('express-ejs-layouts');
const Tweet = require('../models/tweet');
module.exports.root=function(req,res){
    Tweet.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }) 
    .exec(function(err,tweets){
    console.log(tweets);
    let fetchTweets=tweets;
        if(err){
            console.log('Error finding tweets');
            fetchTweets={};
        }
        return res.render('home',{title:"Twitter",tweets:fetchTweets});
    });
}