const User = require('../models/User');
// const user=require('../models/User');
const profile=function(req,res){
  return  res.render('users/userProfile');
}
const signUp=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
return res.render('users/user_sign_up',{
  title:'Twitter|Sign Up'
});
}
const SigIn=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
return res.render('users/user_sign_in',{
  title:'Twiter| sign In'
});
}
const create=function(req,res){
  if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
  }
  User.findOne({email:req.body.email},function(err,user){
    if(err){
      console.log(err);
      return;
    }
    if(!user){
      User.create(req.body,function(err,user){
        if(err){
          console.err(err);
          return ;
        }
        return res.redirect('/users/signin');
      })
    }else{
      return res.redirect('/users/signin');
    }
  })
}
const createsession=function(res,res){
  return res.redirect('/');
}
module.exports={
  profile,
  signUp,
  SigIn,
  create,
  createsession
};