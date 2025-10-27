import Link from 'next/link'
import contacts from '../data/contacts';

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
          <h4 className="font-semibold mb-2">Thông tin liên hệ Mika.wig - Tóc giả Mai</h4>
          <div className="text-gray-700 text-sm">
            Nếu bạn quan tâm hoặc muốn đặt hàng, đừng ngần ngại liên hệ với chúng tôi qua các kênh sau:
            <ul className="mt-2">
              {contacts.map((contact) => (
                <li key={contact.name} className="flex items-center space-x-2 space-y-2">
                  <contact.icon className="text-xl" />
                  <a href={contact.url} className="hover:underline">{contact.name}: {contact.display}</a>
                </li>
              ))}
            </ul>
            <div className="mt-2">Mika.wig – Tóc giả Mai luôn sẵn sàng lắng nghe, tư vấn và đồng hành cùng bạn trong hành trình tìm kiếm mái tóc phù hợp và tự tin nhất</div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-sm text-gray-500">© {new Date().getFullYear()} Mika.wig. Bản quyền thuộc về Mika.wig</div>
    </footer>
  )
}
