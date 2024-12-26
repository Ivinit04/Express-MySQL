const db = require('../models');
const { validationResult } = require('express-validator');
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors.js');
const {validateError} = require('../utils/validation.js');

const Product = db.products;
const Review = db.reviews;


const addProduct = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json(validateError(errors.array()));
        // return res.status(400).json(errors.array());
    }
    const { title, price, description, published } = req.body;

    try {
        if (await Product.findOne({ where: { title: title } })) {
            return res.status(409).send({ code: ERROR_CODES.CONFLICT, message: ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS });
        }
        const product = await Product.create({ title, price, description, published });
        res.status(201).send(product);
    } catch (error) {
        console.error("Error occurred while creating the product:", error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const getAllProducts = async (req, res) => {

    try {
        const products = await Product.findAll({ include: Review });

        /*
        To fetch only the rating and description fields from the reviews associated with each product
        const products = await Product.findAll({include : [{
            model : Review,
            attributes : ["rating" , "description"]
        }]}); 
        */

        // const formatedProducts = products.map((product)=>{
        //     return  {
        //         id : product.id,
        //         title: product.title,
        //         price : product.price,
        //         description : product.description,
        //         published : product.published,
        //         reviews : product.reviews.map((review)=>{
        //             return [review.rating , review.description];
        //         })
        //     }
        // })

        const formatedProducts = products.map((product) => {
            const { reviews, ...rest } = product.toJSON(); // Convert to plain JSON object
            return {
                ...rest, // Spread all other fields of the product
                reviews: reviews.map((review) => {
                    return [review.rating, review.description];
                })
            }
        })

        res.status(200).send(formatedProducts);
    } catch (error) {
        console.error("Error occurred while fetching products:", error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const getPublishedProducts = async (req, res) => {

    try {
        const products = await Product.findAll({ where: { published: true }, include: Review });

        const formatedProducts = products.map((product) => {
            const { reviews, ...rest } = product.toJSON(); // Convert to plain JSON object
            return {
                ...rest, // Spread all other fields of the product
                reviews: reviews.map((review) => {
                    return [review.rating, review.description];
                })
            }
        })

        res.status(200).send(formatedProducts);
    } catch (error) {
        console.error(`Error occurred while fetching product of id ${id}`, error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        if (!await Product.findOne({ where: { id: id } })) {
            return res.status(404).send({ code: ERROR_CODES.NOT_FOUND, message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }

        const product = await Product.update(req.body, { where: { id: id } });
        res.status(200).send(product);
    } catch (error) {
        console.error(`Error occurred while updating product of id ${id}`, error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getPublishedProducts,
    updateProduct
}