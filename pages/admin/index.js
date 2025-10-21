import { useEffect } from 'react'
import { useRouter } from 'next/router'

const nav = [
  { label: 'Quản lý sản phẩm', href: '/admin/products' },
  { label: 'Quản lý khách hàng', href: '/admin/customers' },
  { label: 'Thống kê hành động', href: '/admin/stats' },
]

export default function AdminDashboard() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin')) {
      router.replace('/admin/login')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-mika-pink text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button className="bg-white text-mika-pink px-4 py-2 rounded" onClick={() => { localStorage.removeItem('admin'); router.replace('/admin/login') }}>Đăng xuất</button>
      </header>
      <main className="max-w-4xl mx-auto py-12 px-4">
        <nav className="flex gap-6 mb-8">
          {nav.map(item => (
            <a key={item.href} href={item.href} className="px-4 py-2 bg-white rounded shadow hover:bg-pink-50 text-mika-pink font-semibold">{item.label}</a>
          ))}
        </nav>
        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-playfair mb-4">Chào mừng đến trang quản trị Mika.wig</h2>
          <p className="text-gray-700">Chọn chức năng bên trên để quản lý sản phẩm, khách hàng hoặc xem thống kê hành động.</p>
        </section>
      </main>
    </div>
  )
}
