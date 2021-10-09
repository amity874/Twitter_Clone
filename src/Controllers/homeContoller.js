const ejs=require('ejs');
const post=require('../models/tweet');
const expressEjsLayouts = require('express-ejs-layouts');
const Tweet = require('../models/tweet');
const User = require('../models/User');
module.exports.root=function(req,res){
    Tweet.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }) 
    .exec(async function(err,tweets){
    console.log(tweets);
    let fetchTweets=tweets;
    const users=await User.find({});
    console.log(users);
        if(err){
            console.log('Error finding tweets');
            fetchTweets={};
        }
        return res.render('home',{
        title:"Twitter",
        tweets:fetchTweets,
        users:users
    });
    });
}