import type { Metadata } from 'next'
import { Caveat, Work_Sans } from 'next/font/google'
import './globals.css'

const scratchFallback = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-scratch'
})

const body = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: 'PretoÁ — Mais que moda, um movimento',
  description: 'PretoÁ transforma jeans descartado em peças autorais e sustentáveis. Design, upcycling e atitude por Mickael Ramos.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${scratchFallback.variable} ${body.variable} font-body bg-denim-950 text-bone antialiased`}>
        {children}
      </body>
    </html>
  )
}
