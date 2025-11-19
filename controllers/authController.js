import { getDBConnection } from "../db/db.js"
import validator from 'validator'
import bcrypt from 'bcrypt'

export async function registerUser (req, res) {
    let { name, email, userName, password } = req.body

    if(!name || !email || !userName || !password) {
        return res.status(400).json({ error: 'All fields are required.'})
    }

    name = name.trim()
    userName = userName.trim()
    email = email.trim()

    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(userName)) {

        return res.status(400).json(
        { error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' }
        )
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
    }

    try {
        const db = await getDBConnection()
        const existing = await db.get(`SELECT id FROM users WHERE email = ? OR username = ?`, [email, userName])
        if (existing) {
            return res.status(400).json({ error: 'Email or username already in use' })
        }

        const hashPass = await bcrypt.hash(password, 10)
        const result = await db.run(`INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`, [name, email, userName, hashPass])
        return res.status(201).json({ message: 'User registered' })

    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: 'Failed to register user', details: error.message })
    }
}


export async function userLogin (req, res) {
    
    let {userName, password} = req.body
    
    if (!userName || !password) {
        return res.status(400).json({ error: 'All fields are requried'})
    }

    userName = userName.trim()
    
    try {
        const db = await getDBConnection()
        const user = await db.get(`SELECT * FROM users WHERE username = ?`, [userName])

        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid Credentials'})
        }

        req.session.userId = user.id
        return res.json({ message: 'Logged in' })

    } catch(err) {
        console.error('Login error:', err.message)
        res.status(500).json({ error: 'Login failed. Please try again.' })
    }
}