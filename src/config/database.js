const mongoose=require('mongoose');
const connect=()=>{
    console.log("MongoDb Connected");
    return mongoose.connect('mongodb://localhost/twitter_dev');
}
module.exports=connect;
