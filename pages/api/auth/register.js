import { MESSAGE } from '../../../constanst'
import { getDb } from '../../../lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password, name, address, phone, avatar } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: MESSAGE.REGISTER_REQUIRED })
  const emailNormalized = String(email).trim().toLowerCase()
  const rawPassword = String(password)
  try {
    const db = getDb()
    // check existing
    const existingRes = await db.execute('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [emailNormalized])
    const existing = existingRes.rows || []
    if (existing && existing.length) return res.status(409).json({ error: MESSAGE.REGISTER_EMAIL_EXISTS })

    await db.execute('INSERT INTO users (email, password, name, address, phone, avatar) VALUES (?, ?, ?, ?, ?, ?)', [emailNormalized, rawPassword, name || '', address || '', phone || '', avatar || ''])
    const created = await db.execute('SELECT id, email, name, address, phone, avatar FROM users WHERE LOWER(email) = LOWER(?)', [emailNormalized])
    const row = (created.rows && created.rows[0]) || null
    return res.status(201).json(row)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: MESSAGE.SERVER_ERROR })
  }
}
