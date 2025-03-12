import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import ChatBot from './components/ChatBot'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Travel AI - Intelligent Travel Assistant',
  description: 'Experience the future of travel with AI-powered assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans relative`}>
        <Navbar />
        {children}
        <ChatBot />
      </body>
    </html>
  )
} 