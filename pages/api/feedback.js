import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  try {
    const db = await getDb()
    const result = await db.execute(`SELECT f.id, u.name AS user_name, u.email, u.avatar, f.message, f.rating, f.created_at FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC LIMIT 5`)
    res.status(200).json({ feedback: result.rows })
  } catch (e) {
    res.status(500).json({ error: 'DB error', detail: e.message })
  }
}
