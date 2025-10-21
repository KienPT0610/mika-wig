import { getDb } from '../../../lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // ✅ Lấy đầy đủ dữ liệu từ body
  const { id, email, name, password, address, phone, avatar } = req.body || {}

  if (!id) return res.status(400).json({ error: 'id required' })

  try {
    const db = getDb()
    const sets = []
    const params = []

    if (email) { sets.push('email = ?'); params.push(String(email).toLowerCase()) }
    if (name) { sets.push('name = ?'); params.push(name) }
    if (password) { sets.push('password = ?'); params.push(String(password)) }
    if (address) { sets.push('address = ?'); params.push(address) }
    if (phone) { sets.push('phone = ?'); params.push(phone) }
    if (avatar) { sets.push('avatar = ?'); params.push(avatar) }

    if (sets.length) {
      const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = ?`
      params.push(id)
      await db.execute(sql, params)
    }

    const created = await db.execute(
      'SELECT id, email, name, address, phone, avatar FROM users WHERE id = ?',
      [id]
    )
    const row = (created.rows && created.rows[0]) || null
    if (!row) return res.status(404).json({ error: 'Not found' })

    return res.status(200).json(row)
  } catch (err) {
    console.error('update user error', err)
    return res.status(500).json({ error: 'DB error' })
  }
}
