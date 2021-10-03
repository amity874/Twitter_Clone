const ejs=require('ejs');

module.exports.root=function(req,res){
    return res.send('<h1>Welcome to twitter</h1>');
}