import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Users, Trophy, Heart, Play, BookOpen, Grid, X,
  Type, Target, Plus, Bookmark, Clock, CircleQuestionMark,
  Sparkles, TrendingUp, ChevronLeft, ChevronRight, Loader2
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

interface ApiResponse {
  data: Quiz[];
  hasMore: boolean;
}

const AnimatedBackground = ({ isDark }: { isDark: boolean }) => (
  <div className={`fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
    <div className={`absolute inset-0 ${isDark ? 'bg-slate-900/30' : 'bg-white'}`} />
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
      case "MCQ": return "Multiple Choice";
      case "TOF": return "True / False";
      case "SAQ": return "Short Answer";
    }
  };

  const getTypeColor = (type: QuizType) => {
    switch(type) {
      case "MCQ": return "bg-blue-100 text-blue-700 border-blue-200";
      case "TOF": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "SAQ": return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  const TypeIcon = getTypeIcon(quiz._type);
  const isNew = Date.now() - Number(quiz.time_posted) < 86400000;
  const passRate = quiz.completed > 0 ? Math.round((quiz.passed / quiz.completed) * 100) : 0;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group h-full"
    >
      <div 
        onClick={onPlay}
        className={`relative h-full flex flex-col rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg ${
          isDark 
            ? 'bg-slate-900 border-slate-800 hover:border-orange-500/50' 
            : 'bg-white border-gray-200 hover:border-orange-300'
        }`}
      >
        <div className={`h-1 w-full ${quiz.reward > 0 ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'}`} />

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 ${getTypeColor(quiz._type)}`}>
              <TypeIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {quiz.reward > 0 && (
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border ${isDark ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-orange-50 border-orange-200 text-orange-600'}`}>
                  <Trophy className="w-3.5 h-3.5" />
                  {quiz.reward} pts
                </span>
              )}
              {isNew && (
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                  New
                </span>
              )}
            </div>
          </div>

          <h3 className={`font-bold text-base leading-snug mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {quiz.quiz_name}
          </h3>

          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            by <span className="font-medium">{quiz.creator_id}</span>
          </p>

          {quiz.quiz_tags && quiz.quiz_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {quiz.quiz_tags.slice(0, 3).map((tag, i) => (
                <span key={i} className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-slate-600'}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto grid grid-cols-2 gap-3 mb-4">
            <div className={`p-2.5 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <Users className="w-3.5 h-3.5 text-orange-500" />
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Played</span>
              </div>
              <p className="font-bold text-sm">{formatNumber(quiz.completed)}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <CircleQuestionMark className="w-3.5 h-3.5 text-blue-500" />
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Questions</span>
              </div>
              <p className="font-bold text-sm">{quiz.questions?.length || 0}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Pass Rate</span>
              </div>
              <p className="font-bold text-sm">{passRate}%</p>
            </div>
            <div className={`p-2.5 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Likes</span>
              </div>
              <p className="font-bold text-sm">{formatNumber(quiz.likes)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-dashed ${isDark ? 'border-slate-800' : 'border-gray-200'}">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${getTypeColor(quiz._type)}`}>
              {getTypeLabel(quiz._type)}
            </span>
            {quiz.isTimed === 1 && (
              <span className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Clock className="w-3.5 h-3.5" />
                {quiz.duration} min
              </span>
            )}
          </div>
        </div>

        <div className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 ${
          isDark ? 'bg-slate-950/90' : 'bg-white/95'
        } opacity-0 group-hover:opacity-100 backdrop-blur-sm`}>
          <div className="space-y-3">
            <button onClick={onPlay} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Start Quiz
            </button>
            <div className="flex gap-2">
              <button onClick={onSave} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors flex items-center justify-center gap-2 ${
                isSaved ? 'bg-amber-50 border-amber-200 text-amber-600' : isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-slate-600 hover:bg-gray-50'
              }`}>
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button onClick={onLike} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors flex items-center justify-center gap-2 ${
                isLiked ? 'bg-rose-50 border-rose-200 text-rose-600' : isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-slate-600 hover:bg-gray-50'
              }`}>
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Pagination Buttons Component
const Pagination = ({
  currentPage,
  hasMore,
  isDark,
  onPageChange,
  loading
}: {
  currentPage: number;
  hasMore: boolean;
  isDark: boolean;
  onPageChange: (page: number) => void;
  loading: boolean;
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (currentPage > 2) pages.push(1);
    if (currentPage > 3) pages.push('...');
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (hasMore) pages.push(currentPage + 1);
    if (hasMore && currentPage === 1) pages.push(currentPage + 2);
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
        className={`p-2.5 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600' 
            : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, idx) => (
          <div key={idx}>
            {page === '...' ? (
              <span className={`px-3 py-2 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                disabled={loading}
                className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  currentPage === page
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : isDark 
                      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600' 
                      : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore || loading}
        className={`p-2.5 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600' 
            : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
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

  // URL state
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<QuizType | "All">("All");
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "popular" | "reward">("trending");
  const [showFilters, setShowFilters] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState<number[]>([]);
  const [likedQuizzes, setLikedQuizzes] = useState<number[]>([]);
  
  // Data state - now properly typed for { data, hasMore }
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Science", "History", "Technology", "Sports", "Arts", "Geography", "Math", "Language"];
  const types: { value: QuizType | "All"; label: string }[] = [
    { value: "All", label: "All Types" },
    { value: "MCQ", label: "Multiple Choice" },
    { value: "TOF", label: "True / False" },
    { value: "SAQ", label: "Short Answer" },
  ];

  // Update URL page param
  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) newParams.set('page', page.toString());
    else newParams.delete('page');
    setSearchParams(newParams, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch data - properly handles { data, hasMore }
  const fetchData = useCallback(async (page: number) => {
    if (loading) return;
    
    try {
      setLoading(true);
      
      let response: ApiResponse;
      
      if (searchQuery.trim()) {
        response = await fetchSearchByQuery(searchQuery, page);
      } else {
        response = await fetchRandomQuizzes(page);
      }
      
      // Properly destructure the response
      setQuizzes(response.data);
      setHasMore(response.hasMore);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [searchQuery, loading]);

  // Fetch when page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  // Search debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        goToPage(1);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Client-side filtering and sorting (on current page data only)
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
      <SEO title="Explore Quizzes" description="Discover and play quizzes" />
      <Navbar onThemeChange={setIsDark} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-orange-500/10' : 'bg-orange-100'}`}>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Explore Quizzes
            </h1>
          </div>
          <p className={`text-sm ml-13 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Discover quizzes from the community
          </p>
        </div>

        {/* Search & Filters */}
        <div className={`mb-8 p-5 rounded-2xl border-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className={`flex-1 flex items-center rounded-xl border-2 px-4 py-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
              <Search className={`w-5 h-5 mr-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quizzes, creators, or tags..."
                className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'}`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden px-4 py-3 rounded-xl border-2 font-medium flex items-center justify-center gap-2 ${isDark ? 'border-slate-700 text-slate-300' : 'border-gray-200 text-slate-700'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 text-sm outline-none cursor-pointer ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-gray-50 border-gray-200 text-slate-700'}`}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as QuizType | "All")}
                className={`px-4 py-3 rounded-xl border-2 text-sm outline-none cursor-pointer ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-gray-50 border-gray-200 text-slate-700'}`}>
                {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-4 py-3 rounded-xl border-2 text-sm outline-none cursor-pointer ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-gray-50 border-gray-200 text-slate-700'}`}>
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Played</option>
                <option value="reward">Highest Reward</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-4 pt-4 border-t grid grid-cols-2 gap-2">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-gray-50 border-gray-200 text-slate-700'}`}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as QuizType | "All")}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-gray-50 border-gray-200 text-slate-700'}`}>
                  {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                  className={`px-3 py-2 rounded-lg border text-sm col-span-2 ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-gray-50 border-gray-200 text-slate-700'}`}>
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Played</option>
                  <option value="reward">Highest Reward</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active filters */}
        <div className="flex items-center justify-between mb-6">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Showing <span className="font-semibold text-orange-500">{filteredQuizzes.length}</span> quizzes
            <span className="ml-2 text-xs">Page {currentPage}</span>
          </p>
          <div className="flex gap-2">
            {selectedCategory !== "All" && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-gray-100 border-gray-200 text-slate-700'}`}>
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}><X className="w-3 h-3 hover:text-rose-500" /></button>
              </span>
            )}
            {selectedType !== "All" && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-gray-100 border-gray-200 text-slate-700'}`}>
                {types.find(t => t.value === selectedType)?.label}
                <button onClick={() => setSelectedType("All")}><X className="w-3 h-3 hover:text-rose-500" /></button>
              </span>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && quizzes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Loading quizzes...</p>
          </div>
        )}

        {/* Quiz Grid */}
        {!loading && filteredQuizzes.length === 0 ? (
          <div className="text-center py-20">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
              <Search className={`w-10 h-10 ${isDark ? 'text-slate-700' : 'text-slate-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>No quizzes found</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {/* Pagination Buttons */}
            <Pagination
              currentPage={currentPage}
              hasMore={hasMore}
              isDark={isDark}
              onPageChange={goToPage}
              loading={loading}
            />
          </>
        )}
      </main>

      <Footer isDark={isDark} />
      
      <button onClick={() => navigate('/create-quiz')}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40 bg-orange-500 text-white">
        <Plus className="w-6 h-6" />
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