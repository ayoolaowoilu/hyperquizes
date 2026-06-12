import { useEffect,  useState } from "react";
import { fetchRecents, getUserData } from "../lib/auth";
import { GetQuizesByCreatorId, GetQuizParticipantsHistory} from "../lib/quiz";
import logo from "../assets/carrot-diet-fruit-svgrepo-com.svg"

import {  CircleQuestionMarkIcon } from "lucide-react";
import Navbar from "./layout/navbar";

interface RecentQuiz {
  quiz_id: number;
  quiz_name: string;
  user_id: number;
  score: number;
  passing_score: number;
  time_taken: number;
  date_taken: number;
  creator_id?: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  followers: any[] | null;
  following: any[] | null;
  viewed: number[];
  points: number;
}

type QuizType = "TOF" | "MCQ" | "SAQ";
interface Quiz {
  id: number;
  _type: QuizType;
  quiz_name: string;
  creator_id: string;
  material: string;
  saves: number;
  views: number;
  reward: number;
  completed: number;
  passed: number;
  failed: number;
  isOneTime: number;
  isTimed: number;
  duration: number;
  quiz_tags: string[];
  time_posted: string;
  passingScore: string;
  likes: number;
  questions?: any[];
}



export default function Stats() {
  // states
  const [isOtherDataLoading, SetIsOtherDataLoading] = useState(false)
  const [myAttempted, setmyAttempted] = useState<RecentQuiz[]>([])
  const [mySetHistory, setMySetHistory] = useState<RecentQuiz[]>([])
  const [myData, setmyData] = useState<User>()
  const [myQuizData, setMyQuizData] = useState<Quiz[]>([])
  
  const [stages, setStages] = useState<1 | 2 | 3>(1)
 

  
  // Modal states
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  })

  const userId = localStorage.getItem("id")
  const avatarLetter = (myData?.username || `User${userId}`).charAt(0).toUpperCase()
  const isLoggedIn = !!localStorage.getItem("token")

  // Analytics calculations
  const calculateStats = () => {
    const totalAttempted = myAttempted.length
    const totalCreated = myQuizData.length
    const averageScore = totalAttempted > 0 
      ? myAttempted.reduce((acc, q) => acc + ((Number(q.score))  / Number(100)) * 100, 0) / totalAttempted 
      : 0
    const totalParticipants = mySetHistory.length
    const passRate = totalAttempted > 0
      ? (myAttempted.filter(q => Number(q.score) >= Number(q.passing_score)).length / totalAttempted) * 100
      : 0
    
    return { totalAttempted, totalCreated, averageScore: Math.round(averageScore), totalParticipants, passRate: Math.round(passRate) }
  }

  const stats = calculateStats()
  
  // Followers/Following counts
  const followersCount = myData?.followers?.length || 0
  const followingCount = myData?.following?.length || 0

  //fetch functions 
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      const resp = await getUserData(token)
      setmyData(resp)
      setStages(2)
    } catch (error) {
      console.log(error)
      setStages(3)
    }
  }

  const fetchOtherUserData = async () => {
    try {
      SetIsOtherDataLoading(true)
      const id = localStorage.getItem("id")
      const myQuizes = await GetQuizesByCreatorId(Number(id))
      setMyQuizData(myQuizes)
      const attempted = await fetchRecents(Number(id))
      setmyAttempted(attempted)
      const sethistorydatasheet = await GetQuizParticipantsHistory(Number(id))
      console.log(sethistorydatasheet)
      setMySetHistory(sethistorydatasheet)
      SetIsOtherDataLoading(false)
      
    } catch (error) {
      console.log(error)
      SetIsOtherDataLoading(false)
    
      setErrorMessage("Failed to load quiz data. Please check your connection.")
      setErrorModalOpen(true)
    }
  }

  const handleQuizClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setHistoryModalOpen(true)
  }

  const getQuizSpecificHistory = (quizId: number) => {
    return mySetHistory.filter(h =>Number(h.quiz_id) === quizId)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  //useEffects 
  useEffect(() => {
    if (isLoggedIn) { fetchUserData() } else {
      window.location.href = "/login"
    }
  }, [])

  useEffect(() => {
    if (stages == 2) {
      fetchOtherUserData()
    }
  }, [stages])

 



  // Error Stage
  if (stages == 3) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
        <div className={`max-w-md w-full mx-4 p-8 rounded-3xl border text-center ${isDark ? 'bg-gray-900/80 border-orange-500/20' : 'bg-white border-orange-100'}`}>
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
            <svg className={`w-10 h-10 ${isDark ? 'text-red-400' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Connection Error</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Unable to connect to the server. Please check your internet connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  // Loading Stage
  if (stages == 1) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
            <img src={logo} alt="Loading" className="absolute inset-0 m-auto w-10 h-10 animate-bounce" />
          </div>
          <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Loading your stats...</p>
        </div>
      </div>
    )
  }

  // Main Display Stage
  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-linear-to-br from-orange-50 via-white to-amber-50'}`}>
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-150 h-150 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${isDark ? 'bg-orange-600/20' : 'bg-orange-300/30'}`}></div>
        <div className={`absolute -bottom-40 -left-20 w-125 h-125 rounded-full blur-[100px] animate-pulse delay-1000 transition-colors duration-700 ${isDark ? 'bg-orange-500/10' : 'bg-amber-300/30'}`}></div>
        {isDark && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
        )}
      </div>

      <Navbar onThemeChange={setIsDark} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className={`mb-8 p-8 rounded-3xl border relative overflow-hidden ${isDark ? 'bg-linear-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20' : 'bg-linear-to-br from-orange-100 to-amber-50 border-orange-200'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Welcome back, <span className="text-orange-500">{myData?.username || 'User'}</span>! 👋
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Here's your learning journey at a glance
            </p>
          </div>
        </div>

        {/* Profile Stats - Followers & Following */}
        <div className={`mb-8 p-6 rounded-3xl border ${isDark ? 'bg-gray-900/30 border-orange-500/20' : 'bg-white border-orange-100'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-orange-500/30">
                {avatarLetter}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{myData?.username || 'User'}</h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{myData?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>@{myData?.username || 'user'}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                    {myData?.points || 0} pts
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="text-center group cursor-pointer">
                <p className={`text-3xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-600'}`}>
                  {followersCount}
                </p>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Followers</p>
              </div>
              <div className={`w-px h-12 ${isDark ? 'bg-orange-500/20' : 'bg-orange-200'}`}></div>
              <div className="text-center group cursor-pointer">
                <p className={`text-3xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-600'}`}>
                  {followingCount}
                </p>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { 
              label: 'Quizzes Attempted', 
              value: stats.totalAttempted, 
              icon: '📝',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              label: 'Quizzes Created', 
              value: stats.totalCreated, 
              icon: '🎯',
              color: 'from-orange-500 to-orange-600'
            },
            { 
              label: 'Average Score', 
              value: `${stats.averageScore}%`, 
              icon: '📊',
              color: 'from-green-500 to-green-600'
            },
            { 
              label: 'Total Verified Participants', 
              value: stats.totalParticipants, 
              icon: '👥',
              color: 'from-purple-500 to-purple-600'
            },{
              label:"Pass Rate",
              value: `${stats.passRate}%`,
              icon: '✅',
              color: 'from-teal-500 to-teal-600'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDark ? 'bg-gray-900/50 border-orange-500/20 backdrop-blur-sm' : 'bg-white border-orange-100'}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{stat.label}</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Attempted Quizzes */}
          <div className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-gray-900/30 border-orange-500/20' : 'bg-white border-orange-100'}`}>
            <div className={`p-6 border-b ${isDark ? 'border-orange-500/20' : 'border-orange-100'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Recent Attempts</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                  {myAttempted.length} total
                </span>
              </div>
            </div>
            <div className="p-6">
              {isOtherDataLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-20 rounded-xl animate-pulse ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}></div>
                  ))}
                </div>
              ) : myAttempted.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🤔</div>
                  <p className={`${isDark ? 'text-gray-400' : 'text-slate-500'}`}>No quizzes attempted yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
                  {myAttempted.slice(0, 10).map((quiz, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${isDark ? 'bg-gray-900/50 border-orange-500/10 hover:border-orange-500/30' : 'bg-slate-50 border-slate-200 hover:border-orange-300'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold truncate pr-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{quiz.quiz_name}</h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${Number(quiz.score) >= Number(quiz.passing_score) ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {Number(quiz.score) >= Number(quiz.passing_score) ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          Score: <span className={Number(quiz.score) >= Number(quiz.passing_score) ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>{quiz.score}/{quiz.passing_score}</span>
                        </span>
                        <span className={`${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          Time: {formatTime(quiz.time_taken)}
                        </span>
                        <span className={`${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                          {formatDate(quiz.date_taken)}
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-700/30 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${Number(quiz.score) >= Number(quiz.passing_score) ? 'bg-linear-to-r from-green-500 to-green-400' : 'bg-linear-to-r from-red-500 to-red-400'}`}
                          style={{ width: `${Math.min((Number(quiz.score) / Number(quiz.passing_score)) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* My Created Quizzes */}
          <div className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-gray-900/30 border-orange-500/20' : 'bg-white border-orange-100'}`}>
            <div className={`p-6 border-b ${isDark ? 'border-orange-500/20' : 'border-orange-100'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>My Quizzes</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                  {myQuizData.length} created
                </span>
              </div>
            </div>
            <div className="p-6">
              {isOtherDataLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-24 rounded-xl animate-pulse ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}></div>
                  ))}
                </div>
              ) : myQuizData.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">✨</div>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>No quizzes created yet</p>
                  <a
                    href="/create-quiz"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                  >
                    Create Your First Quiz
                  </a>
                </div>
              ) : (
                <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
                  {myQuizData.map((quiz) => (
                    <button
                      key={quiz.id}
                      onClick={() => handleQuizClick(quiz)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 hover:shadow-md group ${isDark ? 'bg-gray-900/50 border-orange-500/10 hover:border-orange-500/30' : 'bg-slate-50 border-slate-200 hover:border-orange-300'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold truncate pr-4 group-hover:text-orange-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {quiz.quiz_name}
                        </h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                          {quiz._type}
                        </span>
                      </div>
                      <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {quiz.material}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          <CircleQuestionMarkIcon className="w-4 h-4" />
                          {quiz.questions?.length || 0} Qs
                        </span>
                        <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.completed} completed
                        </span>
                        {/* <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {quiz.likes}
                        </span> */}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quiz History Modal */}
      {historyModalOpen && selectedQuiz && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setHistoryModalOpen(false)}></div>
          <div className={`relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl border shadow-2xl ${isDark ? 'bg-gray-900 border-orange-500/30' : 'bg-white border-orange-200'}`}>
            <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-orange-500/20' : 'border-orange-100'}`}>
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedQuiz.quiz_name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Quiz Performance History</p>
              </div>
              <button
                onClick={() => setHistoryModalOpen(false)}
                className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-slate-100 text-slate-500'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {(() => {
                const history = getQuizSpecificHistory(selectedQuiz.id)
                if (history.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">📭</div>
                      <p className={`${isDark ? 'text-gray-400' : 'text-slate-500'}`}>No participants yet</p>
                    </div>
                  )
                }
                
                const averageScore = history.reduce((acc, h) => acc + h.score, 0) / history.length
                // const bestScore = Math.max(...history.map(h => h.score))
                const passCount = history.filter(h => Number(h.score) >= Number(selectedQuiz.passingScore)).length
                
                return (
                  <div className="space-y-6">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}`}>
                        <p className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{history.length}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Participants</p>
                      </div>
                      <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                        <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{Math.round(averageScore)}%</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Avg Score</p>
                      </div>
                      <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                        <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{Math.round((passCount / history.length) * 100)}%</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Pass Rate</p>
                      </div>
                    </div>

                    {/* Participants List */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Top Performers</h4>
                      <div className="space-y-3">
                        {history
                          .sort((a, b) => b.score - a.score)
                          .slice(0, 10)
                          .map((participant, idx) => {
                     
                            return (
                              <div
                                key={idx}
                                className={`flex items-center justify-between p-4 rounded-xl border ${isDark ? 'bg-gray-900/50 border-orange-500/10' : 'bg-slate-50 border-slate-200'}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx === 0 ? 'bg-yellow-500 text-white' : idx === 1 ? 'bg-gray-400 text-white' : idx === 2 ? 'bg-orange-600 text-white' : isDark ? 'bg-gray-800 text-gray-400' : 'bg-slate-200 text-slate-600'}`}>
                                    {idx + 1}
                                  </div>
                                  <div>
                                    <button
                                     
                                      className={`font-medium transition-all text-white 'blur-sm hover:blur-none cursor-pointer'}`}
                                      onClick={() => alert(`User ID: ${participant.user_id}`)}
                                    >
                                      {"User0" + participant.user_id}
                                    </button>
                                   
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`font-bold ${participant.score >= Number(selectedQuiz.passingScore) ? 'text-green-500' : 'text-red-500'}`}>
                                    {participant.score}%
                                  </p>
                                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{formatTime(participant.time_taken)}</p>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}

    

      {/* Error Modal */}
      {errorModalOpen && (
        <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setErrorModalOpen(false)}></div>
          <div className={`relative w-full max-w-md p-6 rounded-3xl border ${isDark ? 'bg-gray-900 border-red-500/30' : 'bg-white border-red-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-red-500/20' : 'bg-red-100'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Error</h3>
            </div>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{errorMessage}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setErrorModalOpen(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setErrorModalOpen(false)
                  fetchOtherUserData()
                }}
                className="flex-1 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

  
    </div>
  )
}