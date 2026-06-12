import { useEffect,useState } from "react"
import {followUser} from "../lib/quiz";
import { useSearchParams } from "react-router-dom";
import { getOtherPlayerDataById, getUserData } from "../lib/auth";
import { GetQuizesByCreatorId } from "../lib/quiz";
import { CircleQuestionMark, UsersRoundIcon } from "lucide-react";
import SEO from "./seo";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";



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




export default function PlayerInfo(){

    const [playerQuizes , setPlayerQuiz ] = useState<Quiz[]>([])
    const [PlayerData,setPlayerData] = useState<User>()
 
    const [isLoading,setIsLoading] = useState<1 | 2 | 3>(1)
    
         
             const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('theme');
          return savedTheme === 'dark' || 
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
      })

      
    
    // Follow state
    const [isFollowing, setIsFollowing] = useState(false)
    const [followLoading, setFollowLoading] = useState(false)
    const [userFollowsyou,setUserFollowsYou] = useState(false)
    const currentUserId = localStorage.getItem("id")

     

    const [searchparams] = useSearchParams()
    const  id = searchparams.get("id")
    
    const isOwnProfile = currentUserId === id
    const isLoggedIn = localStorage.getItem("id")


    const fetchUserdata = async()=>{
        try {
            setIsLoading(1)
            const resp = await getOtherPlayerDataById(Number(id))
            const token = localStorage.getItem("token")
            await getUserData(token)
      const idd= localStorage.getItem("id")
        console.log(resp)
            resp.followers?.find(((foid:any) => foid == idd)) && setIsFollowing(true)
            resp.following?.find(((foid:any) => foid == idd)) && setUserFollowsYou(true)

           
            setPlayerData(resp)
            setIsLoading(2)


        } catch (error) {
            console.log(error)
        }
    }


     const fetchUserQuiz = async()=>{
        try {
            setIsLoading(2)
            const resp = await GetQuizesByCreatorId(Number(id))
            setPlayerQuiz(resp)
            setIsLoading(3)


        } catch (error) {
            console.log(error)
        }
    }
    
    // Check follow status
  
    
    // Handle follow/unfollow
    const handleFollowToggle = async () => {
        if (!currentUserId || !id || followLoading) return
        
        setFollowLoading(true)
        if(isFollowing) return
        try {
          
                await followUser(Number(currentUserId), Number(id))
                setIsFollowing(true)
                setPlayerData(prev => prev ? {
                    ...prev,
                    followers: prev.followers ? [...prev.followers, Number(currentUserId)] : [Number(currentUserId)]
                } : prev)

              
            
        } catch (error) {
            console.log(error)
        } finally {
            setFollowLoading(false)
        }
    }


    useEffect(()=>{
      fetchUserdata()

    },[])
    useEffect(()=>{
        if(isLoading == 2){
             fetchUserQuiz()
        }
    },[isLoading])
    
  
    return (
        <>
         <SEO
        title={PlayerData?.username as string || "Player Info"} 
        description={PlayerData !== null ? `Followers ${PlayerData?.followers?.length}` : `Player info`} 
      />
                       <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f8f9fa]'}`}>
      {/* Subtle Background - Professional & Mature */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-0 left-1/4 w-125 h-125 bg-orange-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-orange-500/3 rounded-full blur-[100px]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-125 h-125 bg-orange-200/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-amber-100/40 rounded-full blur-[100px]"></div>
          </>
        )}
      </div>

    
    <Navbar onThemeChange={setIsDark} />

   


      <main className="relative z-10 mx-auto max-w-3xl px-0 sm:px-4 py-4">
        {/* Compact Profile Header - TikTok Style */}
        <div className={`px-4 py-5 border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
          {isLoading === 1 ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : PlayerData ? (
            <div className="flex items-center gap-4">
             
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {(PlayerData.username || `User${PlayerData.id}`).charAt(0).toUpperCase()}
                </div>
                {Number(PlayerData.points) > 0 && (
                  <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${isDark ? 'bg-orange-500 text-white border-orange-400' : 'bg-orange-500 text-white border-white'}`}>
                    {PlayerData.points?.toLocaleString()}
                  </div>
                )}
              </div>
              
              {/* Compact User Info */}
              <div className="flex-1 min-w-0">
                <h1 className={`text-lg font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {PlayerData.username || `User${PlayerData.id}`}
                </h1>
                <p className={`text-xs mb-2 truncate ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {PlayerData.email || 'No email provided'}
                </p>
                
                {/* Compact Stats */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {PlayerData.followers?.length || 0}
                    </span>
                    <span className={isDark ? 'text-gray-500' : 'text-slate-400'}>Followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {PlayerData.following?.length || 0}
                    </span>
                    <span className={isDark ? 'text-gray-500' : 'text-slate-400'}>Following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {playerQuizes.length}
                    </span>
                    <span className={isDark ? 'text-gray-500' : 'text-slate-400'}>Quizzes</span>
                  </div>

                   
                    {userFollowsyou && (
      <span className={`
        px-2 py-0.5 rounded-full text-[10px] font-medium
        ${isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'}
      `}>
        Follows You
      </span>
    )}
             
                </div>

              </div>
              
              {/* Compact Follow Button */}
              {!isOwnProfile && isLoggedIn && (
                <div className="shrink-0">
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`
                      px-5 py-1.5 rounded-full text-xs font-semibold
                      transition-all duration-200 active:scale-95
                      ${isFollowing 
                        ? (isDark 
                            ? 'bg-transparent border border-white/30 text-white hover:border-white/60' 
                            : 'bg-transparent border border-slate-300 text-slate-700 hover:border-slate-400')
                        : (isDark 
                            ? 'bg-white text-black hover:bg-white/90' 
                            : 'bg-slate-900 text-white hover:bg-slate-800')
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {followLoading ? (
                      <span className="flex items-center gap-1">
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    ) : isFollowing ? (
                      'Following'
                    ) : (
                      'Follow'
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={`text-center py-8 text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              User not found
            </div>
          )}
        </div>
        
       {isLoading === 2 ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : playerQuizes.length > 0 ? (
          <div className="px-2 py-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Created Quizzes
              </h2>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {playerQuizes.length} total
              </span>
            </div>
            
            {/* Grid Container - 2 cols mobile, 2 cols sm, 3 cols lg */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {playerQuizes.map((quiz, index) => (
                <a
                  key={quiz.id}
                  href={`/join-quiz?id=${quiz.id}`}
                  className={`
                    group relative flex flex-col
                    rounded-xl sm:rounded-2xl overflow-hidden
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:-translate-y-1
                    ${isDark 
                      ? 'bg-white/3 border border-white/10 hover:border-orange-500/30 hover:bg-white/5' 
                      : 'bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Header - Color coded by type */}
                  <div className={`
                    h-1.5 sm:h-2 w-full
                    ${quiz._type === 'MCQ' 
                      ? 'bg-linear-to-r from-blue-500 to-blue-600' 
                      : quiz._type === 'TOF'
                      ? 'bg-linear-to-r from-purple-500 to-purple-600'
                      : 'bg-linear-to-r from-emerald-500 to-emerald-600'
                    }
                  `}></div>
                  
                  {/* Card Content */}
                  <div className="p-2.5 sm:p-4 flex flex-col gap-2 sm:gap-3">
                    {/* Top Row: Type Badge & Reward */}
                    <div className="flex items-center justify-between gap-1">
                      <span className={`
                        px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold uppercase tracking-wider
                        ${quiz._type === 'MCQ' 
                          ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700')
                          : quiz._type === 'TOF'
                          ? (isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700')
                          : (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
                        }
                      `}>
                        {quiz._type}
                      </span>
                      
                      {quiz.reward > 0 && (
                        <span className={`
                          flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold
                          ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'}
                        `}>
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          +{quiz.reward}
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className={`
                      font-bold text-xs sm:text-base leading-tight line-clamp-2 min-h-8 sm:min-h-10
                      transition-colors duration-200
                      ${isDark ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-600'}
                    `}>
                      {quiz.quiz_name}
                    </h3>
                    
                    {/* Material Preview - Hidden on mobile */}
                    {quiz.material && (
                      <p className={`
                        hidden sm:block text-xs line-clamp-2 leading-relaxed
                        ${isDark ? 'text-gray-400' : 'text-slate-500'}
                      `}>
                        {quiz.material}
                      </p>
                    )}
                    
                    {/* Stats Row */}
                    <div className={`
                      flex items-center gap-2 sm:gap-4 pt-2 sm:pt-3 mt-auto
                      border-t ${isDark ? 'border-white/5' : 'border-slate-100'}
                    `}>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <CircleQuestionMark className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                        <span className={`text-[10px] sm:text-xs font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                          {quiz.questions?.length || 0}
                        </span>
                      </div>
                      
                      {quiz.isTimed === 1 && (
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <svg className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className={`text-[10px] sm:text-xs font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {quiz.duration}m
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
                        <UsersRoundIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                        <span className={`text-[10px] sm:text-xs font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                          {quiz.completed || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Action Overlay */}
                  <div className={`
                    absolute inset-0 flex items-center justify-center gap-2
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    ${isDark ? 'bg-black/60' : 'bg-slate-900/60'}
                    backdrop-blur-sm
                  `}>
                    <span className={`
                      px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold
                      transform translate-y-2 group-hover:translate-y-0
                      transition-transform duration-300 delay-75
                      ${isDark ? 'bg-white text-black' : 'bg-white text-slate-900'}
                    `}>
                      Take Quiz
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className={`
              w-16 h-16 mb-4 rounded-2xl flex items-center justify-center
              ${isDark ? 'bg-white/5' : 'bg-slate-100'}
            `}>
              <svg className={`w-8 h-8 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              No quizzes yet
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
              This user hasn't created any quizzes yet.
            </p>
          </div>
        )}


      </main>


      <div className="h-112.5 md:h-32" ></div>
       <Footer isDark={isDark} />
 
     
      </div>
      

      
         </>
    )
}


