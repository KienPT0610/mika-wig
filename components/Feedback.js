export default function Feedback(){
  const items = [
    {name: 'Lan', text: 'Rất ưng, tự nhiên và nhẹ.'},
    {name: 'Hương', text: 'Dịch vụ tận tâm, giao nhanh.'},
    {name: 'Mai', text: 'Chất lượng tuyệt vời.'}
  ]

  return (
    <section className="py-12 bg-mika-pink">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl mb-6">Feedback</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((it,i)=> (
            <div key={i} className="p-4 bg-white rounded shadow"> 
              <div className="font-semibold">{it.name}</div>
              <div className="text-gray-600">{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
