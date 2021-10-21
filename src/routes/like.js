const express=require('express');
const passport=require('passport');
const {toggleLike}=require('../Controllers/likeController');
const router=express.Router();
// router.post('/create',create);
router.get('/toggle',passport.checkAuthentication,toggleLike);
module.exports=router;
