import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  try {
    const db = getDb()

    const sql = `
      SELECT c.id, c.name AS category, COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id, c.name
      ORDER BY product_count DESC
    `

    const result = await db.execute(sql)

    // result will contain rows in result.rows
    // normalize to simple array of { category, product_count }
    const rows = (result?.rows || []).map(r => ({
      id: r[0],
      category: r[1],
      product_count: Number(r[2] || 0),
    }))

    res.status(200).json({ ok: true, data: rows })
  } catch (err) {
    console.error('Error in /api/admin/stats', err)
    res.status(500).json({ ok: false, error: String(err) })
  }
}
