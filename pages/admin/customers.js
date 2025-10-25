import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import AdminSideBar from '../../components/AdminSideBar'

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
      <AdminSideBar active="/admin/customers" />
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Quản lý người dùng</h2>
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
