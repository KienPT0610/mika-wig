import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'
import { useAlert } from '../context/AlertContext'
import { AlertType, MESSAGE } from '../constanst'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const router = useRouter()
  const { showAlert } = useAlert()

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) })
    const j = await res.json()
    if (!res.ok) {
      showAlert(AlertType.ERROR, j.error || MESSAGE.LOGIN_FAILED)
    } else {
      showAlert(AlertType.SUCCESS, MESSAGE.LOGIN_SUCCESS)
    }
    if (res.ok) {
      // set simple demo session marker
      localStorage.setItem('user', JSON.stringify({ email: j.email, id: j.id, name: j.name, address: j.address, phone: j.phone, avatar: j.avatar }))
      router.replace('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mika-pink to-white">
      {/* <Header /> */}
      <main className="flex-grow max-w-md mx-auto px-6 py-12">
        <h1 className="text-2xl mb-4">Đăng nhập</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Mật khẩu" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <button className="btn-primary">Đăng nhập</button>
        </form>
        <div className="mt-4 text-sm">
          Chưa có tài khoản? <a href="/register" className="text-pink-500">Đăng kí</a>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
