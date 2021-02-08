const express = require('express');
const router = express.Router();
const profileValidator = require('../../validation/profile');
const { getUserProfile,createUserProfile } = require('../../controller/profile');
const passport =  require('passport');

// @route GET api/profile
// @desc  get user profile
// @access protected
router.get('/',passport.authenticate('jwt',{session:false}),getUserProfile);

// @route POST api/profile/create
// @desc  CREATE user profile
// @access protected
router.post('/create',passport.authenticate('jwt',{session:false}),profileValidator,createUserProfile);

module.exports=router;