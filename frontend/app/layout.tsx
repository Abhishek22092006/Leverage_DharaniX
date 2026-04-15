 import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: 'DharaniX - Property Intelligence',
  description: 'Verify property ownership and check encumbrances with instant digital records.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="text-white font-sans antialiased">
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {children}
      </body>
    </html>
  )
}