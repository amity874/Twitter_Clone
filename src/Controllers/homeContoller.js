const ejs=require('ejs');
const post=require('../models/tweet');
const expressEjsLayouts = require('express-ejs-layouts');
const Tweet = require('../models/tweet');
const User = require('../models/User');
module.exports.root=async function(req,res){
    try
    {
        const tweets=await Tweet.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
     }).sort({"createdAt":-1}).exec(); 
        // console.log(tweets);
        let fetchTweets=tweets;
        const users=await User.find({});
        // console.log(users);
            return res.render('home',{
            title:"Twitter",
            tweets:fetchTweets,
            users:users
        });
    }
catch (err){
    console.error(err);
    return;
}
}