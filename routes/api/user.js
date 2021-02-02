const express = require('express');
const passport = require('passport');
const { registerUser,postLogin,getCurrenUser } = require('../../controller/user');
const router = express.Router();

// @route GET api/user/register
// @desc  Register user
// @access Public
router.post('/register',registerUser)

// @route GET api/user/login
// @desc  login user/returning the jwt Tkn
// @access Public
router.post('/login',postLogin)

// @route GET api/user/current
// @desc  return current user
// @access private
router.get('/current',passport.authenticate('jwt',{session:false}),getCurrenUser)


module.exports=router;