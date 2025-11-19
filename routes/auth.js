import express from 'express'
import { registerUser, userLogin, logOut } from '../controllers/authController.js'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', userLogin)
authRouter.get('/logout', logOut)