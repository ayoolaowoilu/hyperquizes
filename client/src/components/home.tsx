import { useState, useEffect } from "react"
import { Link2, ArrowRight,  Zap, Sparkles, BarChart3, Globe, Plus, Calendar, Flame, Star, ChevronRight, Clock, Clock3, Book } from "lucide-react"
import SEO from "./seo"
import Navbar from "./layout/navbar"
import Footer from "./layout/footer"

export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  

  // Random participant count that changes on mount
  const [dailyParticipants, setDailyParticipants] = useState<number>(0);

  useEffect(() => {
    document.title = "Home | Hyper Quizzes"
   

    setDailyParticipants(Math.floor(Math.random() * 4200) + 800)
    
 
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark]);



  const mainActions = [
    {
      title: "Join Quiz",
      desc: "Enter a room code to join a live quiz instantly",
      path: "/join-quiz",
      icon: <Link2 className="w-6 h-6" />,
      color: "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300",
      iconBg: "bg-orange-100",
      badge: "Popular"
    },
    {
      title: "Create Quiz",
      desc: "Build custom quizzes with timers and leaderboards",
      path: "/create-quiz",
      icon: <Plus className="w-6 h-6" />,
      color: "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300",
      iconBg: "bg-slate-200",
      badge: null
    },
    {
      title: "Explore",
      desc: "Browse public quizzes across all topics",
      path: "/explore",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 hover:border-amber-300",
      iconBg: "bg-amber-100",
      badge: "New"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <SEO title="Home" description="Create and play quizzes" />
      <Navbar onThemeChange={setIsDark} />

      {/* Hero Section */}
      <section className={`pt-24 pb-12 px-4 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Live quizzes happening now
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Test Your Knowledge,
            <br />
            <span className="text-orange-500">Beat the Clock</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Join live quiz rooms, create your own challenges, or explore thousands of public quizzes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/join-quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
            >
              <Link2 className="w-5 h-5" />
              Join a Quiz Now
            </a>
            <a 
              href="/create-quiz"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 transition-colors ${
                isDark 
                  ? 'border-slate-700 text-white hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Plus className="w-5 h-5" />
              Create Quiz
            </a>
          </div>
        </div>
      </section>

  
    
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
       
        <section>
          <h2 className="text-2xl font-bold mb-6">Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mainActions.map((action, idx) => (
              <a
                key={idx}
                href={action.path}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${action.color}`}
              >
                {action.badge && (
                  <span className="absolute top-4 right-4 px-2 py-1 rounded-md bg-orange-500 text-white text-xs font-bold">
                    {action.badge}
                  </span>
                )}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${action.iconBg}`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-sm opacity-80 mb-4">{action.desc}</p>
                <div className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
                  Get Started <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Daily Quiz Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Daily Quiz</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>New challenge every day</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${isDark ? 'bg-slate-800 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
              <Flame className="w-4 h-4" />
              {dailyParticipants.toLocaleString()} played today
            </div>
          </div>

          <div className={`p-8 rounded-2xl border-2 ${isDark ? 'bg-slate-900 border-orange-500/30' : 'bg-orange-50 border-orange-200'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                    General Knowledge
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Clock3 className="w-4 h-4 inline mr-1" />
                    Resets at midnight
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Today's Challenge</h3>
                <div className="flex items-center gap-6 text-sm mb-4">
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Zap className="w-4 h-4" /> 10 questions
                  </span>
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Clock className="w-4 h-4" /> 5 min limit
                  </span>
                  <span className="flex items-center gap-1 text-orange-500 font-medium">
                    <Sparkles className="w-4 h-4" /> 2x Points
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <a
                  href="/daily"
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Play Daily Quiz
                </a>
              
              </div>
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Explore</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Discover quizzes by category</p>
              </div>
            </div>
            <a href="/explore" className="text-orange-500 font-medium hover:text-orange-600 inline-flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/explore?filter=trending"
              className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 bg-orange-50 border-orange-200 text-orange-600 ${isDark ? 'bg-slate-900' : ''}`}
            >
              <div className="mb-3"><Flame className="w-5 h-5" /></div>
              <h3 className="font-bold text-lg mb-1">Trending</h3>
              <p className="text-sm opacity-70">Hot right now</p>
            </a>
            <a
              href="/explore?filter=new"
              className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 bg-blue-50 border-blue-200 text-blue-600 ${isDark ? 'bg-slate-900' : ''}`}
            >
              <div className="mb-3"><Sparkles className="w-5 h-5" /></div>
              <h3 className="font-bold text-lg mb-1">New</h3>
              <p className="text-sm opacity-70">Fresh quizzes</p>
            </a>
            <a
              href="/explore?filter=top"
              className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 bg-amber-50 border-amber-200 text-amber-600 ${isDark ? 'bg-slate-900' : ''}`}
            >
              <div className="mb-3"><Star className="w-5 h-5" /></div>
              <h3 className="font-bold text-lg mb-1">Top Rated</h3>
              <p className="text-sm opacity-70">Highest rated</p>
            </a>
            <a
              href="/explore?filter=science"
              className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 bg-purple-50 border-purple-200 text-purple-600 ${isDark ? 'bg-slate-900' : ''}`}
            >
              <div className="mb-3"><Zap className="w-5 h-5" /></div>
              <h3 className="font-bold text-lg mb-1">Science</h3>
              <p className="text-sm opacity-70">STEM topics</p>
            </a>
          </div>
        </section>

        {/* Review Stats CTA */}
        <section className={`p-8 rounded-2xl border-2 text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <BarChart3 className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Review Your Performance</h3>
          <p className={`text-sm mb-6 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Track your quiz history, see who took your quizzes, and analyze your strengths
          </p>
          <a
            href="/stats"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
          >
            <Book className="w-5 h-5" />
            View Stats
          </a>
        </section>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}