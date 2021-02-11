const {body} = require('express-validator');

exports.createPostValidator = [
    body('title').isLength({min:3}).withMessage('Title must be 3 character Long'),
    body('text').isLength({min:2}).withMessage('please enter some content for the post'),
]

exports.commentValidator = [
   body('text').isLength({min:1}).withMessage('please enter something in the comment')
]
