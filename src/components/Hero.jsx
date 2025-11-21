import Spline from '@splinetool/react-spline'

export default function Hero(){
  return (
    <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow">Your AI Study Buddy</h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-200">Ask doubts, solve from photos, make flashcards, quizzes and a smart plan — all in one place.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="/login" className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold">Start Now</a>
          <a href="/home" className="px-5 py-2.5 rounded-xl bg-slate-800/70 text-white border border-white/10">Explore</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70" />
    </section>
  )
}
