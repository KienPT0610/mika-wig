import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState(null)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setMsg(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form)
    })
    const j = await res.json()
    if (!res.ok) {
      setMsg(j.error || 'Sai tài khoản hoặc mật khẩu')
      return
    }
    if (j.role !== 'admin') {
      setMsg('Tài khoản không phải admin')
      return
    }
    localStorage.setItem('admin', '1')
    localStorage.setItem('user', JSON.stringify(j))
    router.replace('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-mika-blue/30">
      <main className="w-full max-w-sm px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-mika-blue mb-6 text-center">Đăng nhập Admin</h1>
          <form onSubmit={submit} className="space-y-5">
            <input className="w-full border border-mika-blue/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mika-blue/40 transition" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
            <input type="password" className="w-full border border-mika-blue/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mika-blue/40 transition" placeholder="Mật khẩu" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
            <button className="w-full bg-mika-blue text-white py-3 rounded-lg font-semibold shadow hover:bg-mika-blue transition">Đăng nhập</button>
          </form>
          {msg && <div className="mt-4 text-center text-red-500 text-sm">{msg}</div>}
        </div>
      </main>
    </div>
  )
}
