import { getDb } from '../../lib/db'

export default async function handler(req, res) {
  const db = await getDb()
  if (req.method === 'POST') {
    // Log user action
    const { user_id, action, details, ip_address, user_agent } = req.body
    await db.execute('INSERT INTO user_logs (user_id, action, details, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)', [user_id || null, action, details || '', ip_address || '', user_agent || ''])
    res.status(201).json({ logged: true })
  } else if (req.method === 'GET') {
    // Stats for admin dashboard
    const [visits, topProductsRaw, recentUsers, cartStats] = await Promise.all([
      // 1. Bao nhiêu người truy cập mỗi ngày
      db.execute(`SELECT DATE(created_at) as day, COUNT(DISTINCT user_id) as users, COUNT(*) as visits FROM user_logs WHERE action='visit' GROUP BY day ORDER BY day DESC LIMIT 14`),
      // 2. Sản phẩm nào được xem nhiều nhất
      db.execute(`SELECT details as product_id, COUNT(*) as views FROM user_logs WHERE action='view_product' GROUP BY product_id ORDER BY views DESC LIMIT 5`),
      // 3. Người dùng hoạt động gần đây
      db.execute(`SELECT u.id, u.email, MAX(l.created_at) as last_active FROM users u JOIN user_logs l ON u.id=l.user_id GROUP BY u.id ORDER BY last_active DESC LIMIT 10`),
      // 4. Tổng số lượt thêm giỏ / mua hàng
      db.execute(`SELECT action, COUNT(*) as total FROM user_logs WHERE action IN ('add_to_cart','checkout') GROUP BY action`)
    ])
    // Lấy lượt mua cho từng sản phẩm top
    const topProducts = await Promise.all(topProductsRaw.rows.map(async row => {
      const buyRes = await db.execute(`SELECT COUNT(*) as buys FROM user_logs WHERE action='checkout' AND details LIKE ?`, [`%"product_id":${row.product_id}%`])
      return { ...row, buys: buyRes.rows[0].buys }
    }))
    res.status(200).json({
      visits: visits.rows,
      topProducts,
      recentUsers: recentUsers.rows,
      cartStats: cartStats.rows
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
