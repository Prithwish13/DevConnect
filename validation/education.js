const {body} = require('express-validator');

module.exports = [
    body('school').isLength({min:2}).withMessage('School field is Required'),
    body('degree').isLength({min:2}).withMessage('Degree field is requied'),
    body('fieldOfStudy').isLength({min:2}).withMessage('FieldOfStudy is requied'),
    body('from').isDate().withMessage('from must be a date'),
    body('to').notEmpty().isDate().withMessage('from must be a date'),
    body('description').notEmpty().isLength({min:10}).withMessage('from must be a date'),
]