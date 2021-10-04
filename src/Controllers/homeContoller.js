const ejs=require('ejs');
const expressEjsLayouts = require('express-ejs-layouts');
module.exports.root=function(req,res){
    return res.render('home',{title:"Twitter"});
}