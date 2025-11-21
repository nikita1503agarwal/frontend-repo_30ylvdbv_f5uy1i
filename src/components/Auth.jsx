import { useEffect, useState } from 'react'

function resolveBackendUrl(){
  const saved = localStorage.getItem('backend_url')
  if (saved) return saved
  if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL
  // Last-resort guess: swap 3000 -> 8000 (may not work on hosted URLs but harmless)
  try {
    const u = new URL(window.location.href)
    if (u.port === '3000') {
      u.port = '8000'
      return u.origin
    }
  } catch {}
  return 'http://localhost:8000'
}

export default function Auth(){
  const [provider, setProvider] = useState('email')
  const [identifier, setIdentifier] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [backendUrl, setBackendUrl] = useState(resolveBackendUrl())
  const [showConfig, setShowConfig] = useState(false)

  useEffect(()=>{
    if (backendUrl) localStorage.setItem('backend_url', backendUrl)
  },[backendUrl])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backendUrl}/auth/login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({provider, identifier, name})
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || `Request failed: ${res.status}`)
      }
      const data = await res.json()
      if (!data?.user_id) throw new Error('No user_id returned')
      localStorage.setItem('user_id', data.user_id)
      window.location.href = '/home'
    } catch (e) {
      console.error(e)
      setError('Login failed. Check backend URL and try again.')
      setShowConfig(true)
    } finally {setLoading(false)}
  }

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-6">Login / Signup</h2>
      <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6">
        <div className="flex gap-2 mb-4">
          {['email','phone','google'].map(p => (
            <button key={p} onClick={()=>setProvider(p)} className={`px-3 py-1.5 rounded-lg border ${provider===p?'bg-white text-slate-900':'bg-transparent text-white'} border-white/10`}>{p}</button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-white/10" placeholder={provider==='phone'?'+91 98765 43210':'Email or ID'} value={identifier} onChange={e=>setIdentifier(e.target.value)} required />
          <input className="w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-white/10" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="w-full px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">{loading?'Please wait...':'Continue'}</button>
        </form>

        {showConfig && (
          <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-white/10">
            <label className="block text-xs text-white/70 mb-2">Backend URL</label>
            <input value={backendUrl} onChange={(e)=>setBackendUrl(e.target.value)} placeholder="https://your-backend-url" className="w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-white/10 text-white" />
            <p className="text-xs text-white/50 mt-2">Tip: paste the backend link provided above, then try again.</p>
          </div>
        )}
      </div>
    </section>
  )
}
