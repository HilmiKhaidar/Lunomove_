'use client'

import { useState } from 'react'
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronRight,
  Book,
  Target,
  Heart,
  Shield,
  Users
} from 'lucide-react'

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Apa itu Lunomove?",
      answer: "Lunomove adalah aplikasi untuk membangun kesadaran terhadap aktivitas fisik dalam kehidupan sehari-hari. Aplikasi ini membantu Anda mencatat dan memantau gerakan harian dengan cara yang sederhana dan menyenangkan."
    },
    {
      question: "Bagaimana cara mencatat aktivitas?",
      answer: "Klik tombol 'Catat Gerakan' di halaman utama, pilih jenis aktivitas yang Anda lakukan, masukkan durasi, dan tambahkan catatan jika diperlukan. Setiap gerakan, sekecil apapun, berharga untuk dicatat."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Ya, semua data Anda disimpan secara lokal di perangkat Anda. Kami tidak mengumpulkan atau menyimpan data pribadi Anda di server eksternal. Privasi Anda adalah prioritas utama kami."
    },
    {
      question: "Berapa lama aktivitas yang harus dicatat?",
      answer: "Tidak ada durasi minimum. Bahkan aktivitas 1-2 menit seperti berdiri, peregangan ringan, atau berjalan ke dapur tetap berharga untuk dicatat. Yang penting adalah membangun kesadaran terhadap gerakan."
    },
    {
      question: "Bagaimana cara melihat progress saya?",
      answer: "Anda dapat melihat ringkasan harian di dashboard utama, riwayat lengkap di tab 'Riwayat', dan analisis mendalam di tab 'Wawasan' yang menunjukkan pola dan tren aktivitas Anda."
    },
    {
      question: "Apa itu streak dan mengapa penting?",
      answer: "Streak adalah jumlah hari berturut-turut Anda mencatat aktivitas. Ini membantu membangun kebiasaan konsisten. Ingat, yang penting bukan durasi aktivitas, tapi konsistensi mencatat setiap hari."
    },
    {
      question: "Bisakah saya menggunakan aplikasi ini offline?",
      answer: "Ya! Lunomove adalah Progressive Web App (PWA) yang dapat digunakan offline. Anda bisa menginstalnya di perangkat dan menggunakannya tanpa koneksi internet."
    },
    {
      question: "Bagaimana cara menginstal aplikasi di ponsel?",
      answer: "Buka Lunomove di browser, lalu cari opsi 'Tambah ke Layar Utama' atau 'Install App' di menu browser. Setelah diinstal, aplikasi akan berfungsi seperti aplikasi native."
    }
  ]

  const features = [
    {
      icon: Target,
      title: "Pencatatan Mudah",
      description: "Catat aktivitas dalam hitungan detik dengan antarmuka yang intuitif"
    },
    {
      icon: Heart,
      title: "Fokus Kesadaran",
      description: "Membangun kesadaran terhadap gerakan, bukan obsesi terhadap angka"
    },
    {
      icon: Shield,
      title: "Privasi Terjamin",
      description: "Data tersimpan lokal di perangkat Anda, tidak ada yang dikirim ke server"
    },
    {
      icon: Users,
      title: "Untuk Semua",
      description: "Cocok untuk segala usia dan tingkat aktivitas fisik"
    }
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-mint-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pusat Bantuan</h1>
          <p className="text-gray-600">
            Temukan jawaban untuk pertanyaan Anda tentang Lunomove
          </p>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Book className="w-5 h-5 mr-2" />
          Panduan Cepat
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-mint-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</div>
            <div>
              <h3 className="font-medium text-gray-800">Mulai Mencatat</h3>
              <p className="text-sm text-gray-600">Klik "Catat Gerakan" dan pilih aktivitas yang baru saja Anda lakukan</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-mint-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</div>
            <div>
              <h3 className="font-medium text-gray-800">Lihat Progress</h3>
              <p className="text-sm text-gray-600">Pantau ringkasan harian dan bangun streak konsistensi</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-mint-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</div>
            <div>
              <h3 className="font-medium text-gray-800">Analisis Pola</h3>
              <p className="text-sm text-gray-600">Gunakan tab "Wawasan" untuk memahami pola aktivitas Anda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
              <feature.icon className="w-6 h-6 text-mint-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pertanyaan Umum</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-mint-50 to-teal-50 border border-mint-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-mint-800 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Butuh Bantuan Lebih Lanjut?
        </h2>
        <p className="text-mint-700 mb-4">
          Tim Lunetix siap membantu Anda. Hubungi kami melalui:
        </p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-mint-600" />
            <span className="text-mint-800">support@lunetix.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-mint-600" />
            <span className="text-mint-800">Chat langsung di aplikasi (segera hadir)</span>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tentang Lunomove</h2>
        <p className="text-gray-600 mb-4">
          Dikembangkan dengan ❤️ oleh tim Lunetix untuk membantu Anda membangun kesadaran gerakan dalam kehidupan sehari-hari.
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Versi 1.0.0</p>
          <p>© 2024 Lunetix. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  )
}