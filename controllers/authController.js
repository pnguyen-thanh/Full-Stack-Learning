import { getDBConnection } from "../db/db.js"

export async function registerUser (req, res) {
    const { name, email, userName, password } = req.body

    if(!namne || !email || !userName || !password) {
        return res.status(400).json({ error: 'All fields are required.'})
    }

    name = name.trim()
    userName = userName.trim()
    email = email.trim()

    if (!/^[a-zA-Z0-9_-]{1, 20}$/.test((userName))) {
        return res.status(400).json({ error: 'Username must be 1–20 characters, using letters, numbers, _ or -.'})
    }


    try {
        const db = await getDBConnection()
        const existing = db.get(`SELECT id FROM users WHERE email = ? OR username = ?`, [email, userName])
        if (existing) {
            res.status(500).json({ error: 'Email or username already in use' })
        } else {
            res.status(201).json( {message: 'User register' })
        }

    } catch(error) {
         res.status(500).json({error: 'Failed to fetch users table', details: err.message})
    }
}