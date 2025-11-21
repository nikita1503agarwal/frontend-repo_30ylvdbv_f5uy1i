import { useEffect, useState } from 'react'
import { Home, MessageCircle, Image as ImageIcon, Layers, ListChecks, Calendar, BookMarked, User, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const id = localStorage.getItem('user_id')
    setUserId(id)
  }, [location.pathname])

  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-orange-400 animate-pulse" />
          <span className="text-white font-semibold">Study Buddy</span>
        </Link>
        <nav className="flex items-center gap-2 text-slate-200">
          <Link className="nav-btn" to="/home"><Home size={18} /> <span className="hidden sm:inline">Home</span></Link>
          <Link className="nav-btn" to="/chat"><MessageCircle size={18} /> <span className="hidden sm:inline">Ask AI</span></Link>
          <Link className="nav-btn" to="/photo"><ImageIcon size={18} /> <span className="hidden sm:inline">Photo</span></Link>
          <Link className="nav-btn" to="/flashcards"><Layers size={18} /> <span className="hidden sm:inline">Flashcards</span></Link>
          <Link className="nav-btn" to="/quiz"><ListChecks size={18} /> <span className="hidden sm:inline">Quiz</span></Link>
          <Link className="nav-btn" to="/planner"><Calendar size={18} /> <span className="hidden sm:inline">Planner</span></Link>
          <Link className="nav-btn" to="/library"><BookMarked size={18} /> <span className="hidden sm:inline">Library</span></Link>
          {userId ? (
            <Link className="nav-btn" to="/profile"><User size={18} /><span className="hidden sm:inline">Profile</span></Link>
          ) : (
            <Link className="nav-btn" to="/login"><Sparkles size={18} /><span className="hidden sm:inline">Get Started</span></Link>
          )}
        </nav>
      </div>
      <style>{`
        .nav-btn{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:rgba(2,6,23,0.3)}
        .nav-btn:hover{background:rgba(255,255,255,0.06)}
      `}</style>
    </div>
  )
}
