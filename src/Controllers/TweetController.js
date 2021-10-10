const Tweet=require('../models/tweet');
const Comment=require('../models/comment');
const { clearCache } = require('ejs');
const create=async function(req,res){
    try{
        await Tweet.create({
            content:req.body.content,
            user:req.user._id
        })
       return res.redirect('back');
    }
    catch (err){
        console.error("Error in Tweet");
        return;
    }
}
const destroy=async function(req,res){
    try{
     const tweet= await Tweet.findById(req.params.id)
            if(tweet.user==req.user.id){
                tweet.remove();
                Comment.deleteMany({tweet:req.params.id},function(err){
                    return res.redirect('back');
                });
            }else{
                return res.redirect('back');
            }
    }
    catch (err){
        console.err(err);
        return res.redirect('/');
    }
}
module.exports={create,destroy};