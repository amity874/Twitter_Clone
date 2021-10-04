module.exports.profile=function(req,res){
  return  res.render('users/userProfile',{layout:__dirname+'/../../src/views/layouts/userLayout'});
}