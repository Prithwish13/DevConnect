const {body} = require('express-validator');

module.exports = [
    body('email').isEmail().withMessage('please enter a valid email'),
    body('name').isLength({min:3}).withMessage('name Should be three character long'),
    body('password').isLength({min:6}).withMessage('password should be 6 chacter long'),
    body('confirmpassword').custom((value,{req})=>{
        if(value !== req.body.password){
            return Promise.reject('password and confirm password must same')
        }
        return true ;
    })
]