import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  Filter,
  Users,
  Trophy,
  Heart,
  Play,
  BookOpen,
  Grid,
  X,
  Type,
  Target,
  Plus,
  Bookmark,
  Clock,
  CircleQuestionMark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchRandomQuizzes, fetchSearchByQuery } from "../../lib/quiz";
import SEO from "../seo";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

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

interface PaginatedResponse {
  data: Quiz[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

const AnimatedBackground = ({ isDark }: { isDark: boolean }) => (
  <div className={`fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
    <div className={`absolute inset-0 ${isDark ? 'bg-slate-900/50' : 'bg-white'}`} />
    <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-40'}`} 
         style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
  </div>
);

const QuizCard = ({
  quiz,
  index,
  isDark,
  isSaved,
  isLiked,
  onSave,
  onLike,
  onPlay
}: {
  quiz: Quiz;
  index: number;
  isDark: boolean;
  isSaved: boolean;
  isLiked: boolean;
  onSave: (e: React.MouseEvent) => void;
  onLike: (e: React.MouseEvent) => void;
  onPlay: () => void;
}) => {
  const getTypeIcon = (type: QuizType) => {
    switch(type) {
      case "MCQ": return Grid;
      case "TOF": return Target;
      case "SAQ": return Type;
      default: return BookOpen;
    }
  };

  const getTypeLabel = (type: QuizType) => {
    switch(type) {
      case "MCQ": return "MCQ";
      case "TOF": return "T/F";
      case "SAQ": return "Short";
    }
  };

  const TypeIcon = getTypeIcon(quiz._type);
  const isNew = Date.now() - Number(quiz.time_posted) < 86400000;

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
      className="group"
    >
      <div 
        onClick={onPlay}
        className={`relative flex flex-col rounded-lg border transition-all duration-200 cursor-pointer h-full ${
          isDark 
            ? 'bg-slate-900/80 border-slate-700 hover:border-slate-500' 
            : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm'
        }`}
      >
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
            }`}>
              <TypeIcon className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              {quiz.reward > 0 && (
                <span className={`px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1 ${
                  isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-100 text-amber-700'
                }`}>
                  <Trophy className="w-3 h-3" />
                  {quiz.reward}
                </span>
              )}
              {isNew && (
                <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                  isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  New
                </span>
              )}
            </div>
          </div>

          <h3 className={`font-semibold text-sm leading-snug mb-2 line-clamp-2 ${
            isDark ? 'text-slate-200 group-hover:text-slate-100' : 'text-slate-800 group-hover:text-slate-900'
          } transition-colors`}>
            {quiz.quiz_name}
          </h3>

          <p className={`text-xs mb-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            by {quiz.creator_id}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {quiz.quiz_tags?.slice(0, 2).map((tag, i) => (
              <span key={i} className={`px-2 py-0.5 rounded text-[10px] ${
                isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                <Users className="w-3.5 h-3.5" />
                {formatNumber(quiz.completed)}
              </span>
              <span className={`flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                <CircleQuestionMark className="w-3.5 h-3.5" />
                {formatNumber(quiz.questions?.length || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
              }`}>
                {getTypeLabel(quiz._type)}
              </span>
              {quiz.isTimed === 1 && (
                <span className={`flex items-center gap-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  <Clock className="w-3.5 h-3.5" />
                  {quiz.duration}m
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`absolute inset-x-0 bottom-0 p-3 bg-linear-to-t ${
          isDark ? 'from-slate-900 via-slate-900/95' : 'from-white via-white/95'
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between`}>
          <div className="flex gap-1">
            <button
              onClick={onSave}
              className={`p-2 rounded-md transition-colors ${
                isSaved 
                  ? 'text-amber-500' 
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={onLike}
              className={`p-2 rounded-md transition-colors ${
                isLiked 
                  ? 'text-rose-500' 
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>
          <button className={`px-4 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 ${
            isDark 
              ? 'bg-slate-100 text-slate-900 hover:bg-white' 
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}>
            <Play className="w-3.5 h-3.5" />
            Play
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Explore() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  // Pagination state from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<QuizType | "All">("All");
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "popular" | "reward">("trending");
  const [showFilters, setShowFilters] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState<number[]>([]);
  const [likedQuizzes, setLikedQuizzes] = useState<number[]>([]);
  
  // Pagination data
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ["All", "Science", "History", "Technology", "Sports", "Arts", "Geography", "Math", "Language"];
  const types: { value: QuizType | "All"; label: string }[] = [
    { value: "All", label: "All Types" },
    { value: "MCQ", label: "Multiple Choice" },
    { value: "TOF", label: "True / False" },
    { value: "SAQ", label: "Short Answer" },
  ];

  // Update URL when page changes
  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newParams.set('page', page.toString());
    } else {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  // Fetch data with pagination
  const fetchData = useCallback(async (page: number, isNewSearch = false) => {
    try {
      setLoading(true);
      
      let response: PaginatedResponse;
      
      if (searchQuery.trim()) {
        response = await fetchSearchByQuery(searchQuery, page);
      } else {
        response = await fetchRandomQuizzes(page);
      }
      
      if (isNewSearch) {
        setQuizzes(response.data);
      } else {
        setQuizzes(prev => {
         
          const existingIds = new Set(prev.map(q => q.id));
          const newQuizzes = response.data.filter(q => !existingIds.has(q.id));
          return [...prev, ...newQuizzes];
        });
      }
      
      setHasMore(response.hasMore);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [searchQuery]);

  // Load initial data or when page changes via URL
  useEffect(() => {
    fetchData(currentPage, currentPage === 1);
  }, [currentPage, fetchData]);

  // Search handler
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      goToPage(1);
      return;
    }
    goToPage(1);
    await fetchData(1, true);
  }, [searchQuery, fetchData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery, handleSearch]);

  // Load more (next page)
  const loadMore = () => {
    if (!loading && hasMore) {
      goToPage(currentPage + 1);
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const filteredQuizzes = useMemo(() => {
    let result = [...quizzes];
    
    if (selectedCategory !== "All") {
      result = result.filter(q => q.quiz_tags?.includes(selectedCategory));
    }
    
    if (selectedType !== "All") {
      result = result.filter(q => q._type === selectedType);
    }
    
    switch (sortBy) {
      case "trending":
        result.sort((a, b) => (b.views + b.likes * 2) - (a.views + a.likes * 2));
        break;
      case "newest":
        result.sort((a, b) => Number(b.time_posted) - Number(a.time_posted));
        break;
      case "popular":
        result.sort((a, b) => b.completed - a.completed);
        break;
      case "reward":
        result.sort((a, b) => b.reward - a.reward);
        break;
    }
    
    return result;
  }, [quizzes, selectedCategory, selectedType, sortBy]);

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedQuizzes(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedQuizzes(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const navigateToQuiz = (id: number) => {
    navigate(`/join-quiz?id=${id}`);
  };

  return (
    <div className={`min-h-screen relative ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
      <AnimatedBackground isDark={isDark} />
      <SEO title="Explore Popular Quizzes" description="discover Popular quizzes" />
      <Navbar onThemeChange={setIsDark} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-2xl font-semibold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Explore Quizzes
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Discover and play quizzes from the community
          </p>
        </div>

        {/* Search & Filters */}
        <div className={`mb-6 p-4 rounded-lg border ${
          isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className={`flex-1 flex items-center rounded-md border px-3 py-2.5 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Search className={`w-4 h-4 mr-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quizzes, creators, or tags..."
                className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-slate-200 placeholder-slate-600' : 'text-slate-800 placeholder-slate-400'}`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className={`p-1 rounded ${isDark ? 'text-slate-500 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-200'}`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden px-4 py-2.5 rounded-md border text-sm font-medium flex items-center justify-center gap-2 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2.5 rounded-md border text-sm outline-none cursor-pointer ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as QuizType | "All")}
                className={`px-3 py-2.5 rounded-md border text-sm outline-none cursor-pointer ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {types.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-3 py-2.5 rounded-md border text-sm outline-none cursor-pointer ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Played</option>
                <option value="reward">Highest Reward</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-3 pt-3 border-t grid grid-cols-2 gap-2"
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 py-2 rounded-md border text-sm ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as QuizType | "All")}
                  className={`px-3 py-2 rounded-md border text-sm ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                >
                  {types.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={`px-3 py-2 rounded-md border text-sm col-span-2 ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                >
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Played</option>
                  <option value="reward">Highest Reward</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-4">
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Showing <span className="font-medium text-slate-700">{filteredQuizzes.length}</span> quizzes
            {totalPages > 1 && <span className="ml-1">• Page {currentPage} of {totalPages}</span>}
          </p>
          <div className="flex gap-2">
            {selectedCategory !== "All" && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${
                isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedType !== "All" && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${
                isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {types.find(t => t.value === selectedType)?.label}
                <button onClick={() => setSelectedType("All")} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        </div>

        {/* Quiz Grid */}
        {filteredQuizzes.length === 0 && !loading ? (
          <div className="text-center py-16">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <Search className={`w-8 h-8 ${isDark ? 'text-slate-700' : 'text-slate-400'}`} />
            </div>
            <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>No quizzes found</h3>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredQuizzes.map((quiz, index) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    index={index}
                    isDark={isDark}
                    isSaved={savedQuizzes.includes(quiz.id)}
                    isLiked={likedQuizzes.includes(quiz.id)}
                    onSave={(e) => toggleSave(quiz.id, e)}
                    onLike={(e) => toggleLike(quiz.id, e)}
                    onPlay={() => navigateToQuiz(quiz.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            <div className="mt-10 flex flex-col items-center gap-4">
              {loading && (
                <div className="flex items-center justify-center py-6">
                  <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}

              {hasMore && !loading && (
                <button
                  onClick={loadMore}
                  className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border ${
                    isDark 
                      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  Load More
                </button>
              )}

              {/* Page Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`p-2 rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark 
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' 
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <span className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={!hasMore}
                    className={`p-2 rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark 
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' 
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Footer isDark={isDark} />
      <button
        onClick={() => navigate('/create-quiz')}
        className={`fixed bottom-6 right-6 lg:hidden w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40 ${
          isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-900 text-white'
        }`}
      >
        <Plus className="w-5 h-5" />
      </button>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}