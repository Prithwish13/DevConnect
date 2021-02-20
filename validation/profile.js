const {body} = require('express-validator');

module.exports = [
    body('handle').isLength({
        min:3
    }).withMessage('handle should be maximum 40 character n'),
    body('status').isLength({min:2}).withMessage('Status could not be empty'),
    // body('website').trim().notEmpty().isURL().withMessage('website must be an url'),
    // body('company').trim().notEmpty().isLength({min:6}).withMessage('Company Name should be atleast 6 character long'),
    // body('location').trim().notEmpty().isLength({min:3}).withMessage('Location must be atLeast 3 character long'),
    // body('bio').trim().notEmpty().isLength({min:10}).withMessage('bio must be 10 cahracter long'),
    // body('githubUserName').trim().notEmpty().isLength({min:3}).withMessage(''),
    // body('facebook').trim().notEmpty().isURL().withMessage('facebook must be an url'),
    // body('youtube').trim().notEmpty().isURL().withMessage('youtube must be an url'),
    // body('instagram').trim().notEmpty().isURL().withMessage('instagram must be an url'),
    // body('linkedin').trim().notEmpty().isURL().withMessage('linkedin must be an url'),
    // body('twitter').trim().notEmpty().isURL().withMessage('twitter must be an url'),
    // body('skills').trim().notEmpty().isLength({min:3}).withMessage('skills should be atleast 3 character lomg')
]