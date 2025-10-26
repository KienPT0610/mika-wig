import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()
  // Detect whether cart_items has variant_id column so we can be compatible
  let cartHasVariant = false
  try {
    const info = await db.execute("PRAGMA table_info(cart_items)")
    if (info && info.rows) {
      cartHasVariant = info.rows.some((r) => r.name === 'variant_id')
    }
  } catch (e) {
    // ignore - conservative fallback: no variant column
    cartHasVariant = false
  }
  if (req.method === 'GET') {
    // Get cart items for user
    const { user_id } = req.query
    if (!user_id) return res.status(400).json({ error: 'Thiếu user_id' })
    let query
    if (cartHasVariant) {
      // include variant info if present
  query = `SELECT ci.*, p.name, p.price as product_price, p.image_urls, pv.id as variant_id, pv.material as variant_material, pv.color as variant_color, pv.hair_length as variant_hair_length, pv.price as variant_price, pv.stock as variant_stock FROM cart_items ci JOIN products p ON ci.product_id = p.id LEFT JOIN product_variants pv ON ci.variant_id = pv.id WHERE ci.user_id=? ORDER BY ci.created_at DESC`
    } else {
      query = `SELECT ci.*, p.name, p.price, p.image_urls FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id=? ORDER BY ci.created_at DESC`
    }
    const result = await db.execute(query, [user_id])
    const rows = result.rows.map(row => ({ ...row, image_urls: row.image_urls ? JSON.parse(row.image_urls) : [] }))
    res.status(200).json({ items: rows })
  } else if (req.method === 'POST') {
    // Add item to cart
    const { user_id, product_id, quantity } = req.body
    const variant_id = req.body.variant_id != null ? req.body.variant_id : null
    if (!user_id || !product_id) return res.status(400).json({ error: 'Thiếu thông tin' })
    // Check if item exists (consider variant if supported)
    let existsQuery
    let existsParams
    if (cartHasVariant) {
      existsQuery = 'SELECT id, quantity FROM cart_items WHERE user_id=? AND product_id=? AND (variant_id IS ? OR variant_id=? )'
      // use both params to handle null vs value
      existsParams = [user_id, product_id, variant_id, variant_id]
    } else {
      existsQuery = 'SELECT id, quantity FROM cart_items WHERE user_id=? AND product_id=?'
      existsParams = [user_id, product_id]
    }
    const exists = await db.execute(existsQuery, existsParams)
    if (exists.rows.length > 0) {
      // Update quantity
      const newQty = (quantity ? Number(quantity) : 1) + Number(exists.rows[0].quantity)
      await db.execute('UPDATE cart_items SET quantity=? WHERE id=?', [newQty, exists.rows[0].id])
      return res.status(200).json({ updated: true })
    }
    if (cartHasVariant) {
      await db.execute('INSERT INTO cart_items (user_id, product_id, variant_id, quantity) VALUES (?, ?, ?, ?)', [user_id, product_id, variant_id, quantity || 1])
    } else {
      await db.execute('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity || 1])
    }
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
