const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();

//importing router
const userRoute = require("./routes/api/user");
const postRoute = require("./routes/api/post");
const profileRoute = require("./routes/api/profile");

//port
const port = process.env.PORT || 4000;

//DB config
const db = require('./config/keys');

//configure the file Storage
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g,'-')+'-'+file.originalname)
    }
});

//configure file filter
const fileFilter = (req,file,cb) =>{
    if(req.error){
        cb(null,false)
    }else if (file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg' || file.mimetype==='image/JPG'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

//connection to database
mongoose.connect(db.mongoUri,{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log("database connected successfully")
})
.catch(err=>console.log(err))

//body-parser middlewere
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));


//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


//use routes
app.use('/api/user',userRoute);
app.use('/api/profile',profileRoute);
app.use('/api/post',postRoute);

app.listen(port);