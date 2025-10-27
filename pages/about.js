import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import aboutImg from "../assets/images/about.png";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-playfair mb-4">About Mika.Wig</h1>
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="h-72 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={aboutImg}
              alt="Nghệ nhân"
              width={480}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-gray-700 mb-4">
              At Mika.Wig, we believe that beauty should feel real - natural,
              effortless, and kind to the planet.
            </p>
            <p className="text-gray-700 mb-4">
              Founded in Vietnam, Mika.Wig was born from the desire to help
              everyone feel confident in their own skin (and hair), no matter
              what stage of life they’re in.
            </p>
            <p className="text-gray-700 mb-4">
              Each wig is 100% handmade from real human hair, carefully selected
              and crafted by skilled artisans. Every strand is treated with
              care, ensuring softness, natural movement, and long-lasting
              quality. We focus on details that make a difference - from our
              ultra-realistic scalp design to lightweight, breathable lace that
              feels like your own skin.
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-700 mb-4">
            But beyond beauty, Mika.Wig is about sustainability and conscious
            living. We believe in creating products that are not only beautiful,
            but also ethical and eco-friendly - because confidence shouldn’t
            come at the cost of our planet.
          </p>
          <p className="text-gray-700 mb-4">
            Our production process minimizes waste, and our packaging embraces a
            green mindset to encourage sustainable beauty choices every day.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you’re restoring confidence after hair loss, exploring a new
            style, or simply wanting to wake up feeling more you, Mika.Wig is
            here to accompany you with comfort, elegance, and a touch of nature.
          </p>
          <p className="text-gray-700 mb-4">
            Because to us, a wig isn’t just hair —
          </p>
          <p className="text-amber-500 font-semibold">
            ✨ it’s confidence reborn, beauty renewed, and harmony with nature.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
