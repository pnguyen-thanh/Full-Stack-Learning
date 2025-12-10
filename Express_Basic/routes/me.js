import express from 'express'
import { getCurrentUser } from '../controllers/meController.js'

export const meRouter = express.Router()

// Mounted at /api/auth/me — respond to GET /
meRouter.get('/', getCurrentUser)