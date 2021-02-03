const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const app = express();

//importing router
const userRoute = require("./routes/api/user");
const postRoute = require("./routes/api/post");
const profileRoute = require("./routes/api/profile");

//port
const port = process.env.PORT || 4000;

//DB config
const db = require('./config/keys');

//connection to database
mongoose.connect(db.mongoUri,{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log("database connected successfully")
})
.catch(err=>console.log(err))

//body-parser middlewere
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


//use routes
app.use('/api/user',userRoute);
app.use('/api/profile',profileRoute);
app.use('/api/post',postRoute);

app.listen(port);