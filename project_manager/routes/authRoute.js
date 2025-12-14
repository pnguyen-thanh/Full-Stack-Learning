import { Router } from "express"
import { registerUser } from "../controllers/authControllers.js"

const authRoute = Router()

authRoute.post("/register", registerUser)

export { authRoute }