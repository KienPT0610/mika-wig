import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'

export default function AdminStats() {
  const [stats, setStats] = useState(null)
  const router = typeof window !== 'undefined' ? require('next/router').useRouter() : null
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin')) {
      router.replace('/admin/login')
      return
    }
    fetch('/api/logs')
      .then(r => r.json())
      .then(setStats)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold text-mika-blue mb-10 text-center">Mika Admin</h1>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Tổng quan</a>
          <a href="/admin/products" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Quản lý sản phẩm</a>
          <a href="/admin/customers" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Quản lý khách hàng</a>
          <a href="/admin/stats" className="px-4 py-2 rounded-lg bg-mika-blue/10 text-mika-blue font-semibold">Thống kê hành động</a>
        </nav>
        <div className="mt-auto pt-10">
          <button className="w-full bg-mika-blue text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-400 transition" onClick={() => { localStorage.removeItem('admin'); router.replace('/admin/login') }}>Đăng xuất</button>
        </div>
      </aside>
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Thống kê hệ thống</h2>
        {!stats ? (
          <div className="text-center text-gray-400">Đang tải...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Lượt truy cập mỗi ngày</h2>
              <table className="min-w-full border">
                <thead><tr><th className="px-2 py-1">Ngày</th><th className="px-2 py-1">Người dùng</th><th className="px-2 py-1">Lượt truy cập</th></tr></thead>
                <tbody>
                  {stats.visits.map(row => (
                    <tr key={row.day}>
                      <td className="px-2 py-1">{row.day}</td>
                      <td className="px-2 py-1">{row.users}</td>
                      <td className="px-2 py-1">{row.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Sản phẩm được xem nhiều nhất</h2>
              <table className="min-w-full border">
                <thead><tr><th className="px-2 py-1">ID sản phẩm</th><th className="px-2 py-1">Lượt xem</th><th className="px-2 py-1">Lượt mua</th></tr></thead>
                <tbody>
                  {stats.topProducts.map(row => (
                    <tr key={row.product_id}>
                      <td className="px-2 py-1">{row.product_id}</td>
                      <td className="px-2 py-1">{row.views}</td>
                      <td className="px-2 py-1">{row.buys}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Người dùng hoạt động gần đây</h2>
              <table className="min-w-full border">
                <thead><tr><th className="px-2 py-1">ID</th><th className="px-2 py-1">Email</th><th className="px-2 py-1">Hoạt động gần nhất</th></tr></thead>
                <tbody>
                  {stats.recentUsers.map(row => (
                    <tr key={row.id}>
                      <td className="px-2 py-1">{row.id}</td>
                      <td className="px-2 py-1">{row.email}</td>
                      <td className="px-2 py-1">{row.last_active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Thống kê giỏ hàng / mua hàng</h2>
              <table className="min-w-full border">
                <thead><tr><th className="px-2 py-1">Hành động</th><th className="px-2 py-1">Tổng số lượt</th></tr></thead>
                <tbody>
                  {stats.cartStats.map(row => (
                    <tr key={row.action}>
                      <td className="px-2 py-1">{row.action}</td>
                      <td className="px-2 py-1">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
