const { session } = require('passport');
const multer  = require('multer')
const upload = multer({ dest: './src/uploads/' }) 
// const {getFile, uploadFile} = require('../config/s3');
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
const createsession=function(req,res){
  req.flash('success','Logged In Successfully');
  return res.redirect('/');
}
const destroySession=function(req,res){
  req.logout();
  req.flash('info','Logged Out Successfully');
  console.log(req);
  return res.redirect('/');
}
const updateAvatar = async function(req, res) {
  const file = req.file;
  try {
      const result = await uploadFile(file);
      unlinkSync(file.path);
      const currentUser = req.user.id;
      console.log("currentuser", currentUser);
      await User.findByIdAndUpdate(currentUser, {avatar: result.key}, function(err, user) {
          if(err) {
              console.log(err);
              return res.redirect('/');
          }
          return res.redirect('back');
      })
      console.log(result);
  } catch(err) {
      console.log(err);
      return res.redirect('/');
  }
  // console.log(file);
  // console.log(result);
}
module.exports={
  profile,
  signUp,
  SigIn,
  create,
  createsession,
  destroySession,
  update,
  updateAvatar
};