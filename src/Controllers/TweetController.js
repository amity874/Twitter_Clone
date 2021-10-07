const Tweet=require('../models/Tweet');
const create=function(req,res){
    Tweet.create({
        content:req.body.content,
        user:req.user._id
    },function(err,tweet){
        if(err){
            console.error("Error in tweet");
            return;
        }
        return res.redirect('back');
    })
}
module.exports={create};