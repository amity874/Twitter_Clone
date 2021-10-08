const express=require('express');
const homeController=require('../Controllers/homeContoller');
const userRouter=require('./users');
const TweetRouter=require('./tweet')
const CommentRouter=require('./comments');
const router=express.Router();
console.log("Router Up!");
router.get('/',homeController.root);
router.use('/users',userRouter);
router.use('/tweets',TweetRouter);
router.use('/comments',CommentRouter);
module.exports=router;