import { getDBConnection } from "./db/db.js";
import { vinylRecords } from "./data.js";

async function removeDB() {
    const db = await getDBConnection()

    const query = `DELETE FROM products`

    await db.run(query)

    await db.close()
    console.log("Delete the records successfully")
}

async function insertDB() {

    await removeDB()
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