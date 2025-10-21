import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import artImg from '../assets/images/image.png'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="h-72 bg-gray-100 rounded-lg overflow-hidden">
            <Image src={artImg} alt="Nghệ nhân" width={480} height={320} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-playfair mb-4">Về Mika.wig</h1>
            <p className="text-gray-700 mb-4">Nghệ nhân Mai với hơn 10 năm kinh nghiệm tạo ra tóc giả tự nhiên và tinh tế.</p>
            <blockquote className="border-l-4 pl-4 italic text-gray-600">"Sự tự tin bắt nguồn từ mái tóc bạn yêu thích."</blockquote>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
