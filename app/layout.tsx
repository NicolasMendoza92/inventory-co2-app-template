import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/hooks/ThemeProvider'
import { LanguageProvider } from '@/hooks/LanguageProvider'
import Header from '@/components/header/Header'
import Footer from '@/components/Footer'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 dark:text-green-50 transition-colors duration-200">
        <Toaster />
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow mt-16">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
