import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const nav = [
  { label: 'Tổng quan', href: '/admin' },
  { label: 'Quản lý sản phẩm', href: '/admin/products' },
  { label: 'Quản lý khách hàng', href: '/admin/customers' },
  { label: 'Thống kê hành động', href: '/admin/stats' },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin')) {
      router.replace('/admin/login')
    }
    // Fetch users from API
    fetch('/api/admin/users').then(r=>r.json()).then(j=>setUsers(j.users || []))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold text-mika-blue mb-10 text-center">Mika Admin</h1>
        <nav className="flex flex-col gap-4">
          {nav.map(item => (
            <a key={item.href} href={item.href} className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">{item.label}</a>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <button className="w-full bg-mika-blue text-white py-2 rounded-lg font-semibold shadow hover:bg-mika-blue transition" onClick={() => { localStorage.removeItem('admin'); router.replace('/admin/login') }}>Đăng xuất</button>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 py-12 px-8">
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-playfair mb-4">Chào mừng đến trang quản trị Mika.wig</h2>
          <p className="text-gray-700">Chọn chức năng bên trái để quản lý sản phẩm, khách hàng hoặc xem thống kê hành động.</p>
        </section>
        {/* Customer stats */}
        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold mb-4 text-mika-blue">Thống kê khách hàng</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-mika-blue/10">
                  <th className="px-4 py-2 text-left">Tên</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Số điện thoại</th>
                  <th className="px-4 py-2 text-left">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-4 text-gray-400">Không có dữ liệu</td></tr>
                ) : (
                  users.map(u => (
                    <tr key={u.id} className="border-t">
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.phone}</td>
                      <td className="px-4 py-2">{u.address}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
