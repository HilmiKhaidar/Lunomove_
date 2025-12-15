import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lunomove.vercel.app'),
  title: 'Lunomove - Kesadaran gerakan dalam setiap hari',
  description: 'Daily movement awareness made simple. Aplikasi untuk membangun kesadaran terhadap aktivitas fisik dalam kehidupan sehari-hari.',
  applicationName: 'Lunomove',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lunomove'
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192x192.png'
  },
  openGraph: {
    title: 'Lunomove - Kesadaran gerakan dalam setiap hari',
    description: 'Daily movement awareness made simple. Aplikasi untuk membangun kesadaran terhadap aktivitas fisik dalam kehidupan sehari-hari.',
    url: 'https://lunomove.vercel.app',
    siteName: 'Lunomove',
    images: [
      {
        url: '/icon-192x192.png',
        width: 192,
        height: 192,
        alt: 'Lunomove Logo'
      }
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lunomove - Kesadaran gerakan dalam setiap hari',
    description: 'Daily movement awareness made simple. Aplikasi untuk membangun kesadaran terhadap aktivitas fisik dalam kehidupan sehari-hari.',
    images: ['/icon-192x192.png'],
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#10B981'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lunomove" />
        <meta name="msapplication-TileColor" content="#10B981" />
        <meta name="theme-color" content="#10B981" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}