import Link from 'next/link'
import Image from 'next/image'
import cardImg from '../assets/images/image.png'

export default function ProductCard({ title = 'Mika Wig', image, id }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-100 relative">
        {image ? (
          <img src={image} alt={title} className="object-cover w-full h-full" />
        ) : (
          <Image src={cardImg} alt={title} fill className="object-cover" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-lg mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">Chất liệu cao cấp · Tự nhiên</p>
        <Link href={id ? `/products/${id}` : "/products/mika-wig"} className="text-mika-deep">Xem chi tiết</Link>
      </div>
    </div>
  )
}
