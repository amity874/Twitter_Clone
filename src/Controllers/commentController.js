const Comment=require('../models/comment');
const Tweet=require('../models/tweet');
const { param } = require('../routes');
const {newCommentMailer}=new require('../mailers/comments_mailer')
const create =async function(req,res){
   try{
   const tweet=await Tweet.findById(req.body.tweet).populate('user');
    const comment=await Comment.create({
          content:req.body.content,
          tweet:req.body.tweet,
          user:req.user._id
      });
    tweet.comments.push(comment);
    tweet.save();
    newCommentMailer(tweet);
    return res.redirect('/');
}catch(err){
        console.error(err);
        return res.redirect('/');
    }
}
const destroy = async function(req, res){
    // console.log(req);
    try{
    const comment=await Comment.findById(req.params.id);
      if(!comment) {
         return res.redirect('back');
        }
    if(comment.user == req.user.id) {
      let tweetId = comment.tweet;
      comment.remove();
       Tweet.findByIdAndUpdate(tweetId, { $pull: {comments: req.params.id}} , function(err, tweet) {
       return res.redirect('back');
    })
    } else {
        return res.redirect('back');
     }
    }catch(err){
        console.err(err);
    }
}
module.exports={create,destroy};