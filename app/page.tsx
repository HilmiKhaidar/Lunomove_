'use client'

import { useState, useEffect } from 'react'
import { Activity, Calendar, TrendingUp, Plus, HelpCircle } from 'lucide-react'
import MovementEntry from '@/components/MovementEntry'
import DashboardStats from '@/components/DashboardStats'
import RecentActivities from '@/components/RecentActivities'
import HistoryPage from '@/components/HistoryPage'
import InsightsPage from '@/components/InsightsPage'
import HelpPage from '@/components/HelpPage'
import LoadingAnimation from '@/components/LoadingAnimation'
import Logo from '@/components/Logo'
import DesktopNavigation from '@/components/DesktopNavigation'
import Toast from '@/components/Toast'
import InstallPrompt from '@/components/InstallPrompt'

interface Movement {
  id: string
  type: string
  duration: number
  notes: string
  timestamp: Date
}

export default function Home() {
  const [movements, setMovements] = useState<Movement[]>([])
  const [showEntry, setShowEntry] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    // Load movements from localStorage
    const saved = localStorage.getItem('lunomove-movements')
    if (saved) {
      const parsed = JSON.parse(saved)
      setMovements(parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })))
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />
  }

  const saveMovement = (movement: Omit<Movement, 'id' | 'timestamp'>) => {
    const newMovement: Movement = {
      ...movement,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    
    const updated = [newMovement, ...movements]
    setMovements(updated)
    localStorage.setItem('lunomove-movements', JSON.stringify(updated))
    setShowEntry(false)
    
    // Show success toast
    setToast({
      message: 'Gerakan berhasil dicatat! 🎉',
      type: 'success'
    })
  }

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'history':
        return <HistoryPage movements={movements} />
      case 'insights':
        return <InsightsPage movements={movements} />
      case 'help':
        return <HelpPage />
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Welcome & Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Welcome Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-center lg:text-left space-y-2">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Selamat datang kembali
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">{today}</p>
                  <p className="text-sm sm:text-base text-gray-500 mt-3">
                    Bagaimana gerakan Anda hari ini?
                  </p>
                </div>
              </div>

              {/* Quick Add Button */}
              <button
                onClick={() => setShowEntry(true)}
                className="w-full bg-gradient-to-r from-mint-500 to-teal-500 hover:from-mint-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Catat Gerakan</span>
              </button>

              {/* Tagline - Hidden on mobile, shown on larger screens */}
              <div className="hidden sm:block text-center lg:text-left py-4">
                <p className="text-sm text-gray-400 italic">
                  "Kesadaran gerakan dalam setiap hari"
                </p>
              </div>
            </div>

            {/* Middle Column - Dashboard Stats */}
            <div className="lg:col-span-1">
              <DashboardStats movements={movements} />
            </div>

            {/* Right Column - Recent Activities */}
            <div className="lg:col-span-1">
              <RecentActivities movements={movements} />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showText={true} />
            <div className="hidden sm:flex items-center space-x-6">
              <span className="text-sm text-gray-600">Kesadaran gerakan dalam setiap hari</span>
              <button
                onClick={() => setCurrentPage('help')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Bantuan"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <button
              onClick={() => setCurrentPage('help')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors sm:hidden"
              title="Bantuan"
            >
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <DesktopNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-fadeInUp">
          {renderCurrentPage()}
        </div>

        {/* Mobile Tagline - Only show on home page */}
        {currentPage === 'home' && (
          <div className="sm:hidden text-center py-4 mt-6">
            <p className="text-sm text-gray-400 italic">
              "Kesadaran gerakan dalam setiap hari"
            </p>
          </div>
        )}
      </main>

      {/* Movement Entry Modal */}
      {showEntry && (
        <MovementEntry
          onSave={saveMovement}
          onClose={() => setShowEntry(false)}
        />
      )}

      {/* Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-pb z-30">
        <div className="px-4 py-2">
          <div className="flex justify-around">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center py-2 px-3 min-w-0 transition-colors ${
                currentPage === 'home' ? 'text-mint-500' : 'text-gray-400'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="text-xs mt-1 font-medium truncate">Beranda</span>
            </button>
            <button 
              onClick={() => setCurrentPage('history')}
              className={`flex flex-col items-center py-2 px-3 min-w-0 transition-colors ${
                currentPage === 'history' ? 'text-mint-500' : 'text-gray-400'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs mt-1 truncate">Riwayat</span>
            </button>
            <button 
              onClick={() => setCurrentPage('insights')}
              className={`flex flex-col items-center py-2 px-3 min-w-0 transition-colors ${
                currentPage === 'insights' ? 'text-mint-500' : 'text-gray-400'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs mt-1 truncate">Wawasan</span>
            </button>
            <button 
              onClick={() => setCurrentPage('help')}
              className={`flex flex-col items-center py-2 px-3 min-w-0 transition-colors ${
                currentPage === 'help' ? 'text-mint-500' : 'text-gray-400'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs mt-1 truncate">Bantuan</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding for navigation - Mobile Only */}
      <div className="h-20 lg:hidden"></div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  )
}