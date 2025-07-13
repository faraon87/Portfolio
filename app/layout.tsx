import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ahmed Said - Engineering Portfolio',
  description: 'Multi-domain engineering expert with 20+ years experience across Tesla, Rivian, Fisker, Iridium, and Verizon. $6.2M+ in documented savings.',
  keywords: ['Engineering', 'Tesla', 'Rivian', 'Fisker', 'Portfolio', 'Diagnostics', 'Automotive'],
  authors: [{ name: 'Ahmed Said' }],
  creator: 'Ahmed Said',
  openGraph: {
    title: 'Ahmed Said - Engineering Portfolio',
    description: 'Multi-domain engineering expert with $6.2M+ in documented savings',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
