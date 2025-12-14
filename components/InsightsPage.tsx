'use client'

import { useMemo } from 'react'
import { TrendingUp, Calendar, Clock, Target, Award, BarChart3 } from 'lucide-react'

interface Movement {
  id: string
  type: string
  duration: number
  notes: string
  timestamp: Date
}

interface InsightsPageProps {
  movements: Movement[]
}

import { User, Zap, Home, Music, Flower, Play, Sparkles, ArrowUp } from 'lucide-react'

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

export default function InsightsPage({ movements }: InsightsPageProps) {
  const insights = useMemo(() => {
    if (movements.length === 0) return null

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Filter movements by time periods
    const last30Days = movements.filter(m => m.timestamp >= thirtyDaysAgo)
    const last7Days = movements.filter(m => m.timestamp >= sevenDaysAgo)
    const today = movements.filter(m => 
      m.timestamp.toDateString() === now.toDateString()
    )

    // Calculate streaks
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    const checkDate = new Date(now)
    
    // Check current streak
    while (true) {
      const dayMovements = movements.filter(m => 
        m.timestamp.toDateString() === checkDate.toDateString()
      )
      if (dayMovements.length > 0) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    // Calculate longest streak
    const uniqueDates = [...new Set(movements.map(m => m.timestamp.toDateString()))]
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    for (let i = 0; i < uniqueDates.length; i++) {
      tempStreak = 1
      const currentDate = new Date(uniqueDates[i])
      
      for (let j = i + 1; j < uniqueDates.length; j++) {
        const nextDate = new Date(uniqueDates[j])
        const dayDiff = Math.floor((currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (dayDiff === tempStreak) {
          tempStreak++
        } else {
          break
        }
      }
      
      longestStreak = Math.max(longestStreak, tempStreak)
    }

    // Activity type analysis
    const typeStats = movements.reduce((acc, movement) => {
      if (!acc[movement.type]) {
        acc[movement.type] = { count: 0, duration: 0 }
      }
      acc[movement.type].count++
      acc[movement.type].duration += movement.duration
      return acc
    }, {} as { [key: string]: { count: number; duration: number } })

    const favoriteActivity = Object.entries(typeStats)
      .sort(([,a], [,b]) => b.count - a.count)[0]

    // Time analysis
    const hourStats = movements.reduce((acc, movement) => {
      const hour = movement.timestamp.getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    }, {} as { [key: number]: number })

    const peakHour = Object.entries(hourStats)
      .sort(([,a], [,b]) => b - a)[0]

    // Weekly pattern
    const dayStats = movements.reduce((acc, movement) => {
      const day = movement.timestamp.getDay()
      acc[day] = (acc[day] || 0) + 1
      return acc
    }, {} as { [key: number]: number })

    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const mostActiveDay = Object.entries(dayStats)
      .sort(([,a], [,b]) => b - a)[0]

    // Average calculations
    const totalDuration = movements.reduce((sum, m) => sum + m.duration, 0)
    const activeDays = new Set(movements.map(m => m.timestamp.toDateString())).size
    const avgDurationPerDay = activeDays > 0 ? Math.round(totalDuration / activeDays) : 0
    const avgActivitiesPerDay = activeDays > 0 ? Math.round(movements.length / activeDays) : 0

    return {
      currentStreak,
      longestStreak,
      totalActivities: movements.length,
      totalDuration,
      activeDays,
      avgDurationPerDay,
      avgActivitiesPerDay,
      favoriteActivity: favoriteActivity ? {
        type: favoriteActivity[0],
        count: favoriteActivity[1].count,
        duration: favoriteActivity[1].duration
      } : null,
      peakHour: peakHour ? parseInt(peakHour[0]) : null,
      mostActiveDay: mostActiveDay ? parseInt(mostActiveDay[0]) : null,
      last30Days: last30Days.length,
      last7Days: last7Days.length,
      today: today.length,
      typeStats,
      dayNames
    }
  }, [movements])

  if (!insights) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Wawasan</h3>
          <p className="text-gray-600 mb-4">Mulai catat aktivitas untuk melihat wawasan menarik</p>
          <p className="text-sm text-gray-500">
            Setelah beberapa hari mencatat, Anda akan melihat pola dan tren aktivitas Anda
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Award className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Streak Saat Ini</h3>
          </div>
          <p className="text-3xl font-bold mb-1">{insights.currentStreak} hari</p>
          <p className="text-white/80 text-sm">
            {insights.currentStreak > 0 ? 'Pertahankan konsistensi!' : 'Mulai streak baru hari ini'}
          </p>
        </div>

        <div className="bg-gradient-to-r from-energy to-focus rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Target className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Rekor Terbaik</h3>
          </div>
          <p className="text-3xl font-bold mb-1">{insights.longestStreak} hari</p>
          <p className="text-white/80 text-sm">Streak terpanjang Anda</p>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Ringkasan Statistik
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-mint-600">{insights.totalActivities}</p>
            <p className="text-sm text-gray-600">Total Aktivitas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-600">{insights.totalDuration}</p>
            <p className="text-sm text-gray-600">Menit Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-energy">{insights.activeDays}</p>
            <p className="text-sm text-gray-600">Hari Aktif</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-focus">{insights.avgDurationPerDay}</p>
            <p className="text-sm text-gray-600">Rata-rata/Hari</p>
          </div>
        </div>
      </div>

      {/* Favorite Activity */}
      {insights.favoriteActivity && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Aktivitas Favorit
          </h3>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gray-100 rounded-xl">
              {(() => {
                const ActivityIcon = movementLabels[insights.favoriteActivity.type]?.icon || Sparkles
                return <ActivityIcon className={`w-8 h-8 ${movementLabels[insights.favoriteActivity.type]?.color || 'text-gray-500'}`} />
              })()}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                {movementLabels[insights.favoriteActivity.type]?.label || 'Lainnya'}
              </h4>
              <p className="text-gray-600">
                {insights.favoriteActivity.count} kali • {insights.favoriteActivity.duration} menit total
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Rata-rata {Math.round(insights.favoriteActivity.duration / insights.favoriteActivity.count)} menit per sesi
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Time Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Peak Hour */}
        {insights.peakHour !== null && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Jam Paling Aktif
            </h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-mint-600">
                {insights.peakHour.toString().padStart(2, '0')}:00
              </p>
              <p className="text-gray-600 mt-2">
                Anda paling sering bergerak pada jam ini
              </p>
            </div>
          </div>
        )}

        {/* Most Active Day */}
        {insights.mostActiveDay !== null && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Hari Paling Aktif
            </h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">
                {insights.dayNames[insights.mostActiveDay]}
              </p>
              <p className="text-gray-600 mt-2">
                Hari dengan aktivitas terbanyak
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Activity Types Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Distribusi Jenis Aktivitas
        </h3>
        <div className="space-y-3">
          {Object.entries(insights.typeStats)
            .sort(([,a], [,b]) => b.count - a.count)
            .slice(0, 5)
            .map(([type, stats]) => {
              const percentage = Math.round((stats.count / insights.totalActivities) * 100)
              const movementInfo = movementLabels[type] || movementLabels.other
              
              return (
                <div key={type} className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <movementInfo.icon className={`w-5 h-5 ${movementInfo.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{movementInfo.label}</span>
                      <span className="text-sm text-gray-600">{stats.count} kali ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-mint-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-mint-50 to-teal-50 border border-mint-200 rounded-xl p-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-mint-800">
            {insights.currentStreak > 7 ? 'Luar Biasa!' : 
             insights.currentStreak > 3 ? 'Terus Semangat!' : 
             'Anda Bisa Melakukannya!'}
          </h3>
          <p className="text-mint-700">
            {insights.currentStreak > 7 ? 
              'Konsistensi Anda sangat menginspirasi. Pertahankan momentum ini!' :
             insights.currentStreak > 3 ?
              'Anda sudah membangun kebiasaan yang baik. Jangan berhenti sekarang!' :
              'Setiap gerakan kecil adalah langkah menuju perubahan besar. Mulai hari ini!'}
          </p>
        </div>
      </div>
    </div>
  )
}