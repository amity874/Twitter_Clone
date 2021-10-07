const express=require('express');
const {create}=require('../Controllers/TweetController');
const router=express.Router();
router.post('/create',create);
module.exports=router;