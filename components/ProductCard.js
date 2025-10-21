import Link from 'next/link'
import Image from 'next/image'
import cardImg from '../assets/images/image.png'


function formatCurrency(n) {
  if (isNaN(n)) return '';
  return Number(n).toLocaleString('vi-VN') + ' VND';
}

export default function ProductCard({ title = 'Mika Wig', image, id, price }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-48 bg-white flex items-center justify-center relative">
        {image ? (
          <img src={image} alt={title} className="object-contain w-full h-full" />
        ) : (
          <Image src={cardImg} alt={title} fill className="object-contain" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-lg mb-2">{title}</h3>
        {price !== undefined && (
          <div className="text-mika-blue font-bold mb-2">{formatCurrency(price)}</div>
        )}
        <p className="text-gray-600 mb-4">Chất liệu cao cấp · Tự nhiên</p>
        <Link href={id ? `/products/${id}` : "/products/mika-wig"} className="text-mika-deep">Xem chi tiết</Link>
      </div>
    </div>
  )
}
