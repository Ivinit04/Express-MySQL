const db = require('../models');
const { validationResult } = require('express-validator');
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors.js');

const Review = db.reviews;
const Product = db.products;

const addReview = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rating, description } = req.body;
    const id = req.params.id;

    try {
        if (!await Product.findOne({ where: { id: id } })) {
            return res.status(404).send({ code: ERROR_CODES.NOT_FOUND, message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        const review = await Review.create({ rating, description, productId: id });
        res.status(201).send(review);
    } catch (error) {
        console.error(`Error occurred while creating the review for product id ${id}:`, error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const getAllReviews = async (req, res) => {
    const id = req.params.id;

    try {
        const reviews = await Review.findAll({ include: Product, where: { productId: id } });

        const formatedReviews = reviews.map((review) => {
            const { product, ...rest } = review.toJSON();
            return {
                ...rest,
                product: review.product.title
            }
        })
        res.status(200).send(formatedReviews);
    } catch (error) {
        console.error("Error occurred while fetching reviews:", error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }

}

module.exports = {
    addReview,
    getAllReviews
}