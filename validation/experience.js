const {body} = require('express-validator');

module.exports = [
    body('title').isLength({min:2}).withMessage('title field is Required'),
    body('company').isLength({min:2}).withMessage('company name is requied'),
    body('from').isDate().withMessage('from must be a date'),
    body('to').notEmpty().isDate().withMessage('from must be a date'),
    body('description').notEmpty().isLength({min:10}).withMessage('from must be a date'),
]