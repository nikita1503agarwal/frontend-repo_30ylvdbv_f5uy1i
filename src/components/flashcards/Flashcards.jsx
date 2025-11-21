import { useState } from 'react'
import Navbar from '../Navbar'

export default function Flashcards(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [topic, setTopic] = useState('')
  const [items, setItems] = useState([])
  const userId = localStorage.getItem('user_id') || 'demo-user'

  const generate = async () => {
    const res = await fetch(`${baseUrl}/flashcards`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:userId, topic, count:6})})
    const data = await res.json()
    setItems(data.items||[])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="flex gap-2 mb-4">
            <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic or notes" className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
            <button onClick={generate} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Generate</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((it,idx)=> (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-white/10">
                <p className="font-semibold">{it.question}</p>
                <p className="text-sm text-slate-300 mt-1">{it.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
