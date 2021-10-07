const express=require('express');
const passport=require('passport');
const {create}=require('../Controllers/TweetController');
const router=express.Router();
router.post('/create',create);
passport.authenticate
router.post('/create',passport.checkAuthentication,create);
module.exports=router;