const express = require('express');
const router = express.Router();

// @route GET api/post/test
// @desc  Test post route
// @access Public
router.get('/test',(req,res,next)=>res.json({
    msg:"working fine"
}))

module.exports=router;