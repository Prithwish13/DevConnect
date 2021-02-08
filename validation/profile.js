const {body} = require('express-validator');

module.exports = [
    body('handle').isLength({
        max:40,
        min:3
    }).withMessage('handle should be maximum 40 character n'),
    body('status').isLength({min:2}).withMessage('Status could not be empty'),
    body('website').notEmpty().isURL().withMessage('website must be an url'),
    body('company').notEmpty().isLength({min:6}).withMessage('Company Name should be atleast 6 character long'),
    body('location').notEmpty().isLength({min:3}).withMessage('Location must be atLeast 3 character long'),
    body('bio').notEmpty().isLength({min:10}).withMessage('bio must be 10 cahracter long'),
    body('githubUserName').notEmpty().isLength({min:3}).withMessage(''),
    body('facebook').notEmpty().isURL().withMessage('facebook must be an url'),
    body('youtube').notEmpty().isURL().withMessage('youtube must be an url'),
    body('instagram').notEmpty().isURL().withMessage('instagram must be an url'),
    body('linkedin').notEmpty().isURL().withMessage('linkedin must be an url'),
    body('twitter').notEmpty().isURL().withMessage('twitter must be an url'),
    body('skills').notEmpty().isLength({min:3}).withMessage('skills should be atleast 3 character lomg')
]