import './globals.css'

export const metadata = {
  title: 'Typing Speed Tracker Pro',
  description: 'Track your typing speed in English and Bengali',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
