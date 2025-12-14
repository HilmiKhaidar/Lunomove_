'use client'

import { useState, useMemo } from 'react'
import { Calendar, Clock, Filter, Search, TrendingUp, BarChart3 } from 'lucide-react'

interface Movement {
  id: string
  type: string
  duration: number
  notes: string
  timestamp: Date
}

interface HistoryPageProps {
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

export default function HistoryPage({ movements }: HistoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const filteredMovements = useMemo(() => {
    let filtered = movements

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(m => 
        movementLabels[m.type]?.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.notes.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(m => m.type === selectedType)
    }

    // Filter by date range
    const now = new Date()
    if (dateRange === 'today') {
      filtered = filtered.filter(m => 
        m.timestamp.toDateString() === now.toDateString()
      )
    } else if (dateRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(m => m.timestamp >= weekAgo)
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(m => m.timestamp >= monthAgo)
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }, [movements, searchTerm, selectedType, dateRange])

  const groupedByDate = useMemo(() => {
    const groups: { [key: string]: Movement[] } = {}
    
    filteredMovements.forEach(movement => {
      const dateKey = movement.timestamp.toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(movement)
    })

    return groups
  }, [filteredMovements])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

    if (date.toDateString() === today.toDateString()) {
      return 'Hari Ini'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kemarin'
    } else {
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const totalDuration = filteredMovements.reduce((sum, m) => sum + m.duration, 0)
  const totalActivities = filteredMovements.length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-mint-500" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalActivities}</p>
              <p className="text-sm text-gray-600">Total Aktivitas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-teal-500" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{totalDuration}</p>
              <p className="text-sm text-gray-600">Menit Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari aktivitas atau catatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none"
          >
            <option value="all">Semua Waktu</option>
            <option value="today">Hari Ini</option>
            <option value="week">7 Hari Terakhir</option>
            <option value="month">30 Hari Terakhir</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none"
          >
            <option value="all">Semua Jenis</option>
            {Object.entries(movementLabels).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Tidak ada aktivitas ditemukan</p>
            <p className="text-sm text-gray-500">Coba ubah filter atau tambah aktivitas baru</p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([dateString, dayMovements]) => (
            <div key={dateString} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Date Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{formatDate(dateString)}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{dayMovements.length} aktivitas</span>
                    <span>{dayMovements.reduce((sum, m) => sum + m.duration, 0)} menit</span>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="divide-y divide-gray-100">
                {dayMovements.map((movement) => {
                  const movementInfo = movementLabels[movement.type] || movementLabels.other
                  
                  return (
                    <div key={movement.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <movementInfo.icon className={`w-5 h-5 ${movementInfo.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-800">{movementInfo.label}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{movement.duration} menit</span>
                              <span>•</span>
                              <span>{formatTime(movement.timestamp)}</span>
                            </div>
                          </div>
                          {movement.notes && (
                            <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg">
                              {movement.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}