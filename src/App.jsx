import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Navbar />
      <Hero />
      <Dashboard />
    </div>
  )
}

export default App
