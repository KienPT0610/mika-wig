import { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'

export default function Account() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', phone: '', avatar: '' })
  const [msg, setMsg] = useState(null)
  const [msgType, setMsgType] = useState('')
  const fileRef = useRef()

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (raw) {
      try {
        const u = JSON.parse(raw)
        setUser(u)
        setForm({
          name: u.name || '',
          email: u.email || '',
          password: '',
          address: u.address || '',
          phone: u.phone || '',
          avatar: u.avatar || ''
        })
      } catch (e) { }
    }
  }, [])

  async function submit(e) {
    e.preventDefault()
    const payload = { id: user?.id, email: form.email, name: form.name, address: form.address, phone: form.phone, avatar: form.avatar }
    if (form.password) payload.password = form.password
    const res = await fetch('/api/auth/update', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
    const j = await res.json()
    if (!res.ok) {
      setMsg(j.error || 'Lỗi')
      setMsgType('error')
    } else {
      setMsgType('success')
      setMsg('Cập nhật thành công')
      localStorage.setItem('user', JSON.stringify({ id: j.id, email: j.email, name: j.name, address: j.address, phone: j.phone, avatar: j.avatar }))
    }
  }

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = function (ev) {
      setForm(prev => ({ ...prev, avatar: ev.target.result }))
    }
    reader.readAsDataURL(f)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mika-pink to-white">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Thông tin tài khoản</h1>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-2xl p-6">
          {/* Cột trái */}
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-start">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden border">
                  {form.avatar ? (
                    <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl text-gray-500">
                      {(user && user.name) ? user.name.split(' ').map(s => s[0]).slice(-2).join('') : 'U'}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="absolute -right-1 -top-1 bg-white border rounded-full p-1 shadow text-sm"
                >
                  Chọn
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>
              <div className="ml-4 flex-1">
                <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
                <p className="text-sm text-gray-500">Bấm nút ở góc để chọn ảnh mới</p>
              </div>
            </div>

            {/* Họ tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="w-full border px-3 py-2 rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <input className="w-full border px-3 py-2 rounded" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input className="w-full border px-3 py-2 rounded" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="Để trống nếu không đổi"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="pt-2">
              <button className="btn-primary w-full">Lưu thay đổi</button>
            </div>
          </div>
        </form>

        {msg && <div className="mt-4 text-center text-sm text-gray-700">{msg}</div>}
      </main>

      {msg && <Alert type={msgType} content={msg} />}
      <Footer />
    </div>
  )
}
