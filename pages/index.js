import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Feedback from '../components/Feedback'
import ModalOrder from '../components/ModalOrder'
import ShortIntroduction from '../components/ShortIntroduction'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ShortIntroduction />
        <Featured />
        <Feedback />
      </main>
      <Footer />
      <ModalOrder />
    </div>
  )
}
