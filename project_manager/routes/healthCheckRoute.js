import express from 'express'
import healthcheck from '../controllers/healthCheckController.js'

const healthRoute = express.Router()

healthRoute.get('/', healthcheck)

export default healthRoute