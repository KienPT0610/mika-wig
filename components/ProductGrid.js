import ProductCard from './ProductCard'

import { useEffect, useState } from 'react'

export default function ProductGrid({ searchQuery = '' }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(j => setProducts(j.products || []))

    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(j => setCategories(j.categories || []))
  }, [])

  const byCategory = selectedCategory === 'all' ? products : products.filter(p => String(p.category_id) === String(selectedCategory))
  const q = (searchQuery || '').trim().toLowerCase()
  const visible = q ? byCategory.filter(p => (p.name || '').toLowerCase().includes(q)) : byCategory

  return (
    <div>
      <div className="mb-4 flex items-center justify-start">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              className="border px-3 py-2 rounded pr-8 w-56 min-w-[160px] appearance-none"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="all">Loại: Tất cả</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {visible.length === 0 ? (
          <div className="col-span-3 text-center text-gray-400">Không có sản phẩm</div>
        ) : (
          visible.map(p => (
            <ProductCard key={p.id} title={p.name} image={p.image_urls?.[0]} id={p.id} price={p.price} />
          ))
        )}
      </div>
    </div>
  )
}