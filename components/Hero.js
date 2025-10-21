import Link from "next/link";
import Image from "next/image";
import heroImg from "../assets/images/image.png";

export default function Hero() {
  return (
    <section className="bg-img-2 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-hero">
            Mika.wig — Tóc giả cao cấp
          </h1>
          <p className="text-lg text-hero mb-6">
            Every Mika wig is 100% handmade by skilled artisans, crafted with
            care and precision. We value quality, personalization, and your
            confidence - each piece is tailored to your style for the most
            natural look. Because to us, a wig isn’t just hair - it’s your
            confidence.
          </p>
          <Link href="/products" className="inline-block btn-primary px-6 py-3">
            Xem sản phẩm
          </Link>
        </div>
        <div className="h-72 bg-white rounded-lg shadow flex items-center justify-center overflow-hidden">
          <Image
            src={heroImg}
            alt="Tóc giả"
            width={520}
            height={320}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
