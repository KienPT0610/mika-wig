import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  try {
    const db = await getDb()

    if (req.method === 'GET') {
      // pagination: allow ?limit= and ?page=, otherwise fall back to settings.feedback_limit or default 5
      let limit = 5
      let page = 1
      if (req.query && req.query.limit) {
        const q = parseInt(req.query.limit, 10)
        if (!isNaN(q) && q > 0) limit = q
      } else {
        try {
          await db.execute('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)')
          const s = await db.execute('SELECT value FROM settings WHERE key=?', ['feedback_limit'])
          if (s && s.rows && s.rows.length > 0) {
            const v = parseInt(s.rows[0].value, 10)
            if (!isNaN(v) && v > 0) limit = v
          }
        } catch (e) {
          console.debug('settings read error', e.message)
        }
      }
      if (req.query && req.query.page) {
        const p = parseInt(req.query.page, 10)
        if (!isNaN(p) && p > 0) page = p
      }

      const offset = (page - 1) * limit
      // total count
      const cntRes = await db.execute('SELECT COUNT(1) AS cnt FROM feedback')
      const total = (cntRes && cntRes.rows && cntRes.rows[0] && Number(cntRes.rows[0].cnt)) || 0

      const result = await db.execute(`SELECT f.id, u.name AS user_name, u.email, u.avatar, f.message, f.rating, f.created_at FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC LIMIT ? OFFSET ?`, [limit, offset])
      res.status(200).json({ feedback: result.rows, total })
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
