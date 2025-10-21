import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminProducts() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', category_id: '', description: '', price: '', stock: '', image_urls: [] })
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin')) {
      router.replace('/admin/login')
    }
    fetchProducts()
    fetch('/api/admin/categories').then(r=>r.json()).then(j=>setCategories(j.categories || []))
  }, [])

  async function fetchProducts() {
    const res = await fetch('/api/admin/products')
    const j = await res.json()
    setProducts(j.products || [])
  }

  function startEdit(p) {
    setEditing(p.id)
    setForm({
      name: p.name,
      category_id: p.category_id,
      description: p.description,
      price: p.price,
      stock: p.stock,
      image_urls: p.image_urls || []
    })
  }

  function startAdd() {
    setEditing('new')
    setForm({ name: '', category_id: categories[0]?.id || '', description: '', price: '', stock: '', image_urls: [] })
  }

  async function saveProduct(e) {
    e.preventDefault()
    setMsg('')
    const method = editing === 'new' ? 'POST' : 'PUT'
    const payload = { ...form }
    if (editing !== 'new') payload.id = editing
    const res = await fetch('/api/admin/products', {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setEditing(null)
      setForm({ name: '', category_id: '', description: '', price: '', stock: '', image_urls: [] })
      fetchProducts()
    } else {
      const j = await res.json()
      setMsg(j.error || 'Lỗi lưu sản phẩm')
    }
  }

  async function deleteProduct(id) {
    if (!window.confirm('Xóa sản phẩm này?')) return
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchProducts()
  }

  function handleImageFiles(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    let count = 0
    const newImages = []
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = function(ev) {
        newImages.push(ev.target.result)
        count++
        if (count === files.length) {
          setForm(f => ({ ...f, image_urls: [...f.image_urls, ...newImages] }))
        }
      }
      reader.readAsDataURL(file)
    })
  }
  function removeImage(idx) {
    setForm(f => ({ ...f, image_urls: f.image_urls.filter((_, i) => i !== idx) }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold text-mika-blue mb-10 text-center">Mika Admin</h1>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Tổng quan</a>
          <a href="/admin/products" className="px-4 py-2 rounded-lg bg-mika-blue/10 text-mika-blue font-semibold">Quản lý sản phẩm</a>
          <a href="/admin/customers" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Quản lý khách hàng</a>
          <a href="/admin/stats" className="px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition">Thống kê hành động</a>
        </nav>
        <div className="mt-auto pt-10">
          <button className="w-full bg-mika-blue text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-400 transition" onClick={() => { localStorage.removeItem('admin'); router.replace('/admin/login') }}>Đăng xuất</button>
        </div>
      </aside>
      <main className="flex-1 py-12 px-8">
  <h2 className="text-2xl font-playfair mb-6">Quản lý sản phẩm</h2>
  <button className="mb-6 bg-mika-blue text-white px-4 py-2 rounded" onClick={startAdd}>Thêm sản phẩm mới</button>
        {/* Product list */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-mika-blue/10">
                <th className="px-4 py-2 text-left">Tên</th>
                <th className="px-4 py-2 text-left">Giá</th>
                <th className="px-4 py-2 text-left">Kho</th>
                <th className="px-4 py-2 text-left">Ảnh</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-gray-400">Không có sản phẩm</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2 font-semibold">{p.name}</td>
                    <td className="px-4 py-2">{p.price}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        {p.image_urls && p.image_urls.map((img, i) => (
                          <img key={i} src={img} alt="img" className="w-12 h-12 object-cover rounded" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={() => startEdit(p)}>Sửa</button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => deleteProduct(p.id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Add/Edit modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <form className="bg-white rounded-lg shadow p-6 max-w-xl w-full relative" onSubmit={saveProduct}>
              <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={()=>setEditing(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-4">{editing === 'new' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}</h3>
              <div className="mb-3">
                <label className="block mb-1">Tên sản phẩm</label>
                <input className="w-full border px-3 py-2 rounded" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} required />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Danh mục</label>
                <select className="w-full border px-3 py-2 rounded" value={form.category_id} onChange={e=>setForm(f=>({...f, category_id: e.target.value}))} required>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1">Mô tả</label>
                <textarea className="w-full border px-3 py-2 rounded" value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))} />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Giá</label>
                <input type="number" className="w-full border px-3 py-2 rounded" value={form.price} onChange={e=>setForm(f=>({...f, price: e.target.value}))} required />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Kho</label>
                <input type="number" className="w-full border px-3 py-2 rounded" value={form.stock} onChange={e=>setForm(f=>({...f, stock: e.target.value}))} />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Ảnh sản phẩm (chọn nhiều ảnh từ máy tính)</label>
                <input type="file" accept="image/*" multiple onChange={handleImageFiles} className="mb-2" />
                <div className="flex gap-2 flex-wrap">
                  {form.image_urls.map((url, idx) => (
                    <div key={idx} className="relative inline-block">
                      <img src={url} alt="img" className="w-16 h-16 object-cover rounded border" />
                      <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" onClick={()=>removeImage(idx)}>&times;</button>
                    </div>
                  ))}
                </div>
              </div>
              {msg && <div className="text-red-500 mb-2">{msg}</div>}
              <div className="flex gap-4 mt-4">
                <button type="submit" className="bg-mika-blue text-white px-4 py-2 rounded">Lưu</button>
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={()=>setEditing(null)}>Hủy</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
