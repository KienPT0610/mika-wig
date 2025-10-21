import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

export default function Header(){
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef()

  useEffect(()=>{
    const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (raw) try { setUser(JSON.parse(raw)) } catch(e){}
    function onStorage(e){ if (e.key === 'user') { try{ setUser(JSON.parse(e.newValue)) }catch(e){ setUser(null) } } }
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(()=>{
    function handler(e){ if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    window.addEventListener('click', handler)
    return ()=> window.removeEventListener('click', handler)
  }, [])

  function logout(){
    localStorage.removeItem('user')
    router.replace('/')
    setUser(null)
  }

  // Avatar upload is handled from the Account page; header only shows avatar and menu.

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-playfair">Mika.wig</Link>
          <nav className="hidden md:flex gap-4 text-gray-700">
            <Link href="/">Trang chủ</Link>
            <Link href="/about">Giới thiệu</Link>
            <Link href="/products">Sản phẩm</Link>
            <Link href="/process">Quy trình</Link>
            <Link href="#">Feedback</Link>
            <Link href="/guide">Hướng dẫn</Link>
            <Link href="/contact">Liên hệ</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-primary">Đặt hàng ngay</button>
          {user ? (
            <div className="relative" ref={ref}>
              <button onClick={()=>setOpen(!open)} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  // show avatar image
                  <img src={user.avatar} alt="avatar" className="w-10 h-10 object-cover" />
                ) : (
                  <span className="font-bold">{user.email ? user.email[0].toUpperCase() : 'U'}</span>
                )}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2">
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-50">Thông tin tài khoản</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-50">Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-gray-700">Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  )
}
