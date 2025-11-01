import Link from "next/link";
import Image from "next/image";
import heroImg from "../assets/images/image-hero.png";

export default function Hero() {
  return (
    <section className="relative bg-img-hero min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
          <span className="text-transparent text-hero bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#4b4b4b]">
            Mika.wig
          </span>{" "}
          <span className="text-mika-blue">— Tóc giả cao cấp</span>
        </h1>

        <p className="text-lg md:text-xl text-hero leading-relaxed mb-10 font-light">
          Every Mika wig is <span className="font-medium text-mika-blue">100% handmade</span> by
          skilled artisans, crafted with care and precision. We value quality, personalization,
          and your confidence — each piece is tailored to your style for the most natural look.
          Because to us, a wig isn’t just hair — it’s <span className="italic">your confidence.</span>
        </p>

        <Link
          href="/products"
          className="inline-block bg-mika-blue text-white px-10 py-4 rounded-full shadow-lg hover:bg-mika-blue/80 hover:scale-105 transform transition-all duration-300 font-medium tracking-wide"
        >
          Xem sản phẩm
        </Link>
      </div>
    </section>
  );
}
