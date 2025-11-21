import { useState } from 'react'
import Navbar from '../Navbar'

export default function Photo(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const userId = localStorage.getItem('user_id') || 'demo-user'

  const upload = async () => {
    if(!file) return
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${baseUrl}/photo-doubt?user_id=${userId}`, {method:'POST', body: form})
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Photo Doubt Solver</h2>
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
            <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
            <button onClick={upload} className="mt-3 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Upload</button>
          </div>
          {result && (
            <div className="mt-4 text-sm">
              <p className="text-slate-300">OCR: {result.ocr_text}</p>
              <p className="text-slate-200 mt-2">Answer: {result.answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
