const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const {validationResult} = require('express-validator');

exports.getUserProfile = async (req,res,next) => {
  const errors = {};  
  try {
      const profile = await Profile.findOne({user:req.user.id});
      if(!profile){
          errors.noProfile = 'There is no profile for this user';
          return res.status(404).json(errors);
      }
  res.status(200).json(profile);
  } catch (error) {
     res.status(500).json(error);
  }
};

exports.createUserProfile = async (req,res,next) =>{
    
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log('this is running')
        let errObj={}
        errors = errors.array();
        for (let i of errors){
            errObj[i.param] = i.msg;
        }
        return res.status(400).json(errObj);
    }

    const profileFields = {};
    profileFields.social={};
    profileFields.user = req.user.id;


    for (let field in req.body){
        if(field == 'youtube' || field ==  'facebook' || field ==  'instagram' || field =='twitter' || field == 'linkedin'){
            profileFields.social[field] = req.body[field] ? req.body[field]: '';
        }else if(field === 'skills'){
             profileFields.skills = req.body.skills.split(',');
        }else if(
            field === 'handle' || field === 'company' || field === 'website' || field === 'location' || field === 'status' || field === 'bio' || field === 'githubUserName'
            )
        {
            profileFields[field] = req.body[field] ?  req.body[field] : '';
        }
    }

    // if(req.body.handle) profileFields.handle=req.body.handle;
    // if(req.body.company) profileFields.company=req.body.company;
    // if(req.body.website) profileFields.website=req.body.website;
    // if(req.body.location) profileFields.location=req.body.location;
    // if(req.body.bio) profileFields.bio=req.body.bio;
    // if(req.body.status) profileFields.status=req.body.status;
    // if(req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;

    //skills
    // if (req.body.skills){
    //     profileFields.skills = req.body.skills.split(',');
    // }

    //socials
    // if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    // if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    // if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    // if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    // if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    
    //find the profile

    try {
        const profile = await Profile.findOne({user:req.user.id});
    if(profile){
      const updatedProfile = await  Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
      if(updatedProfile){
          res.json(updatedProfile);
      }
    }else{
      const exists = await Profile.findOne({handle:profileFields.handle});
      if(exists){
          errors.handle = 'That handle already exists';
          return res.status(4000).json(errors);
      }
      const newProfile = new Profile(profileFields);
       newProfile.save()
                 .then(result => {
                    res.status(200).json({
                        message:'Created Successfully'
                    })
                 })
                 .catch(err=>{
                     console.log(err);
                 })

    }
    } catch (error) {
        console.log(error);
    }
}
