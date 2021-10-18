const express=require('express');
const passport=require('passport');
const { route } = require('.');
const {profile,signUp,SigIn,create,createsession,destroySession,update,updateAvatar}=require('../Controllers/userController');
const multer  = require('multer')
const upload = multer({ dest: './src/uploads/' })
const router=express.Router();
router.get('/profile/:id',passport.checkAuthentication,profile);
router.get('/signin',SigIn);
router.get('/signup',signUp);
router.post('/create',create);
router.post('/update/:id',passport.checkAuthentication,update);
router.post('/updatAvatar',passport.checkAuthentication, upload.single('avatar'),updateAvatar)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/signin'}
),createsession);
router.get('/signout',destroySession);
module.exports=router;