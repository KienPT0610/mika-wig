import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Feedback from '../components/Feedback'
import ModalOrder from '../components/ModalOrder'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl mb-6">Giới thiệu ngắn</h2>
          <p className="text-lg text-gray-600">Mika.wig chuyên cung cấp tóc giả cao cấp, thủ công bởi nghệ nhân Mai — phong cách tự nhiên, thoải mái và bền đẹp.</p>
        </section>
        <Featured />
        <Feedback />
      </main>
      <Footer />
      <ModalOrder />
    </div>
  )
}
