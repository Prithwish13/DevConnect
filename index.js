const express = require('express');
const mongoose = require('mongoose');
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

app.get('/',(req,res)=>res.send('hello'));

//use routes
app.use('/api/user',userRoute);
app.use('/api/profile',profileRoute);
app.use('/api/post',postRoute);

app.listen(port);