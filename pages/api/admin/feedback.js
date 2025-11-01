import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()
  try {
    // ensure settings table exists for storing feedback_limit
    await db.execute('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)')

    if (req.method === 'GET') {
        // if asking for a single setting value
        if (req.query && req.query.settings) {
          const key = String(req.query.settings)
          const s = await db.execute('SELECT value FROM settings WHERE key=?', [key])
          return res.status(200).json({ key, value: s.rows && s.rows.length ? s.rows[0].value : null })
        }

        // support pagination: ?limit & ?page
        let limit = null
        let page = 1
        if (req.query && req.query.limit) {
          const q = parseInt(req.query.limit, 10)
          if (!isNaN(q) && q > 0) limit = q
        }
        if (req.query && req.query.page) {
          const p = parseInt(req.query.page, 10)
          if (!isNaN(p) && p > 0) page = p
        }

        // if pagination requested compute total and return paged rows
        if (limit) {
          const cnt = await db.execute('SELECT COUNT(1) AS cnt FROM feedback')
          const total = (cnt && cnt.rows && cnt.rows[0] && Number(cnt.rows[0].cnt)) || 0
          const offset = (page - 1) * limit
          const rows = await db.execute(`SELECT f.id, f.user_id, u.name AS user_name, u.email, u.avatar, f.message, f.rating, f.created_at FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC LIMIT ? OFFSET ?`, [limit, offset])
          return res.status(200).json({ feedback: rows.rows, total })
        }

        // list all feedback for admin
        const rowsAll = await db.execute(`SELECT f.id, f.user_id, u.name AS user_name, u.email, u.avatar, f.message, f.rating, f.created_at FROM feedback f JOIN users u ON f.user_id = u.id ORDER BY f.created_at DESC`)
        return res.status(200).json({ feedback: rowsAll.rows })
    }

    if (req.method === 'DELETE') {
      // allow body.ids array
      const { ids } = req.body || {}
      if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'ids required' })
      const placeholders = ids.map(() => '?').join(',')
      await db.execute(`DELETE FROM feedback WHERE id IN (${placeholders})`, ids)
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'PUT') {
      // update settings: { key: 'feedback_limit', value: '5' }
      const { key, value } = req.body || {}
      if (!key) return res.status(400).json({ error: 'key required' })
      await db.execute('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, String(value || '')])
      return res.status(200).json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('admin/feedback error', err)
    res.status(500).json({ error: String(err) })
  }
}
