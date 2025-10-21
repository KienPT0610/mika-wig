import ProductCard from './ProductCard'

export default function ProductGrid(){
  // sample items
  const items = new Array(9).fill(0).map((_,i)=> ({ id: i+1, title: `Mika Wig ${i+1}` }))

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
        {items.map(it => (
          <ProductCard key={it.id} title={it.title} />
        ))}
      </div>
    </div>
  )
}
