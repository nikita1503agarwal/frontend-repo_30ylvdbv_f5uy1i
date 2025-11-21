import { useState } from 'react'

export default function Auth(){
  const [provider, setProvider] = useState('email')
  const [identifier, setIdentifier] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({provider, identifier, name})})
      const data = await res.json()
      localStorage.setItem('user_id', data.user_id)
      window.location.href = '/home'
    } catch (e) {
      alert('Login failed')
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
          <button disabled={loading} className="w-full px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">{loading?'Please wait...':'Continue'}</button>
        </form>
      </div>
    </section>
  )
}
