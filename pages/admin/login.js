import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState(null)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    // Demo: hardcoded admin login
    if (form.email === 'admin@mika.com' && form.password === 'admin123') {
      localStorage.setItem('admin', '1')
      router.replace('/admin')
    } else {
      setMsg('Sai tài khoản hoặc mật khẩu')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-mika-pink/30">
      <main className="w-full max-w-sm px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-mika-deep mb-6 text-center">Đăng nhập Admin</h1>
          <form onSubmit={submit} className="space-y-5">
            <input className="w-full border border-mika-pink/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mika-pink/40 transition" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
            <input type="password" className="w-full border border-mika-pink/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mika-pink/40 transition" placeholder="Mật khẩu" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
            <button className="w-full bg-mika-pink text-white py-3 rounded-lg font-semibold shadow hover:bg-pink-400 transition">Đăng nhập</button>
          </form>
          {msg && <div className="mt-4 text-center text-red-500 text-sm">{msg}</div>}
        </div>
      </main>
    </div>
  )
}
