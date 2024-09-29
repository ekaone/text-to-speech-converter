import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { PHProvider } from './providers'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <PHProvider>
          <body
            className={cn(
              'min-h-screen bg-background font-sans antialiased',
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              themes={['light', 'dark', 'orange', 'rose', 'green', 'blue']}
            >
              <div className='relative flex min-h-screen flex-col'>
                <SiteHeader />
                <div className='flex-1'>{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
            <GoogleAnalytics gaId='G-PVY8F2TSGL' />
          </body>
        </PHProvider>
      </html>
    </>
  )
}