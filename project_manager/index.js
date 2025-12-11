import app from "./app.js"
import dbConnection from "./db/db.js"
import 'dotenv/config'

const port = process.env.PORT || 3000

dbConnection()
    .then(() => {
        app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error", err);
        process.exit(1);
    });