const express=require('express');
const passport=require('passport');
const { route } = require('.');
const {profile,signUp,SigIn,create,createsession,destroySession}=require('../Controllers/userController');
const router=express.Router();
router.get('/profile',passport.checkAuthentication,profile);
router.get('/signin',SigIn);
router.get('/signup',signUp);
router.post('/create',create);


router.post('/create-session',passport.authenticate(
    'local',
    {successRedirect:'/',failureRedirect:'/signin'}
),createsession);
router.get('/signout',destroySession);
module.exports=router;