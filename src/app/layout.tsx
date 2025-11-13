import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import { ChatWidget } from '@/components/chat/ChatWidget';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartWork 360',
  description: 'Government Productivity Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
