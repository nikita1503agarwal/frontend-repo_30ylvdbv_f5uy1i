import { Camera, MessageSquare, Layers, ListChecks } from 'lucide-react'

export default function Dashboard(){
  const quick = [
    {label:'Ask AI', href:'/chat', icon: MessageSquare},
    {label:'Upload Photo', href:'/photo', icon: Camera},
    {label:'Flashcards', href:'/flashcards', icon: Layers},
    {label:'Quiz', href:'/quiz', icon: ListChecks},
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-800/40 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Today</h3>
          <div className="h-36 grid place-items-center text-slate-300">Your tasks will appear here</div>
        </div>
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Recent Doubts</h3>
          <div className="space-y-3 text-slate-300 text-sm">
            <p>No doubts yet. Try asking the AI.</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quick.map((q) => (
            <a key={q.label} href={q.href} className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-white/10 hover:bg-slate-800/60 transition">
              <q.icon className="text-white" size={18} />
              <span className="text-slate-200">{q.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
