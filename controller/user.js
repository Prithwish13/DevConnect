const User = require("../models/User")
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {validationResult} = require('express-validator');

exports.registerUser = async (req,res,next) => {
    let error = validationResult(req);
    if(!error.isEmpty()){
        let errObj={}
        error = error.array();
        for (let i of error){
            errObj[i.param] = i.msg;
        }
        return res.status(400).json(errObj);
    }
    try {
       const user = await User.findOne({email:req.body.email}); 
       if(user){
        return res.status(400).json({
           email:'Email already exists' 
        })
       }
       const avatar = await gravatar.url(req.body.email,{
           s:'200', //size
           r:'pg',  //rating
           d:'mm'   //default
       });
       const newUser = new User({
           name:req.body.name,
           email:req.body.email,
           avatar:avatar,
           password:req.body.password
       });

       bcrypt.genSalt(10,(err,salt)=>{
           if(err){
               throw err;
           }
           bcrypt.hash(newUser.password,salt,(err,hash)=>{
               if(err) throw err;
               newUser.password = hash;
               newUser.save()
                      .then(user=>res.json(user))
                      .catch(err=>{
                          console.log(err);
                      })
           })
       })
    } catch (error) {
        console.log(error);
    }
   
}

exports.postLogin = async (req,res,next) => {
 let error = validationResult(req);
    if(!error.isEmpty()){
        let errObj={}
        error = error.array();
        for (let i of error){
            errObj[i.param] = i.msg;
        }
        return res.status(400).json(errObj);
    } 

 const {email,password} = req.body;

//Find the user by Email
 try {
     const user = await User.findOne({email:email});
     if(!user){
         return res.status(404).json({
             email:'User not found'
         })
     }

     //check password
     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
         return res.status(400).json({
             password:'Wrong password'
         })
     }
    //sign the token
    const token = jwt.sign({
       id:user._id.toString(),
       name:user.name,
       avatar:user.avatar
    },process.env.SECRET,{expiresIn:'1h'});
    
    res.status(200).json({
        success:true,
        token:'Bearer '+token
    }); 
 } catch (error) {
     console.log(error);
 }

};

exports.getCurrenUser = (req,res,next) => {
    res.json({
       id:req.user._id,
       name:req.user.name,
       email:req.user.email
    })
}