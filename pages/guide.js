import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Guide() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-8 font-bold">Hướng dẫn & Bảo dưỡng</h1>

        {/* Hướng dẫn chăm sóc tóc giả */}
        <article className="prose lg:prose-lg mb-12">
          <h2>💆‍♀️ HƯỚNG DẪN CHĂM SÓC TÓC GIẢ</h2>
          <p>
            Áp dụng cho tóc thật thủ công 100% tại <strong>Mika.wig – Tóc giả Mai</strong>. 
            Mỗi bộ tóc đều được làm hoàn toàn từ tóc thật, việc chăm sóc đúng cách giúp duy trì độ mềm mượt, bền màu và giữ nếp lâu dài.
          </p>

          <h3>1️⃣ Khi vừa nhận hàng</h3>
          <p>
            Trong quá trình vận chuyển, tóc có thể hơi xô lệch hoặc dính lại từng mảng do lớp dưỡng bảo vệ.
          </p>
          <div className="bg-mika-blue-100 border-l-4 border-mika-blue p-4 my-2">
            👉 Cách xử lý:
            <ul className="list-disc list-inside mt-2">
              <li>Nhẹ nhàng xả tóc bằng nước sạch.</li>
              <li>Dùng lược thưa chải nhẹ theo chiều tóc hoặc vừa chải vừa sấy để tóc vào nếp tự nhiên.</li>
              <li>Cách này cũng giúp tạo kiểu nhanh hàng ngày nếu tóc bị xô nếp.</li>
            </ul>
          </div>

          <h3>2️⃣ Trong quá trình sử dụng hằng ngày</h3>
          <p>
            Giống như tóc thật, tóc giả sẽ bám bụi, mồ hôi hoặc sản phẩm tạo kiểu theo thời gian.
          </p>
          <div className="bg-mika-blue-100 border-l-4 border-mika-blue p-4 my-2">
            👉 Cách vệ sinh:
            <ul className="list-disc list-inside mt-2">
              <li>Gội tóc nhẹ nhàng bằng dầu gội dành cho tóc thật.</li>
              <li>Xả tóc bằng dầu xả để giữ độ mềm mượt.</li>
              <li>Chải tóc theo nếp mong muốn khi còn ẩm, để khô tự nhiên hoặc sấy nhẹ.</li>
              <li>Tránh nhiệt quá cao để không làm khô sợi tóc.</li>
            </ul>
          </div>

          <h3>3️⃣ Dưỡng tóc & bảo quản định kỳ</h3>
          <ul className="list-disc list-inside mt-2">
            <li>Dưỡng tóc sau mỗi vài lần sử dụng bằng sản phẩm dưỡng của Mika.wig hoặc dầu dưỡng chuyên dụng.</li>
            <li>Đặt tóc lên chân đỡ hoặc mannequin khi không sử dụng để giữ form.</li>
            <li>Bảo quản tóc nơi thoáng mát, tránh ẩm và ánh nắng trực tiếp.</li>
          </ul>
          <p className="mt-4 font-semibold text-mika-blue">
            💗 Chăm sóc đúng cách, tóc giả thật của Mika.wig – Tóc giả Mai sẽ đồng hành cùng bạn lâu dài, mềm mại và tự nhiên như ngày đầu.
          </p>
        </article>

        {/* Chính sách bảo dưỡng */}
        <article className="prose lg:prose-lg">
          <h2>💖 CHÍNH SÁCH BẢO DƯỠNG – Mika.wig – Tóc giả Mai</h2>
          <p>
            Tại Mika.wig, mỗi bộ tóc thật đều được làm thủ công tỉ mỉ, vì vậy chúng tôi cam kết đồng hành cùng khách hàng cả sau khi nhận hàng.
          </p>

          <h3>1️⃣ Hỗ trợ sau khi nhận sản phẩm</h3>
          <p>Nếu gặp tình trạng:</p>
          <ul className="list-disc list-inside">
            <li>Tóc lệch form, rối hoặc mất nếp mà không thể tự xử lý tại nhà.</li>
            <li>Hoặc đã thử thao tác nhưng chưa thành công.</li>
          </ul>
          <div className="bg-mika-blue-100 border-l-4 border-mika-blue p-4 my-2">
            👉 Đừng lo, bạn có thể liên hệ Mika.wig để được:
            <ul className="list-disc list-inside mt-2">
              <li>Hỗ trợ gián tiếp qua hướng dẫn chi tiết của nhân viên.</li>
              <li>Nếu vẫn không khắc phục được, gửi lại sản phẩm về xưởng để đội ngũ xử lý & cân chỉnh trực tiếp – <strong>miễn phí</strong>.</li>
            </ul>
          </div>

          <h3>2️⃣ Chính sách bảo dưỡng định kỳ</h3>
          <p>
            Sản phẩm tóc thật 100% có thể bền 5–7 năm nếu chăm sóc đúng cách. Chúng tôi áp dụng chính sách bảo dưỡng linh hoạt:
          </p>
          <ul className="list-disc list-inside">
            <li>Tạo kiểu lại, chỉnh form tóc, hấp dưỡng phục hồi.</li>
            <li>Đổi màu hoặc phục hồi tóc sau thời gian sử dụng.</li>
          </ul>
          <p>Quy trình bảo dưỡng:</p>
          <ol className="list-decimal list-inside">
            <li>Liên hệ Mika.wig để được tư vấn về tình trạng tóc hiện tại.</li>
            <li>Gửi lại sản phẩm để đội ngũ thợ lành nghề tiến hành bảo dưỡng, chỉnh sửa hoặc nhuộm lại theo yêu cầu.</li>
          </ol>

          <p className="mt-4 font-semibold text-mika-blue">
            💬 Mika.wig – Tóc giả Mai cam kết đồng hành từ khi chọn tóc đến suốt quá trình sử dụng, giúp mái tóc luôn bền đẹp, tự nhiên và mang lại sự tự tin trọn vẹn.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
