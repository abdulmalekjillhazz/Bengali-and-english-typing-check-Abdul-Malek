'use client'

import dynamic from 'next/dynamic'

// Dynamically import the main app to avoid SSR issues with localStorage
const TypingApp = dynamic(() => import('../components/TypingApp'), { ssr: false })

export default function Page() {
  return <TypingApp />
}
