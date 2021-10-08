const express=require('express');
const passport=require('passport');
const {create}=require('../Controllers/commentController');
const router=express.Router();
// router.post('/create',create);
router.post('/create',passport.checkAuthentication,create);
module.exports=router; 