import { useState } from 'react'
import Navbar from '../Navbar'

export default function Planner(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [examDate, setExamDate] = useState('')
  const [subjects, setSubjects] = useState('Math, Science, English')
  const [daily, setDaily] = useState(30)
  const [tasks, setTasks] = useState([])
  const userId = localStorage.getItem('user_id') || 'demo-user'

  const generate = async () => {
    const res = await fetch(`${baseUrl}/planner`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:userId, exam_date: examDate || 'TBD', daily_minutes: daily, subjects: subjects.split(',').map(s=>s.trim()).filter(Boolean)})})
    const data = await res.json()
    setTasks(data.tasks||[])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Study Planner</h2>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <input type="date" value={examDate} onChange={e=>setExamDate(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
            <input value={subjects} onChange={e=>setSubjects(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
            <input type="number" value={daily} onChange={e=>setDaily(parseInt(e.target.value||'0'))} className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
          </div>
          <button onClick={generate} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Create Plan</button>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {tasks.map((t,idx)=> (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-white/10">
                <p className="font-semibold">{t.date} • {t.subject}</p>
                <p className="text-sm text-slate-300">{t.topic}</p>
                <p className="text-xs text-slate-400 mt-1">{t.minutes} mins</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
