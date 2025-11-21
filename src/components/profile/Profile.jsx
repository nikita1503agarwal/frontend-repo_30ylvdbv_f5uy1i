import { useEffect, useState } from 'react'
import Navbar from '../Navbar'

export default function Profile(){
  const [form, setForm] = useState({grade:'', subjects:'Math, Science', goal:'exam', language:'English'})
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const userId = localStorage.getItem('user_id') || 'demo-user'

  const save = async () => {
    await fetch(`${baseUrl}/profile/setup`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:userId, grade:form.grade, subjects:form.subjects.split(',').map(s=>s.trim()).filter(Boolean), study_goal: form.goal, daily_study_minutes: 20})})
    alert('Saved')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 space-y-3">
          <input value={form.grade} onChange={e=>setForm({...form, grade:e.target.value})} placeholder="Class/Grade" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
          <input value={form.subjects} onChange={e=>setForm({...form, subjects:e.target.value})} placeholder="Subjects (comma separated)" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
          <select value={form.goal} onChange={e=>setForm({...form, goal:e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10">
            <option value="exam">Exam</option>
            <option value="homework">Homework</option>
            <option value="preparation">Preparation</option>
          </select>
          <select value={form.language} onChange={e=>setForm({...form, language:e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10">
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>
          <button onClick={save} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Save</button>
        </div>
      </div>
    </div>
  )
}
