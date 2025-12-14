'use client'

import { useState } from 'react'
import { X, Heart, Brain, Zap, Moon, AlertCircle } from 'lucide-react'

interface CheckInData {
  energy: number
  mood: number
  focus: number
  sleep: number
  stress: number
  notes: string
}

interface CheckInEntryProps {
  onSave: (checkIn: CheckInData) => void
  onClose: () => void
}

export default function CheckInEntry({ onSave, onClose }: CheckInEntryProps) {
  const [checkIn, setCheckIn] = useState<CheckInData>({
    energy: 3,
    mood: 3,
    focus: 3,
    sleep: 3,
    stress: 3,
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(checkIn)
  }

  const ScaleInput = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    color,
    lowLabel,
    highLabel 
  }: {
    label: string
    value: number
    onChange: (value: number) => void
    icon: any
    color: string
    lowLabel: string
    highLabel: string
  }) => (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
        <label className="text-sm sm:text-base font-medium text-gray-700">{label}</label>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs sm:text-sm text-gray-500">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
        
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={`h-12 sm:h-14 rounded-lg border-2 transition-all ${
                value === num
                  ? `${color.replace('text-', 'border-')} ${color.replace('text-', 'bg-')}/10`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`text-sm sm:text-base font-medium ${
                value === num ? color : 'text-gray-600'
              }`}>
                {num}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-brand w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Check-in Harian</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base text-gray-600">
              Bagaimana perasaan Anda hari ini?
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Tidak ada jawaban yang salah dalam refleksi diri
            </p>
          </div>

          <ScaleInput
            label="Tingkat Energi"
            value={checkIn.energy}
            onChange={(value) => setCheckIn(prev => ({ ...prev, energy: value }))}
            icon={Zap}
            color="text-energy"
            lowLabel="Sangat lelah"
            highLabel="Sangat berenergi"
          />

          <ScaleInput
            label="Suasana Hati"
            value={checkIn.mood}
            onChange={(value) => setCheckIn(prev => ({ ...prev, mood: value }))}
            icon={Heart}
            color="text-mood"
            lowLabel="Kurang baik"
            highLabel="Sangat baik"
          />

          <ScaleInput
            label="Tingkat Fokus"
            value={checkIn.focus}
            onChange={(value) => setCheckIn(prev => ({ ...prev, focus: value }))}
            icon={Brain}
            color="text-focus"
            lowLabel="Sulit fokus"
            highLabel="Sangat fokus"
          />

          <ScaleInput
            label="Kualitas Tidur"
            value={checkIn.sleep}
            onChange={(value) => setCheckIn(prev => ({ ...prev, sleep: value }))}
            icon={Moon}
            color="text-sleep"
            lowLabel="Kurang nyenyak"
            highLabel="Sangat nyenyak"
          />

          <ScaleInput
            label="Tingkat Stres"
            value={checkIn.stress}
            onChange={(value) => setCheckIn(prev => ({ ...prev, stress: value }))}
            icon={AlertCircle}
            color="text-orange-500"
            lowLabel="Sangat stres"
            highLabel="Sangat tenang"
          />

          {/* Notes */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-sm sm:text-base font-medium text-gray-700">
              Catatan (Opsional)
            </label>
            <textarea
              value={checkIn.notes}
              onChange={(e) => setCheckIn(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Apa yang Anda rasakan dalam tubuh Anda hari ini?"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500 resize-none text-sm sm:text-base"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-mint-500 hover:bg-mint-600 text-white font-semibold py-3 sm:py-4 px-4 rounded-lg transition-colors text-base sm:text-lg"
          >
            Simpan Refleksi
          </button>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Terima kasih sudah meluangkan waktu untuk diri sendiri
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}