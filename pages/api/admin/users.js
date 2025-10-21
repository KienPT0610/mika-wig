import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()
  if (req.method === 'GET') {
    // List users
    const result = await db.execute('SELECT id, email, role FROM users ORDER BY id DESC')
    res.status(200).json({ users: result.rows })
  } else if (req.method === 'PUT') {
    // Update user role
    const { id, role } = req.body
    if (!id || !role) return res.status(400).json({ error: 'Thiếu thông tin' })
    await db.execute('UPDATE users SET role=? WHERE id=?', [role, id])
    res.status(200).json({ updated: true })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
