import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import stories from '../../data/stories'

export async function getStaticPaths(){
  const paths = stories.map(s => ({ params: { slug: s.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const story = stories.find(s => s.slug === params.slug) || null
  return { props: { story } }
}

export default function StoryPage({ story }){
  if (!story) return <div>Not found</div>
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <article className="grid gap-8 md:grid-cols-2 items-start">
          <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
            <Image src={story.image} alt={story.title} width={640} height={480} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-playfair mb-4">{story.title}</h1>
            {story.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 mb-4">{p}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
