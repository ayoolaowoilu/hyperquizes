// components/PageLoader.tsx
import { useEffect, useState } from "react"

export default function PageLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 30
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-9999 bg-white dark:bg-slate-950 flex flex-col items-center justify-center">
      {/* Logo or brand mark */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-orange-500 rounded-xl animate-pulse" />
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        Loading...
      </p>
    </div>
  )
}