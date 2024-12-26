const userController = require('../controllers/userController.js');
const router = require('express').Router();
const {body} = require('express-validator');

router.post("/signup" ,[
    body('username').notEmpty().withMessage('Username is required').isString().withMessage('Username must be string'),
    body('password').notEmpty().withMessage('Password is required').isStrongPassword().withMessage('Password must be valid and strong'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Provide valid email'),
    body('phoneNumber').notEmpty().withMessage('Phone Number is required').isMobilePhone('en-IN').withMessage('Provide valid phone number')
], userController.signup);
router.get("/login" ,[
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
], userController.login);

module.exports = router;