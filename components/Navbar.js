'use client'

import { useState } from 'react'

/**
 * Navbar — sticky top bar with logo, keyboard shortcut hints,
 * fullscreen toggle, and dark mode toggle.
 */
export default function Navbar({ dark, setDark }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  const kbd = {
    background: 'var(--border)',
    padding: '2px 7px',
    borderRadius: 5,
    fontSize: 11,
    fontFamily: 'DM Mono, monospace',
    color: 'var(--text)',
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>⌨️</span>
        <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)' }}>
          Typing Speed{' '}
          <span style={{ color: 'var(--accent)' }}>Tracker Pro</span>
        </span>
      </div>

      {/* Right side controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {/* Keyboard shortcut hints — hidden on small screens */}
        <div
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
          className="hidden sm:flex"
        >
          <span>
            <kbd style={kbd}>Ctrl+Enter</kbd> Start
          </span>
          <span>
            <kbd style={kbd}>Esc</kbd> Stop
          </span>
        </div>

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          style={iconBtn}
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={iconBtn}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

const iconBtn = {
  background: 'none',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '6px 10px',
  cursor: 'pointer',
  fontSize: 16,
  color: 'var(--text)',
  lineHeight: 1,
}
