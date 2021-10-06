const express=require('express');
const {profile,signUp,SigIn,create,createsession}=require('../Controllers/userController');
const router=express.Router();
router.get('/profile',profile);
router.get('/signin',SigIn);
router.get('/signup',signUp);
router.post('/create',create);
module.exports=router;