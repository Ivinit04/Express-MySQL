const productController = require('../controllers/productController.js')
const router = require('express').Router();
const {body} = require('express-validator');
const {verifyToken} = require('../utils/verifyToken.js');

router.post("/addProduct", [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be string'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('published').notEmpty().withMessage('Published is required').isBoolean().withMessage('Published field must be a boolean value')
], verifyToken, productController.addProduct);
router.get("/getAllProducts", verifyToken, productController.getAllProducts);
router.get("/getPublishedProducts", verifyToken, productController.getPublishedProducts);
router.put("/updateProduct/:id", verifyToken, productController.updateProduct);

module.exports = router;