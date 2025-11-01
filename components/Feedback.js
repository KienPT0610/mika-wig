import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)

  const limit = 5
  const fetchFeedback = (p = 1) => {
    fetch(`/api/feedback?limit=${limit}&page=${p}`)
      .then((r) => r.json())
      .then((j) => {
        setFeedback(j.feedback || [])
        setTotal(j.total || 0)
        setPage(p)
      });
  }

  useEffect(() => {
  fetchFeedback(1)
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null')
      if (u && u.id) setUser(u)
    } catch (e) {
      setUser(null)
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return alert('Vui lòng đăng nhập để gửi phản hồi')
    if (!message || message.trim().length === 0) return alert('Nhập nội dung phản hồi')
    setSubmitting(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, message, rating })
      })
      const j = await res.json()
      if (res.ok) {
        setMessage('')
        setRating(5)
        fetchFeedback()
      } else {
        alert(j.error || 'Lỗi khi gửi phản hồi')
      }
    } catch (err) {
      console.error(err)
      alert('Lỗi mạng')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="w-full py-10 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Những người dùng hài lòng nói gì!
          </h2>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={32}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {feedback.length === 0 ? (
            <SwiperSlide>
              <div className="bg-white border border-gray-300 rounded-xl p-6 text-center text-gray-400">
                Chưa có phản hồi nào.
              </div>
            </SwiperSlide>
          ) : (
            feedback.map((f) => (
              <SwiperSlide key={f.id}>
                <div className="group bg-white border border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-mika-blue hover:shadow-sm">
                  {/* Rating */}
                  <div className="flex items-center mb-7 gap-2 text-amber-500">
                    ⭐{" "}
                    <span className="text-base font-semibold text-mika-blue">
                      {f.rating}
                    </span>
                  </div>

                  {/* Text */}
                  <p className="text-base text-gray-600 leading-6 pb-8 group-hover:text-gray-800 transition-all duration-500">
                    {f.message}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                    {f.avatar ? (
                      <img
                        src={f.avatar}
                        alt={f.user_name}
                        className="rounded-full h-10 w-10 object-cover"
                      />
                    ) : (
                      <div className="rounded-full h-10 w-10 bg-mika-blue/10 flex items-center justify-center font-bold text-mika-blue">
                        {f.user_name
                          ? f.user_name
                              .split(" ")
                              .map((s) => s[0])
                              .slice(-2)
                              .join("")
                          : "U"}
                      </div>
                    )}
                    <div>
                      <h5 className="text-gray-900 font-medium mb-1">
                        {f.user_name}
                      </h5>
                      <span className="text-sm text-gray-500">{f.email}</span>
                      <span className="block text-xs text-gray-400 mt-1">
                        {new Date(f.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
          {/* pagination controls */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="px-3 py-1 border rounded" onClick={() => fetchFeedback(page - 1)} disabled={page <= 1}>‹ Prev</button>
            <div className="text-sm text-gray-600">Trang {page} / {Math.max(1, Math.ceil(total / limit))}</div>
            <button className="px-3 py-1 border rounded" onClick={() => fetchFeedback(page + 1)} disabled={page >= Math.ceil(total / limit)}>Next ›</button>
          </div>
        {/* Comment form (only for logged-in users) */}
        {user ? (
          <div className="my-8 mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2 text-sm text-gray-600">Gửi phản hồi của bạn</div>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full p-2 border rounded mb-2" placeholder="Viết cảm nhận của bạn về sản phẩm..." />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Đánh giá</label>
                <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border rounded p-1">
                  <option value={5}>5 - Tuyệt vời</option>
                  <option value={4}>4 - Tốt</option>
                  <option value={3}>3 - Trung bình</option>
                  <option value={2}>2 - Kém</option>
                  <option value={1}>1 - Rất kém</option>
                </select>
                <div className="ml-auto">
                  <button type="submit" disabled={submitting} className="bg-mika-blue text-white px-4 py-2 rounded disabled:opacity-60">{submitting ? 'Đang gửi...' : 'Gửi'}</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-8 text-center text-sm text-gray-500">Vui lòng đăng nhập để gửi phản hồi.</div>
        )}
      </div>
    </section>
  );
}
