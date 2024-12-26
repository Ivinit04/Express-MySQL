require('dotenv').config();
const db = require('../models');
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors.js');
const { validationResult } = require('express-validator');
const {validateError} = require('../utils/validation.js');
const jwt = require('jsonwebtoken');

const User = db.users;
const key = process.env.SECRET_KEY;

const signup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validateError(errors.array()));
    }

    const { username, password, email, phoneNumber } = req.body;
    try {
        if (await User.findOne({ where: { email: email } })) {
            return res.status(409).send({ code: ERROR_CODES.CONFLICT, message: ERROR_MESSAGES.USER_ALREADY_EXISTS });
        }
        const user = await User.create({ username, password, email, phoneNumber });
        res.status(201).send(user);
    } catch (error) {
        console.error("Error occurred while creating the user:", error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const login = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json(errors.array());
        return res.status(400).json(validateError(errors.array()));
    }
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { email: email } })
        //verifying credentials
        if (!userExists || userExists.password !== password) {
            return res.status(401).send({code : ERROR_CODES.UNAUTHORIZED , message : ERROR_MESSAGES.INVALID_USER});
        }
        const token = jwt.sign({id : userExists.id},key);
        res.status(200).send(token);
    } catch (error) {
        console.error("Error occurred while fetching the users:", error);
        res.status(500).send({ code: ERROR_CODES.SERVER_ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

module.exports = {
    signup,
    login
}