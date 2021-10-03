const express =require('express');
const router=require('./src/routes/index');
const app=express();
app.use('/',router);
app.listen(3000,()=>{
    console.log("Server Started At 3000!!");
});