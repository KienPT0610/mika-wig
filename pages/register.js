import { useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'
import { useAlert } from '../context/AlertContext'
import { AlertType, MESSAGE } from '../constanst'

export default function Register(){
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const router = useRouter()
  const fileRef = useRef()
  const { showAlert } = useAlert()

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) })
    const j = await res.json()
    if (!res.ok) {
      showAlert(AlertType.ERROR, j.error || MESSAGE.REGISTER_FAILED)
    } else {
      showAlert(AlertType.SUCCESS, MESSAGE.REGISTER_SUCCESS)
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mika-pink to-white">
      {/* <Header /> */}
      <main className="flex-grow max-w-md mx-auto px-6 py-12 ">
        <h1 className="text-2xl mb-4">Đăng kí</h1>
        <form onSubmit={submit} className="space-y-4">
          <div className="mb-4 flex items-start">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden border">
                {form.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl text-gray-500">{(form.name) ? form.name.split(' ').map(s=>s[0]).slice(-2).join('') : 'U'}</div>
                )}
              </div>
              <button type="button" onClick={()=>fileRef.current && fileRef.current.click()} className="absolute -right-1 -top-1 bg-white border rounded-full p-1 shadow text-sm">Chọn</button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e)=>{
                const f = e.target.files && e.target.files[0]
                if (!f) return
                const reader = new FileReader()
                reader.onload = function(ev){ setForm(prev=>({...prev, avatar: ev.target.result})) }
                reader.readAsDataURL(f)
              }} />
            </div>
            <div className="ml-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">Avatar</label>
              <p className="text-sm text-gray-500">Bấm nút ở góc để chọn ảnh</p>
            </div>
          </div>
          <input className="w-full border px-3 py-2 rounded" placeholder="Tên" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Địa chỉ" value={form.address || ''} onChange={e=>setForm({...form, address: e.target.value})} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Số điện thoại" value={form.phone || ''} onChange={e=>setForm({...form, phone: e.target.value})} />
          <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Mật khẩu" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <button className="btn-primary">Đăng kí</button>
        </form>
        <div className="mt-4 text-sm">
          Đã có tài khoản? <a href="/login" className="text-pink-500">Đăng nhập</a>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
