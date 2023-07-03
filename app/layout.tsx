import './globals.css'
import { Inter } from 'next/font/google'
import AuthContextProvider from "@/AuthContext"

import Script from 'next/script'

const inter = Inter({ subsets: ['greek'] })

export const metadata = {
  title: 'Crear',
  description: 'Collaboration Platform For Creatives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0908] text-white`}>
      <AuthContextProvider>{children}</AuthContextProvider>  
      <Script src="https://kit.fontawesome.com/989b026094.js" crossOrigin="anonymous"></Script>
      </body>
    </html>
  )
}
