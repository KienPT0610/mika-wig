import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductGrid from '../../components/ProductGrid'
import { useRouter } from 'next/router'

export default function Products() {
  const router = useRouter()
  const { search } = router.query

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-6">Sản phẩm</h1>
        <ProductGrid searchQuery={typeof search === 'string' ? search : ''} />
      </main>
      <Footer />
    </div>
  )
}
