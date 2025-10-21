import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()
  if (req.method === 'GET') {
    // Get cart items for user
    const { user_id } = req.query
    if (!user_id) return res.status(400).json({ error: 'Thiếu user_id' })
    const result = await db.execute(`SELECT ci.*, p.name, p.price, p.image_urls FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id=? ORDER BY ci.created_at DESC`, [user_id])
    const rows = result.rows.map(row => ({ ...row, image_urls: row.image_urls ? JSON.parse(row.image_urls) : [] }))
    res.status(200).json({ items: rows })
  } else if (req.method === 'POST') {
    // Add item to cart
    const { user_id, product_id, quantity } = req.body
    if (!user_id || !product_id) return res.status(400).json({ error: 'Thiếu thông tin' })
    // Check if item exists
    const exists = await db.execute('SELECT id, quantity FROM cart_items WHERE user_id=? AND product_id=?', [user_id, product_id])
    if (exists.rows.length > 0) {
      // Update quantity
      const newQty = (quantity ? Number(quantity) : 1) + Number(exists.rows[0].quantity)
      await db.execute('UPDATE cart_items SET quantity=? WHERE id=?', [newQty, exists.rows[0].id])
      return res.status(200).json({ updated: true })
    }
    await db.execute('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity || 1])
    res.status(201).json({ added: true })
  } else if (req.method === 'PUT') {
    // Update quantity
    const { id, quantity } = req.body
    if (!id || !quantity) return res.status(400).json({ error: 'Thiếu thông tin' })
    await db.execute('UPDATE cart_items SET quantity=? WHERE id=?', [quantity, id])
    res.status(200).json({ updated: true })
  } else if (req.method === 'DELETE') {
    // Remove item
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Thiếu id' })
    await db.execute('DELETE FROM cart_items WHERE id=?', [id])
    res.status(200).json({ deleted: true })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
