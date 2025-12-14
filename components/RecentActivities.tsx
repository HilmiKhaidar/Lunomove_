'use client'

import { Clock, MessageSquare, User, Zap, Home, Music, Flower, Play, Sparkles, Sprout, ArrowUp } from 'lucide-react'

interface Movement {
  id: string
  type: string
  duration: number
  notes: string
  timestamp: Date
}

interface RecentActivitiesProps {
  movements: Movement[]
}

const movementLabels: { [key: string]: { label: string; icon: any; color: string } } = {
  walking: { label: 'Berjalan', icon: User, color: 'text-blue-500' },
  stretching: { label: 'Peregangan', icon: Zap, color: 'text-purple-500' },
  stairs: { label: 'Naik Tangga', icon: ArrowUp, color: 'text-orange-500' },
  housework: { label: 'Pekerjaan Rumah', icon: Home, color: 'text-green-500' },
  dancing: { label: 'Menari', icon: Music, color: 'text-pink-500' },
  gardening: { label: 'Berkebun', icon: Flower, color: 'text-emerald-500' },
  playing: { label: 'Bermain', icon: Play, color: 'text-red-500' },
  other: { label: 'Lainnya', icon: Sparkles, color: 'text-gray-500' }
}

export default function RecentActivities({ movements }: RecentActivitiesProps) {
  const recentMovements = movements.slice(0, 5)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Hari ini'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kemarin'
    } else {
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
      })
    }
  }

  if (recentMovements.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 px-1">
          Aktivitas Terbaru
        </h3>
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Sprout className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                Belum ada aktivitas tercatat
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Mulai dengan mencatat gerakan pertama Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 px-1">
        Aktivitas Terbaru
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {recentMovements.map((movement) => {
          const movementInfo = movementLabels[movement.type] || movementLabels.other
          
          return (
            <div key={movement.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-3 bg-gray-50 rounded-xl flex-shrink-0">
                  <movementInfo.icon className={`w-5 h-5 ${movementInfo.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm sm:text-base font-medium text-gray-800">
                      {movementInfo.label}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{movement.duration} menit</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {formatDate(movement.timestamp)} • {formatTime(movement.timestamp)}
                    </span>
                  </div>

                  {movement.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {movement.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {movements.length > 5 && (
        <div className="text-center py-2">
          <button className="text-sm sm:text-base text-mint-600 hover:text-mint-700 font-medium transition-colors">
            Lihat semua aktivitas
          </button>
        </div>
      )}
    </div>
  )
}