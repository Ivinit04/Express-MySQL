require('dotenv').config();
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors.js');
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {

    try {
        let token = req.headers.authorization;
        // console.log(token);
        if (!token) {
            return res.status(401).send({
                code: ERROR_CODES.UNAUTHORIZED,
                message: ERROR_MESSAGES.NOT_PROVIDED
            })
        }
        token = token.split(' ')[1];
        const userPayload = jwt.verify(token, key);
        // console.log(userPayload);
        next();
    } catch (error) {
        console.error("Error occurred while verifying the token:", error);
        res.status(500).send({
            code: ERROR_CODES.UNAUTHORIZED,
            message: ERROR_MESSAGES.INVALID_TOKEN
        });
    }
}

module.exports = { verifyToken }