const express=require('express');
const UserController=require('../Controllers/userController');
const router=express.Router();
router.get('/profile',UserController.profile);
module.exports=router;