const { VALIDATION_ERROR_CODES, VALIDATION_ERROR_MESSAGES } = require('../constants/validationError.js');

const validateError = (errors) => {

    /* complexity - O(n)
    const errMsg =  errors.find((error)=>{
        console.log(error.path);
        return error;
    }) */
    const errMsg = errors[0];
    // console.log(errMsg.msg);
    switch (errMsg.path) {
        case "title":
            if (errMsg.msg === "Title is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_TITLE,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_TITLE
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_TITLE,
                    message: "STRING_REQUIRED"
                };
            }
        case "price":
            if (errMsg.msg === "Price is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PRICE,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_PRICE
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PRICE,
                    message: "NUMBER_REQUIRED"
                };
            }
        case "published":
            if (errMsg.msg === "Published is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PUBLISHED,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_PUBLISHED
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PUBLISHED,
                    message: "BOOLEAN_REQUIRED"
                };
            }
        case "username":
            if (errMsg.msg === "Username is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_USERNAME,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_USERNAME
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_USERNAME,
                    message: errMsg.msg
                };
            }
        case "password":
            if (errMsg.msg === "Password is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PASSWORD,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_PASSWORD
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PASSWORD,
                    message: errMsg.msg
                };
            }
        case "email":
            if (errMsg.msg === "Email is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_EMAIL,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_EMAIL
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_EMAIL,
                    message: errMsg.msg
                };
            }
        case "phoneNumber":
            if (errMsg.msg === "Phone Number is required") {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PHONE,
                    message: VALIDATION_ERROR_MESSAGES.EMPTY_PHONE
                };
            } else {
                return {
                    code: VALIDATION_ERROR_CODES.INVALID_PHONE,
                    message: errMsg.msg
                };
            }
        default:
            break;
    }
}
module.exports = { validateError }