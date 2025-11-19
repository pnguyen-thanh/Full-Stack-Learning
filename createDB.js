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

    const cartItems = `
        CREATE TABLE IF NOT EXISTS cart_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTERGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
        );`

    await db.exec(usersTable)
    await db.exec(productsTable)
    await db.exec(cartItems)

    await db.close()
    console.log('Table created')
}

createDB()