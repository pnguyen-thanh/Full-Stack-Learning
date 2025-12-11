import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import healthRoute from "./routes/healthCheckRoute.js"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
// app.use(express.static("public"))
app.use(cookieParser())

app.use(cors())

app.use("/api/v1/healthcheck", healthRoute)

app.get("/", (req, res) => {
    res.send("Welcome to Project Manager App")
})

export default app
