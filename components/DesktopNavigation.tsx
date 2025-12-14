'use client'

import { Activity, Calendar, TrendingUp, HelpCircle } from 'lucide-react'

interface DesktopNavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function DesktopNavigation({ currentPage, onPageChange }: DesktopNavigationProps) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Activity },
    { id: 'history', label: 'Riwayat', icon: Calendar },
    { id: 'insights', label: 'Wawasan', icon: TrendingUp },
    { id: 'help', label: 'Bantuan', icon: HelpCircle },
  ]

  return (
    <nav className="hidden lg:flex bg-white shadow-sm border border-gray-100 rounded-xl p-2 space-x-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onPageChange(item.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentPage === item.id
              ? 'bg-mint-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}