import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

const processSteps = [
  {
    title: 'Chọn lọc nguyên liệu',
    description: `Toàn bộ sản phẩm được làm từ tóc thật đã qua chọn lọc kỹ càng, đảm bảo độ chắc khỏe, bóng mượt và bền màu theo thời gian. 
Mỗi sợi tóc đều có khả năng chịu được các tác động của hóa chất nhuộm, tẩy và tạo kiểu, mang lại độ bền vượt trội.`
  },
  {
    title: 'Chất liệu và phụ kiện cao cấp',
    description: `Đảm bảo độ bền và cảm giác tự nhiên khi sử dụng:`,
    list: [
      'Lưới tóc: loại cao cấp, thoáng khí và êm ái.',
      'Kẹp tóc: kẹp có đệm silicon, cố định chắc chắn mà không gây đau.',
      'Sợi chỉ: may bằng chỉ chuyên dụng, đảm bảo độ bền và tính thẩm mỹ.'
    ]
  },
  {
    title: 'Gia công & móc tóc',
    description: `Sau khi khách hàng xác nhận mẫu và kích thước, Mika.wig sẽ móc tóc thủ công theo thông số riêng. 
Bộ khuôn tóc được tạo dựa trên số đo đầu, giúp mái tóc giả ôm sát, tự nhiên và thoải mái.`
  },
  {
    title: 'Nhuộm, tẩy và tạo kiểu',
    description: `Tóc được tạo kiểu và nhuộm màu theo yêu cầu.`,
    list: [
      'Với tóc xoăn: sử dụng thuốc chuyên dụng giữ nếp lâu dài, hạn chế duỗi nếp.',
      'Với tóc nhuộm: thuốc nhuộm chất lượng cao, màu lên chuẩn, bền và ít phai.',
      'Với tóc tẩy: đảm bảo chất lượng thuốc tẩy và chất tóc sau tẩy không bị đứt, chia ô và móc hoặc xen kẽ vào bộ tóc giả theo mẫu light.'
    ]
  },
  {
    title: 'Kiểm tra & đóng gói',
    description: `Trước khi đến tay khách hàng, sản phẩm được kiểm tra kỹ lưỡng qua nhiều công đoạn: dệt tóc, nhuộm tóc, tạo kiểu, kiểm đơn và đánh giá chất lượng. 
Camera giám sát từng đơn hàng để đảm bảo minh bạch. Cuối cùng, sản phẩm được đóng gói chỉnh chu và giao tận tay khách hàng với đầy đủ quà tặng và hướng dẫn sử dụng.`
  }
]

// processOrderSteps.js
export const processOrderSteps = [
  {
    title: 'Liên hệ & tư vấn mẫu tóc',
    description: 'Gửi hình ảnh/mô tả hoặc nhận tư vấn từ chuyên viên của Mika.wig.'
  },
  {
    title: 'Chốt mẫu & thông tin giao hàng',
    description: 'Xác nhận màu, kiểu dáng, địa chỉ. Miễn phí vận chuyển trong nước, quốc tế tính phí rõ ràng.'
  },
  {
    title: 'Xác nhận đơn hàng & đặt cọc',
    description: 'Đặt cọc một phần giá trị để đảm bảo tiến độ sản xuất.'
  },
  {
    title: 'Theo dõi tiến độ sản xuất',
    description: 'Cập nhật tình trạng sản phẩm qua nhân viên, bạn có thể theo dõi tiến độ sản xuất.'
  },
  {
    title: 'Giao hàng tận nơi',
    description: 'Trong nước qua Giao Hàng Tiết Kiệm hoặc giao nhanh; quốc tế qua đơn vị uy tín, đảm bảo an toàn.'
  }
];


export default function Process() {
  const [openSteps, setOpenSteps] = useState({})
  const [openOrderSteps, setOpenOrderSteps] = useState({})

  function toggleStep(idx) {
    setOpenSteps(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  function toggleOrderStep(idx) {
    setOpenOrderSteps(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-8 font-bold">Quy trình sản xuất tại Mika.wig</h1>
        <p className="mb-8 text-gray-700">
          Tại Mika.wig, mỗi bộ tóc giả đều được làm thủ công 100%, thể hiện sự tỉ mỉ và tâm huyết của đội ngũ nghệ nhân lành nghề. 
          Chúng tôi không chỉ tạo ra một sản phẩm tóc giả, mà còn gửi gắm vào đó chất lượng, sự thoải mái và vẻ đẹp tự nhiên nhất cho người dùng.
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {processSteps.map((step, i) => (
            <div key={i} className="p-6 border rounded-lg text-left flex flex-col">
              <button onClick={() => toggleStep(i)} className="text-left">
                <div className="text-xl font-playfair font-semibold mb-2">Bước {i + 1}: {step.title}</div>
              </button>
              <div className={`${openSteps[i] ? 'block' : 'hidden'} text-gray-600 mb-2`}>{step.description}</div>
              {step.list && (
                <ul className={`${openSteps[i] ? 'block' : 'hidden'} list-disc list-inside text-gray-600 ml-2`}>
                  {step.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <h1 className="text-3xl mb-8 font-bold mt-4">💌 Quy trình đặt hàng tại Mika.wig – Tóc giả Mai</h1>
        <p className="mb-8 text-gray-700">
          Tại Mika.wig, chúng tôi hiểu rằng mỗi khách hàng đều có gu thẩm mỹ và phong cách riêng biệt. Vì vậy, toàn bộ quy trình đặt hàng được thiết kế để bạn có thể tùy chỉnh hoàn toàn mẫu tóc theo sở thích, từ kiểu dáng, màu sắc đến chất liệu.
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {processOrderSteps.map((step, i) => (
            <div key={i} className="p-6 border rounded-lg text-left flex flex-col">
              <button onClick={() => toggleOrderStep(i)} className="text-left">
                <div className="text-xl font-playfair font-semibold mb-2">Bước {i + 1}: {step.title}</div>
              </button>
              <div className={`${openOrderSteps[i] ? 'block' : 'hidden'} text-gray-600 mb-2`}>{step.description}</div>
              {step.list && (
                <ul className={`${openOrderSteps[i] ? 'block' : 'hidden'} list-disc list-inside text-gray-600 ml-2`}>
                  {step.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
