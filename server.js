import express from 'express'
import { productsRouter } from './routes/products.js'


const app = express()
const PORT = 8000

app.use(express.static('public'))

// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
})

app.use('/api/products', productsRouter)

// 404 handler
app.use((req, res) => {
    console.error(`404: ${req.method} ${req.path} not found`)
    res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (err) => {
    console.error('Failed to start server: ', err)
})