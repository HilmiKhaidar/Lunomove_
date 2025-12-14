'use client'

import { useState } from 'react'
import { X, Clock, MessageSquare, User, Zap, Home, Music, Flower, Play, Sparkles, ArrowUp } from 'lucide-react'

interface MovementEntryProps {
  onSave: (movement: { type: string; duration: number; notes: string }) => void
  onClose: () => void
}

const movementTypes = [
  { id: 'walking', label: 'Berjalan', icon: User, color: 'text-blue-500' },
  { id: 'stretching', label: 'Peregangan', icon: Zap, color: 'text-purple-500' },
  { id: 'stairs', label: 'Naik Tangga', icon: ArrowUp, color: 'text-orange-500' },
  { id: 'housework', label: 'Pekerjaan Rumah', icon: Home, color: 'text-green-500' },
  { id: 'dancing', label: 'Menari', icon: Music, color: 'text-pink-500' },
  { id: 'gardening', label: 'Berkebun', icon: Flower, color: 'text-emerald-500' },
  { id: 'playing', label: 'Bermain', icon: Play, color: 'text-red-500' },
  { id: 'other', label: 'Lainnya', icon: Sparkles, color: 'text-gray-500' }
]

export default function MovementEntry({ onSave, onClose }: MovementEntryProps) {
  const [selectedType, setSelectedType] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !duration) return

    onSave({
      type: selectedType,
      duration: parseInt(duration),
      notes: notes.trim()
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-brand w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Catat Gerakan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div className="text-center space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base text-gray-600">
              Jenis gerakan apa yang Anda lakukan?
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Setiap gerakan adalah langkah menuju kesadaran diri
            </p>
          </div>

          {/* Movement Type Selection */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
              Jenis Gerakan
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {movementTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    selectedType === type.id
                      ? 'border-mint-500 bg-mint-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50 ${selectedType === type.id ? 'bg-white' : ''}`}>
                      <type.icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      {type.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" />
              Durasi (menit)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Berapa lama Anda bergerak?"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none transition-colors text-sm sm:text-base"
              min="1"
              max="480"
              required
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Tidak perlu tepat, perkiraan saja sudah cukup
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" />
              Catatan (opsional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Bagaimana perasaan Anda? Ada yang ingin dicatat?"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500 outline-none transition-colors resize-none text-sm sm:text-base"
              rows={4}
              maxLength={200}
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {notes.length}/200 karakter
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedType || !duration}
            className="w-full bg-mint-500 hover:bg-mint-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-4 rounded-lg transition-colors text-base sm:text-lg"
          >
            Simpan Gerakan
          </button>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Setiap gerakan adalah langkah menuju kesadaran diri
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}