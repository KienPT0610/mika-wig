import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  try {
    const db = await getDb()

    if (req.method === 'GET') {
      const result = await db.execute(`SELECT f.id, u.name AS user_name, u.email, u.avatar, f.message, f.rating, f.created_at FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC LIMIT 5`)
      res.status(200).json({ feedback: result.rows })
      return
    }

    if (req.method === 'POST') {
      const { user_id, message, rating } = req.body || {}
      if (!user_id) return res.status(400).json({ error: 'user_id required' })
      if (!message || message.trim().length === 0) return res.status(400).json({ error: 'message required' })

      await db.execute('INSERT INTO feedback (user_id, message, rating, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [user_id, message, rating || null])
      res.status(201).json({ ok: true })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    res.status(500).json({ error: 'DB error', detail: e.message })
  }
}
