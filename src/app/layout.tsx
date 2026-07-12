import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Providers from './providers'
import './styles/normalize.css'
import './styles/fonts.css'
import './styles/variables.css'
import './styles/utils.css'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'To Do List',
  description: 'Simple todo application',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
