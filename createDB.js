import { getDBConnection } from "./db/db.js";

async function createDB() {
    const db = await getDBConnection()

    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`

    const productsTable = `
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        year INTEGER,
        genre TEXT,
        stock INTEGER
        );`


    await db.exec(usersTable)
    await db.exec(productsTable)

    await db.close()
    console.log('Table created')
}

createDB()