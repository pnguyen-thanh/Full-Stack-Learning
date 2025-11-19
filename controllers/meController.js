import { getDBConnection } from '../db/db.js'

export async function getCurrentUser(req, res) {
  // If there's no session or no userId, return not logged in
  if (!req.session || !req.session.userId) {
    return res.status(200).json({ isLoggedIn: false })
  }

  try {
    const db = await getDBConnection()
    const user = await db.get('SELECT id, name, username FROM users WHERE id = ?', [req.session.userId])

    if (!user) {
      return res.status(200).json({ isLoggedIn: false })
    }

    return res.json({ isLoggedIn: true, name: user.name, username: user.username })
  } catch (err) {
    console.error('getCurrentUser error:', err)
    return res.status(500).json({ isLoggedIn: false })
  }
}
// import { getDBConnection } from "../db/db.js";

// export async function getCurrentUser(req, res) {
//     try {
//         const db = await getDBConnection()

//         if (!req.session.userId) {
//             return res.json({ isLoggedIn: false})
//         }

//         const user = await db.run(`SELECT name FROM users WHERE id = ?`, [req.session.userId])

//         return res.json({ isLoggedIn: true, name: user.name})
//     } catch(err) {
//         console.error('getCurrentUser error: ', err)
//         res.status(500).json({ error: 'Internal server error' })
//     }
// }