import { getDBConnection } from "./db/db.js";
import { vinylRecords } from "./data.js";

async function insertDB() {
    const db = await getDBConnection()

    for (const record of vinylRecords) {
        const {title, artist, price, image, year, genre, stock } = record
        await db.run(
            `INSERT INTO products (title, artist, price, image, year, genre, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [title, artist, price, image, year, genre, stock]
        )
    }

    await db.close()
    console.log("All records inserted successfully")
}

insertDB()