import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Link2, ArrowRight, Users, Clock, Sparkles, Trophy } from "lucide-react"
import Navbar from "./layout/navbar"
import Footer from "./layout/footer"

export default function JoinQuiz() {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState<string>("")
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  })
  const [recentCodes, setRecentCodes] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentQuizCodes')
    return saved ? JSON.parse(saved) : []
  })

  const handleJoin = (e: FormEvent) => {
    e.preventDefault()
    if (!roomCode.trim()) return
    
    const updated = [roomCode, ...recentCodes.filter(c => c !== roomCode)].slice(0, 5)
    setRecentCodes(updated)
    localStorage.setItem('recentQuizCodes', JSON.stringify(updated))
    
    navigate(`/playerinfo?code=${roomCode.trim()}`)
  }

  const quickJoin = (code: string) => {
    setRoomCode(code)
    navigate(`/playerinfo?code=${code}`)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <Navbar onThemeChange={setIsDark} />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 mb-4">
              <Link2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Join a Quiz</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Enter a room code to join a live quiz session
            </p>
          </div>

          <div className={`p-8 rounded-2xl border-2 mb-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <form onSubmit={handleJoin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Room Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g., ABC123)"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg font-mono tracking-wider uppercase transition-colors focus:outline-none focus:border-orange-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-slate-900 placeholder-gray-400'
                    }`}
                    maxLength={6}
                    autoFocus
                  />
                  {roomCode && (
                    <button
                      type="button"
                      onClick={() => setRoomCode("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!roomCode.trim()}
                className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5" />
                Join Quiz Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {recentCodes.length > 0 && (
            <div className={`p-6 rounded-2xl border-2 mb-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Recent Rooms
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentCodes.map((code, idx) => (
                  <button
                    key={idx}
                    onClick={() => quickJoin(code)}
                    className={`px-4 py-2 rounded-lg border font-mono text-sm transition-colors ${
                      isDark 
                        ? 'border-slate-700 hover:border-orange-500 hover:bg-orange-500/10' 
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Users className="w-5 h-5" />, title: "Enter Code", desc: "Get the 6-digit code from the host" },
              { icon: <Sparkles className="w-5 h-5" />, title: "Join Instantly", desc: "No account required to play" },
              { icon: <Trophy className="w-5 h-5" />, title: "Compete Live", desc: "Real-time scoring & leaderboard" }
            ].map((step, idx) => (
              <div key={idx} className={`p-4 rounded-xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 mb-2">
                  {step.icon}
                </div>
                <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className={`mt-8 p-6 rounded-2xl border-2 text-center ${isDark ? 'bg-slate-900 border-orange-500/30' : 'bg-orange-50 border-orange-200'}`}>
            <p className="font-semibold mb-2">Want to host your own quiz?</p>
            <a 
              href="/create-quiz"
              className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600"
            >
              Create a Quiz <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  )
}