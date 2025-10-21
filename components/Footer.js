import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="text-2xl font-playfair">Mika.wig</div>
          <div className="text-sm text-gray-600 mt-2">Tóc giả cao cấp thủ công</div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Menu</h4>
          <div className="text-gray-700 space-y-1">
            <Link href="/">Trang chủ</Link><br />
            <Link href="/products">Sản phẩm</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Liên hệ</h4>
          <div className="text-gray-700">Zalo / WhatsApp / TikTok / Facebook</div>
        </div>
      </div>
      <div className="text-center py-4 text-sm text-gray-500">© {new Date().getFullYear()} Mika.wig. Bản quyền thuộc về Mika.wig</div>
    </footer>
  )
}
