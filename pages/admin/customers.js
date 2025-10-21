import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'

export default function AdminCustomers() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ email: '', role: 'user' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin')) {
      router.replace('/admin/login')
      return
    }
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(j => setUsers(j.users || []))
  }, [])

  function startEdit(u) {
    setEditing(u.id)
    setForm({ email: u.email, role: u.role })
  }

  async function saveUser(e) {
    e.preventDefault()
    setMsg('')
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: editing, role: form.role })
    })
    if (res.ok) {
      setEditing(null)
      setMsg('Đã cập nhật quyền!')
      fetch('/api/admin/users')
        .then(r => r.json())
        .then(j => setUsers(j.users || []))
    } else {
      setMsg('Lỗi cập nhật quyền')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold text-mika-blue mb-10 text-center">Mika Admin</h1>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Tổng quan</a>
          <a href="/admin/products" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Quản lý sản phẩm</a>
          <a href="/admin/customers" className="px-4 py-2 rounded-lg bg-mika-blue/10 text-mika-blue font-semibold">Quản lý khách hàng</a>
          <a href="/admin/stats" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Thống kê hành động</a>
        </nav>
        <div className="mt-auto pt-10">
          <button className="w-full bg-mika-blue text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-400 transition" onClick={() => { localStorage.removeItem('admin'); router.replace('/admin/login') }}>Đăng xuất</button>
        </div>
      </aside>
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Quản lý khách hàng</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-mika-blue/10">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Quyền</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-4 text-gray-400">Không có khách hàng</td></tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">
                      <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={() => startEdit(u)}>Sửa quyền</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Edit modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <form className="bg-white rounded-lg shadow p-6 max-w-sm w-full relative" onSubmit={saveUser}>
              <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={()=>setEditing(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4">Sửa quyền người dùng</h3>
              <div className="mb-3">
                <label className="block mb-1">Email</label>
                <input className="w-full border px-3 py-2 rounded" value={form.email} disabled />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Quyền</label>
                <select className="w-full border px-3 py-2 rounded" value={form.role} onChange={e=>setForm(f=>({...f, role: e.target.value}))}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="mb-3 text-red-500 text-sm">{msg}</div>
              <button className="w-full bg-mika-blue text-white py-2 rounded font-bold">Lưu</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
