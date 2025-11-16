import { getDBConnection } from "../db/db.js";

export async function getGenres() {
    const db = await getDBConnection()
}

export async function getProducts(req, res) {

    try {
        const db = await getDBConnection()
        let query =  `SELECT * FROM products`
        let params = []
        
        const products = await db.all(query, params)
    
        res.json(products)
    } catch(err) {
        res.status(500).json({error: 'Failed to fetch products', details: err.message})
    }
    
}