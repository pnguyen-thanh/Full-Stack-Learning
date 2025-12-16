const apiError = ({ statusCode = 500, message = "Something went wrong", errors = [] }) => {
    const err = new Error(message)
    err.statusCode = statusCode
    err.errors = errors
    return err
}

export { apiError }