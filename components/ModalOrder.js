import { useEffect } from 'react'
import saleImg from '../assets/images/image-sale.png'
import Image from 'next/image'

export default function ModalOrder(){
  useEffect(()=>{
    // placeholder for mounting modal listeners
  },[])

  const closeModal = () => {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 relative'>
        {/* button close */}
        <button className='absolute -top-2 -right-0 text-4xl' onClick={closeModal}>
          &times;
        </button>
        <Image src={saleImg} alt="Tóc giả" width={520} height={320} className="object-cover" />
      </div>
    </div>
  )
}
