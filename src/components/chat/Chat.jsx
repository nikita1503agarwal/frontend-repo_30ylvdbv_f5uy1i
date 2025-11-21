import { useState } from 'react'
import Navbar from '../Navbar'

export default function Chat(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [message, setMessage] = useState('')
  const [items, setItems] = useState([])
  const userId = localStorage.getItem('user_id') || 'demo-user'

  const send = async (action) => {
    if(!message.trim() && !action) return
    const res = await fetch(`${baseUrl}/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:userId,message,action})})
    const data = await res.json()
    setItems(prev=>[...prev,{role:'user',content: message},{role:'assistant',content: data.answer || JSON.stringify(data)}])
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-3">
          {[
            {label:'Simplify',action:'simplify'},
            {label:"Explain like I'm 10",action:'explain10'},
            {label:'Make Flashcards',action:'flashcards'},
            {label:'Create Quiz',action:'quiz'},
          ].map(b=> (
            <button key={b.action} onClick={()=>send(b.action)} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10 hover:bg-slate-700">{b.label}</button>
          ))}
        </div>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 h-[60vh] overflow-y-auto space-y-3">
          {items.map((m,i)=> (
            <div key={i} className={`max-w-[85%] ${m.role==='user'?'ml-auto bg-blue-600 text-white':'bg-slate-800'} px-3 py-2 rounded-xl`}>{m.content}</div>
          ))}
        </div>
        <form onSubmit={(e)=>{e.preventDefault();send()}} className="mt-3 flex gap-2">
          <input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ask your doubt..." className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10" />
          <button className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Send</button>
        </form>
      </div>
    </div>
  )
}
