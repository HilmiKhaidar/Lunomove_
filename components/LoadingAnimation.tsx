'use client'

import { useEffect, useState } from 'react'
import { Activity, Heart } from 'lucide-react'

interface LoadingAnimationProps {
  onComplete: () => void
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    // Show logo after initial delay
    const logoTimer = setTimeout(() => setShowLogo(true), 300)

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => {
      clearTimeout(logoTimer)
      clearInterval(progressTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-mint-500 via-teal-500 to-mint-600 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="relative">
            {/* Main Logo */}
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 mx-auto border border-white/30">
              <div className="relative">
                <Heart className="w-12 h-12 text-white animate-pulse" />
                <Activity className="w-6 h-6 text-white/80 absolute -bottom-1 -right-1 animate-bounce" />
              </div>
            </div>
            
            {/* Brand Name */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                LUNOMOVE
              </h1>
              <p className="text-white/80 text-lg font-medium">
                by Lunetix
              </p>
              <p className="text-white/70 text-sm">
                Kesadaran gerakan dalam setiap hari
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-3">
            Memuat aplikasi... {progress}%
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}