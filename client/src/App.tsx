import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { CookieConsent } from './components/cookies'
import logo from "./assets/carrot-diet-fruit-svgrepo-com.svg"

// Lazy load all pages
const Login = lazy(() => import('./components/login'))
const Home = lazy(() => import('./components/home'))
const Reg = lazy(() => import('./components/reg'))
const Auth = lazy(() => import('./components/auth'))
const Gen = lazy(() => import('./components/gen'))
const SetUsername = lazy(() => import('./components/setusername'))
const Terms = lazy(() => import('./components/tpa/terms'))
const Privacy = lazy(() => import('./components/tpa/privacy'))
const About = lazy(() => import('./components/tpa/about'))
const Contact = lazy(() => import('./components/tpa/contact'))
const ProfileSettings = lazy(() => import('./components/profile'))
const Stats = lazy(() => import('./components/stats'))
const JoinQuiz = lazy(() => import('./components/Quiz/join-quiz'))
const CreateQuiz = lazy(() => import('./components/Quiz/create-quiz'))
const Explore = lazy(() => import('./components/Quiz/explore'))
const PlayerInfo = lazy(() => import('./components/PlayerInfo'))
const DailyQuiz = lazy(() => import('./components/Quiz/daily'))

// Page loader component
function PageLoader() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className={`fixed inset-0 z-9999 flex flex-col items-center justify-center transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="w-12 h-12 bg-orange-500 rounded-xl animate-pulse mb-4" >
         <img src={logo} alt="logo" />
      </div>
      <div className={`w-48 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
        <div className="h-full bg-orange-500 animate-[loading_1s_ease-in-out_infinite]" 
          style={{ width: '60%' }} />
      </div>
      <p className={`mt-4 text-sm animate-pulse ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Loading...
      </p>
      <style>{`
        @keyframes loading {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(66%); }
        }
      `}</style>
    </div>
  );
}

// Route wrapper with loading state
function RouteWrapper() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      {loading && <PageLoader />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/reg" element={<Reg />} />
          <Route index path='/' element={<Gen />} />
          <Route path="/terms" element={<Terms />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/stats" element={<Stats />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/join-quiz' element={<JoinQuiz />} />
          <Route path='/playerinfo' element={<PlayerInfo />} />
          <Route path='/daily' element={<DailyQuiz />} />
          <Route element={<Auth />}>
            <Route path="/home" element={<Home />} />
            <Route path='/profile' element={<ProfileSettings />} />
            <Route path='/setusername' element={<SetUsername />} />
            <Route path='/create-quiz' element={<CreateQuiz />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

function App() {
  const onAccept = () => {
    localStorage.setItem("cookies", "true")
  }
  const onReject = () => {
    localStorage.setItem("cookies", "false")
  }

  return (
    <BrowserRouter>
      <CookieConsent onAccept={onAccept} onDecline={onReject} />
      <RouteWrapper />
    </BrowserRouter>
  )
}

export default App