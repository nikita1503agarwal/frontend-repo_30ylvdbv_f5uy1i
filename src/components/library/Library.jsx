import { useEffect, useState } from 'react'
import Navbar from '../Navbar'

export default function Library(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [data, setData] = useState(null)
  const userId = localStorage.getItem('user_id') || 'demo-user'

  useEffect(()=>{ fetch(`${baseUrl}/library/${userId}`).then(r=>r.json()).then(setData).catch(()=>{}) },[])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Saved Library</h2>
        {!data ? (
          <p className="text-slate-300">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(data).map(([k, arr]) => (
              <div key={k} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">{k.replace(/_/g,' ')}</h3>
                <ul className="space-y-2 text-sm text-slate-300 max-h-60 overflow-auto">
                  {(arr||[]).map((it,idx)=> (
                    <li key={idx} className="truncate">{JSON.stringify(it)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
