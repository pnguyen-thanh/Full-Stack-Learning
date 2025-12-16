import { Router } from "express"
import { registerUser } from "../controllers/authControllers.js"
import { validate } from "../middlewares/authMiddleware.js"
import { 
    userRegistrationValidator,
    userLoginValidator
} from "../validators/index.js"

const authRoute = Router()

authRoute.post("/register",userRegistrationValidator(), validate, registerUser)

export { authRoute }