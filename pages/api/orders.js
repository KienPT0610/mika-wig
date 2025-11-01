import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()

  try {
    if (req.method === 'POST') {
      // Create new order
      const {
        user_id,
        name,
        email,
        phone,
        address,
        city,
        postal_code,
        currency = 'VND',
        total,
        items
      } = req.body || {}

      if (!name || !email || !phone || !address) {
        return res.status(400).json({ error: 'Missing customer information (name,email,phone,address)'} )
      }
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must contain at least one item' })
      }

      // insert order
      const orderInsert = await db.execute(
        'INSERT INTO orders (user_id, status, total, currency, name, email, phone, address, city, postal_code, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [user_id || null, 'pending', total || 0, currency, name, email, phone, address, city || '', postal_code || '']
      )

      const orderId = Number(orderInsert.lastInsertRowid)

      // insert items
      for (const it of items) {
        const { product_id, variant_id = null, name: itemName, quantity = 1, unit_price = 0 } = it
        const total_price = (Number(unit_price) || 0) * (Number(quantity) || 1)
        await db.execute(
          'INSERT INTO order_items (order_id, product_id, variant_id, name, quantity, unit_price, total_price, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
          [orderId, product_id || null, variant_id || null, itemName || '', quantity, unit_price, total_price]
        )
      }

      return res.status(201).json({ ok: true, id: orderId })
    }

    if (req.method === 'GET') {
      const { id } = req.query
      if (id) {
        // return order details
        const orderRes = await db.execute('SELECT * FROM orders WHERE id=?', [id])
        const order = orderRes.rows[0]
        if (!order) return res.status(404).json({ error: 'Order not found' })
        const itemsRes = await db.execute('SELECT * FROM order_items WHERE order_id=?', [id])
        return res.status(200).json({ order, items: itemsRes.rows })
      }

      // list orders (admin)
      const listRes = await db.execute('SELECT id, user_id, status, total, currency, name, email, phone, created_at FROM orders ORDER BY created_at DESC')
      return res.status(200).json({ orders: listRes.rows })
    }

    if (req.method === 'PUT') {
      // update order status
      const { id, status } = req.body || {}
      if (!id) return res.status(400).json({ error: 'id required' })
      await db.execute('UPDATE orders SET status=? WHERE id=?', [status || 'pending', id])
      return res.status(200).json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('orders api error', err)
    res.status(500).json({ error: String(err) })
  }
}
