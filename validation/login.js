const {body} = require('express-validator');

module.exports = [
    body('email').isEmail().withMessage('please provide a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be minimum of 6 character')
]