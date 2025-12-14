'use client'

import { Activity, Calendar, Clock, CheckCircle, TrendingUp } from 'lucide-react'

interface Movement {
  id: string
  type: string
  duration: number
  notes: string
  timestamp: Date
}

interface DashboardStatsProps {
  movements: Movement[]
}

export default function DashboardStats({ movements }: DashboardStatsProps) {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())

  // Today's stats
  const todayMovements = movements.filter(m => 
    m.timestamp.toDateString() === today.toDateString()
  )
  const todayDuration = todayMovements.reduce((sum, m) => sum + m.duration, 0)
  const todayCount = todayMovements.length

  // This week's stats
  const weekMovements = movements.filter(m => m.timestamp >= startOfWeek)
  const weekDuration = weekMovements.reduce((sum, m) => sum + m.duration, 0)
  const activeDays = new Set(weekMovements.map(m => m.timestamp.toDateString())).size

  // Streak calculation
  let streak = 0
  const checkDate = new Date(today)
  while (true) {
    const dayMovements = movements.filter(m => 
      m.timestamp.toDateString() === checkDate.toDateString()
    )
    if (dayMovements.length > 0) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  const stats = [
    {
      icon: Activity,
      label: 'Hari Ini',
      value: `${todayCount} gerakan`,
      subtitle: `${todayDuration} menit`,
      color: 'text-mint-500'
    },
    {
      icon: Calendar,
      label: 'Minggu Ini',
      value: `${activeDays} hari aktif`,
      subtitle: `${weekDuration} menit total`,
      color: 'text-teal-500'
    },
    {
      icon: Clock,
      label: 'Konsistensi',
      value: `${streak} hari`,
      subtitle: streak > 0 ? 'berturut-turut' : 'mulai hari ini',
      color: 'text-energy'
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 px-1">
        Ringkasan Gerakan
      </h3>
      
      <div className="grid gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-brand p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className={`p-2 sm:p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</span>
                </div>
                <div className="mt-1 sm:mt-2">
                  <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </span>
                  {stat.subtitle && (
                    <div className="mt-1">
                      <span className="text-sm sm:text-base text-gray-500 block sm:inline sm:ml-2">
                        {stat.subtitle}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Encouraging Message */}
      {todayCount > 0 && (
        <div className="bg-gradient-to-r from-mint-50 to-teal-50 border border-mint-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-mint-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-medium text-mint-800">
                Luar biasa!
              </p>
              <p className="text-sm sm:text-base text-mint-700 mt-1">
                Anda sudah bergerak {todayCount} kali hari ini. Konsistensi kecil membawa perubahan besar.
              </p>
            </div>
          </div>
        </div>
      )}

      {todayCount === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="text-center space-y-3">
            <TrendingUp className="w-8 h-8 text-gray-400 mx-auto" />
            <div>
              <p className="text-sm sm:text-base text-gray-600">
                Belum ada gerakan hari ini
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Setiap langkah kecil adalah awal yang baik
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}