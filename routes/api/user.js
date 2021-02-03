const express = require('express');
const passport = require('passport');
const { registerUser,postLogin,getCurrenUser } = require('../../controller/user');
const signupValidator = require('../../validation/register');
const loginValidator = require('../../validation/login');
const router = express.Router();

// @route POST api/user/register
// @desc  Register user
// @access Public
router.post('/register',signupValidator,registerUser)

// @route POST api/user/login
// @desc  login user/returning the jwt Tkn
// @access Public
router.post('/login',loginValidator,postLogin)

// @route GET api/user/current
// @desc  return current user
// @access private
router.get('/current',passport.authenticate('jwt',{session:false}),getCurrenUser)


module.exports=router;