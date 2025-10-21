import ProductCard from './ProductCard'

import { useEffect, useState } from 'react'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(j => setProducts(j.products || []))
  }, [])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="space-x-2">
          <select className="border px-3 py-2 rounded">
            <option>Loại: Tất cả</option>
            <option>Chất liệu: Tóc thật</option>
            <option>Chất liệu: Tóc tổng hợp</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-3 text-center text-gray-400">Không có sản phẩm</div>
        ) : (
          products.map(p => (
            <ProductCard key={p.id} title={p.name} image={p.image_urls?.[0]} id={p.id} price={p.price} />
          ))
        )}
      </div>
    </div>
  )
}
