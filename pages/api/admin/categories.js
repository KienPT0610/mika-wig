import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  try {
    const db = await getDb()
    const result = await db.execute('SELECT id, name FROM categories ORDER BY name')
    res.status(200).json({ categories: result.rows })
  } catch (e) {
    res.status(500).json({ error: 'DB error', detail: e.message })
  }
}
