const express=require('express');
const passport=require('passport');
const {create,destroy}=require('../Controllers/TweetController');
const router=express.Router();
router.post('/create',create);

// passport.authenticate
router.post('/create',passport.checkAuthentication,create);
router.get('/destroy/:id',passport.checkAuthentication ,destroy);
module.exports=router;