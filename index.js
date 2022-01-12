const express =require('express');
const {json,urlencoded}=require('body-parser')
const cors=require('cors');
const session=require('express-session');
const passport=require('passport');
const mongoStore=require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');
var flash = require('connect-flash');
const multer  = require('multer')
const upload = multer({ dest: './src/uploads/' })
const Noty=require('noty');
const {setFlash}=require('./src/config/middleware');
const passportlocal=require('./src/config/passport-local-strategy');
const connect=require('./src/config/database');
const router=require('./src/routes/index');
var expressLayouts=require('express-ejs-layouts');
const { ConnectionStates } = require('mongoose');
const { rawListeners } = require('./src/models/User');
const app=express();


app.use(cors());

const chatEngine=require('http').Server(app)
const {socket}=require('./src/config/socket');
const chatSocket=socket(chatEngine); 

chatEngine.listen(3001);
console.log("chat Engine Listening at 3001");
// app.use(sassMiddleware({
//     src: './src/assests/scss',
//     dest: './src/assests/css',
//     debug: true,
//     outputStyle: 'expanded',
//     prefix: '/css'
// }));
app.use(json());
app.use(urlencoded({extended:true}));
app.use(express.static(__dirname+'/src/assests'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts);
app.set('layout',__dirname+'/src/views/layouts/layout');
app.set('view engine','ejs');
app.set('views','./src/views')

app.use(session({
    name:'twitter',
    secret:'AmitInNodejs',
    resave:false,
    cookie:{
        maxAge:6000000
    },
    store: new mongoStore({
           mongoUrl:'mongodb://localhost/twitter_dev',
            autoRemove:'disable'
    },function(err){
        if(err){
            console.error(err)
        }
        console.log('connect mongoSetup done!!!');
    })
    }))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(setFlash);
app.use('/',router);
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log("Uploaded");
//     return res.redirect('/ ');
// });
app.listen(3000,async()=>{
    await connect();
    console.log('Server Started At 3000!!');
});