import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()
  if (req.method === 'GET') {
    // List products or get by id
    const { id } = req.query
    let products
    if (id) {
      products = await db.execute(`SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id=?`, [id])
    } else {
      products = await db.execute(`SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC`)
    }
    // Parse image_urls JSON
    const rows = products.rows.map(p => ({ ...p, image_urls: p.image_urls ? JSON.parse(p.image_urls) : [] }))
    res.status(200).json({ products: rows })
  } else if (req.method === 'POST') {
    // Add product
  const { category_id, name, description, price, stock, image_urls } = req.body
  if (!category_id || !name || !price) return res.status(400).json({ error: 'Thiếu thông tin sản phẩm' })
  const result = await db.execute('INSERT INTO products (category_id, name, description, price, stock, image_urls) VALUES (?, ?, ?, ?, ?, ?)', [category_id, name, description || '', price, stock || 0, JSON.stringify(image_urls || [])])
  const productId = Number(result.lastInsertRowid)
  res.status(201).json({ id: productId })
  } else if (req.method === 'PUT') {
    // Edit product
  const { id, category_id, name, description, price, stock, image_urls } = req.body
  if (!id) return res.status(400).json({ error: 'Thiếu id sản phẩm' })
  await db.execute('UPDATE products SET category_id=?, name=?, description=?, price=?, stock=?, image_urls=? WHERE id=?', [category_id, name, description, price, stock, JSON.stringify(image_urls || []), id])
  res.status(200).json({ id })
  } else if (req.method === 'DELETE') {
    // Delete product
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Thiếu id sản phẩm' })
    // Xóa các bản ghi liên quan trước
    await db.execute('DELETE FROM cart_items WHERE product_id=?', [id])
    await db.execute('DELETE FROM user_logs WHERE details=? AND action="view_product"', [String(id)])
    // Có thể cần xóa thêm các bảng khác nếu có liên kết FK tới products.id
    await db.execute('DELETE FROM products WHERE id=?', [id])
    res.status(200).json({ id })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
