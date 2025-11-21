import { useState } from 'react'
import Navbar from '../Navbar'

export default function Quiz(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [topic, setTopic] = useState('')
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(null)
  const userId = localStorage.getItem('user_id') || 'demo-user'

  const generate = async () => {
    const res = await fetch(`${baseUrl}/quiz`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:userId, topic, count:5})})
    const data = await res.json()
    setQuestions(data.questions||[])
    setScore(null)
  }

  const submit = () => {
    let s = 0
    questions.forEach(q=>{ if(q.type==='short') s += 1 })
    setScore(s)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Quiz</h2>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="flex gap-2 mb-4">
            <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic" className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
            <button onClick={generate} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Generate</button>
          </div>
          <div className="space-y-3">
            {questions.map((q,idx)=> (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-white/10">
                <p className="font-semibold">{q.question}</p>
                {q.type==='mcq' ? (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(q.options||[]).map((o,i)=>(
                      <label key={i} className="flex items-center gap-2 text-sm"><input type="radio" name={`q-${idx}`} />{o}</label>
                    ))}
                  </div>
                ): (
                  <input className="mt-2 w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10" placeholder="Your answer" />
                )}
              </div>
            ))}
          </div>
          {questions.length>0 && (
            <button onClick={submit} className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Submit</button>
          )}
          {score!==null && (
            <p className="mt-3">Score: {score} / {questions.filter(q=>q.type==='short').length}</p>
          )}
        </div>
      </div>
    </div>
  )
}
