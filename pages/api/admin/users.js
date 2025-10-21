import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  try {
    const db = await getDb()
    const result = await db.execute('SELECT id, name, email, phone, address FROM users ORDER BY created_at DESC')
    res.status(200).json({ users: result.rows })
  } catch (e) {
    res.status(500).json({ error: 'DB error', detail: e.message })
  }
}
