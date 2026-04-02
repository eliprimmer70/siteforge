import './globals.css'

export const metadata = {
  title: 'SiteForge - AI Website Generator',
  description: 'Build websites faster with AI. Describe what you want, get production-ready code.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
