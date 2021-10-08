const Comment=require('../models/comment');
const Tweet=require('../models/tweet');
const create =function(req,res){
    Tweet.findById(req.body.tweet,function(err,tweet){
        console.log(req.body);
        if(tweet){
            console.log(tweet);
            Comment.create({
                content:req.body.content,
                tweet:req.body.tweet,
                user:req.user._id
            },function(err,comment){
                if(err){
                   return res.redirect('/');
                }
                tweet.comments.push(comment);
                tweet.save();
                return res.redirect('/');
            })
        }else{
            console.error('Error finding in Tweet');
            return res.redirect('/');
        }
    })
}
module.exports={create};