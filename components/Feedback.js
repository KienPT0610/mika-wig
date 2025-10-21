import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((j) => setFeedback(j.feedback || []));
  }, []);

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
      </div>
    </section>
  );
}
