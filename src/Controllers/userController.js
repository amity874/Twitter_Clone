const { session } = require('passport');
const User = require('../models/User');
const profile=function(req,res){
  User.findById(req.params.id,function(err,user){
    if(!user){
      
      return res.redirect('/');
    }
    return res.render('users/userProfile',{
      title: 'User Profile',
      Profile_user: user
    });
  })
 
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
const update=function(req,res){
  if(req.user.id==req.params.id){
    User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
      if(err){
        console.log('Error in Updating user');
        return res.redirect('/');
      }
      return res.redirect('back');
    })
  }else{
    return res.status(401).send('Unauthorised');
  }
}
const createsession=function(res,res){
  return res.redirect('/');
}
const destroySession=function(req,res){
  req.logout();
  return res.redirect('/');
}
module.exports={
  profile,
  signUp,
  SigIn,
  create,
  createsession,
  destroySession,
  update
};