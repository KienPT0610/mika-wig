import ProductCard from './ProductCard'

const categories = ['Tóc thật 100%', 'Tóc tổng hợp cao cấp', 'Tóc ngắn & bob']

export default function Featured(){
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl mb-6">Danh mục nổi bật</h2>
        <div className="flex gap-4 mb-8">
          {categories.map((c)=> (
            <div key={c} className="px-4 py-2 border rounded">{c}</div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  )
}
