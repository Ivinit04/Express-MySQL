const reviewController = require('../controllers/reviewController.js');
const router = require('express').Router();
const {body} = require('express-validator');


router.post("/addReview/:id" ,[
    body('rating').notEmpty().withMessage('rating is required'),
    body('description').notEmpty().withMessage('description is required')
], reviewController.addReview);
router.get("/getAllReviews/:id" , reviewController.getAllReviews);

module.exports = router;