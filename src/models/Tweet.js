const mongoose=require('mongoose');
const  TweetSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true,
        maxLength:300,
        minlength:5
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ]
}, {timestamps:true});
const Tweet=mongoose.model('Tweet',TweetSchema);
module.exports=Tweet;
