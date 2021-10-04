const express =require('express');
const connect=require('./src/config/database');
const router=require('./src/routes/index');
var expressLayouts=require('express-ejs-layouts');
const { ConnectionStates } = require('mongoose');
const app=express();
app.use(express.static(__dirname+'/src/assests'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);
app.set('layout',__dirname+'/src/views/layouts/layout');
app.set('view engine','ejs');
app.set('views','./src/views')



app.use('/',router);
app.listen(3000,async()=>{
    await connect();
    console.log('Server Started At 3000!!');
});