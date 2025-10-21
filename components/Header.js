import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import useCartCount from '../hooks/useCartCount';
import logoImg from '../assets/images/logo.png'
import Image from 'next/image';

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

  const cartCount = useCartCount(user?.id) 
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-playfair">
            <Image src={logoImg} alt="Mika.wig" width={60} height={40} />
          </Link>
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
          {/* Search (desktop) */}
          <form onSubmit={(e)=>{e.preventDefault(); const q = e.target.search.value.trim(); if(q) router.push(`/products?search=${encodeURIComponent(q)}`); else router.push('/products')}} className="hidden md:block">
            <input name="search" type="text" placeholder="Tìm sản phẩm..." className="border rounded px-3 py-2 w-64" />
          </form>
          <button onClick={() => router.push('/cart')}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </button>
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
          {/* mobile menu button */}
          <button className="md:hidden mr-2" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        </div>
        {/* mobile dropdown nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-2">
              <form onSubmit={(e)=>{e.preventDefault(); const q = e.target.msearch.value.trim(); if(q) router.push(`/products?search=${encodeURIComponent(q)}`); else router.push('/products')}} className="mb-2">
                <input name="msearch" placeholder="Tìm sản phẩm..." className="w-full border rounded px-3 py-2" />
              </form>
              <Link href="/" className="py-2">Trang chủ</Link>
              <Link href="/about" className="py-2">Giới thiệu</Link>
              <Link href="/products" className="py-2">Sản phẩm</Link>
              <Link href="/process" className="py-2">Quy trình</Link>
              <Link href="#" className="py-2">Feedback</Link>
              <Link href="/guide" className="py-2">Hướng dẫn</Link>
              <Link href="/contact" className="py-2">Liên hệ</Link>
            </div>
          </div>
        )}
      </header>
      {/* spacer to offset fixed header height */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
