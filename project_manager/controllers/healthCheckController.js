import { apiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"

const healthcheck = asyncHandler(async (req, res) => {
    res.status(200).json(apiResponse({ statusCode: 200, data: "", message: "Server is running" }))
})

export default healthcheck