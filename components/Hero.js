import Link from 'next/link'
import Image from 'next/image'
import heroImg from '../assets/images/image.png'

export default function Hero(){
  return (
    <section className="bg-gradient-to-b from-mika-pink to-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-playfair mb-4">Mika.wig — Tóc giả cao cấp</h1>
          <p className="text-lg text-gray-700 mb-6">Tạo phong cách tự nhiên, nâng tầm sự tự tin với tóc giả thủ công bởi nghệ nhân Mai.</p>
          <Link href="/products" className="inline-block btn-primary px-6 py-3">Xem sản phẩm</Link>
        </div>
        <div className="h-72 bg-white rounded-lg shadow flex items-center justify-center overflow-hidden">
          <Image src={heroImg} alt="Tóc giả" width={520} height={320} className="object-cover" />
        </div>
      </div>
    </section>
  )
}
