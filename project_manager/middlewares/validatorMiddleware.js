import { validationResult } from "express-validator"
import { apiError } from "../utils/api-error.js"

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => {
        extractedErrors.push({
            [err.path]: err.msg
        })
    })
    throw apiError({
        statusCode: 422,
        message: "Received data is not valid",
        errors: extractedErrors
    })
}