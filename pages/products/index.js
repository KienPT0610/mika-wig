import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-6">Sản phẩm</h1>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}
