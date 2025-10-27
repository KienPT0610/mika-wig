import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import stories from '../../data/stories'

export default function StoriesIndex(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-playfair mb-6">Câu chuyện khách hàng</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map(s => (
            <Link key={s.slug} href={`/stories/${s.slug}`} className="block bg-white border rounded-lg overflow-hidden hover:shadow">
              <div className="h-48 relative">
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-playfair text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{s.paragraphs[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
