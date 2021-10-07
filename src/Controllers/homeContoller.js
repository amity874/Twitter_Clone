const ejs=require('ejs');
const post=require('../models/Tweet');
const expressEjsLayouts = require('express-ejs-layouts');
const Tweet = require('../models/Tweet');
module.exports.root=function(req,res){
    Tweet.find({}).populate('user').exec(function(err,tweets){
    let fetchTweets=tweets;
    console.log(tweets);
        if(err){
            console.log('Error finding tweets');
            fetchTweets={};
        }
        return res.render('home',{title:"Twitter",tweets:fetchTweets});
    });
}