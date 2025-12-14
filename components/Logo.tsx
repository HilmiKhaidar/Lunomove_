'use client'

import { Heart, Activity } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      heart: 'w-4 h-4',
      activity: 'w-2 h-2',
      text: 'text-lg',
      subtitle: 'text-xs'
    },
    md: {
      container: 'w-12 h-12',
      heart: 'w-6 h-6',
      activity: 'w-3 h-3',
      text: 'text-xl',
      subtitle: 'text-sm'
    },
    lg: {
      container: 'w-16 h-16',
      heart: 'w-8 h-8',
      activity: 'w-4 h-4',
      text: 'text-2xl',
      subtitle: 'text-base'
    }
  }

  const currentSize = sizes[size]

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${currentSize.container} bg-gradient-to-br from-mint-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg`}>
        <div className="relative">
          <Heart className={`${currentSize.heart} text-white`} />
          <Activity className={`${currentSize.activity} text-white/80 absolute -bottom-0.5 -right-0.5`} />
        </div>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div>
          <h1 className={`${currentSize.text} font-bold text-gray-800 tracking-tight`}>
            LUNOMOVE
          </h1>
          <p className={`${currentSize.subtitle} text-gray-500 font-medium`}>
            by Lunetix
          </p>
        </div>
      )}
    </div>
  )
}