const express=require('express');
const homeController=require('../Controllers/homeContoller');
const router=express.Router();
console.log("Router Up!");
router.get('/',homeController.root);
module.exports=router;