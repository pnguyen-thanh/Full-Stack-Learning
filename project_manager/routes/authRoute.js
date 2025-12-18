import { Router } from "express"
import { registerUser, loginUser } from "../controllers/authControllers.js"
import { validate } from "../middlewares/validatorMiddleware.js"
import { 
    userRegistrationValidator,
    userLoginValidator
} from "../validators/index.js"

const authRoute = Router()

authRoute.post("/register",userRegistrationValidator(), validate, registerUser)
authRoute.post("/login", userLoginValidator(), validate, loginUser)

export { authRoute }