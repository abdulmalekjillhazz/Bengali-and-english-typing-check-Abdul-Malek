'use client'

import { useRef, useEffect } from 'react'

/**
 * TypingArea — the main typing interface.
 *
 * Shows:
 *   - A 4-stat live bar (words / chars / WPM / CPM)
 *   - A large textarea (disabled before start and after end)
 *
 * Auto-focuses the textarea when the test starts (disabled becomes false).
 */
export default function TypingArea({ value, onChange, disabled, language, liveStats }) {
  const ref = useRef(null)

  // Auto-focus when the test starts
  useEffect(() => {
    if (!disabled && ref.current) {
      ref.current.focus()
    }
  }, [disabled])

  const stats = [
    { label: 'Words',  value: liveStats.words, accent: false },
    { label: 'Chars',  value: liveStats.chars, accent: false },
    { label: 'WPM',    value: liveStats.wpm,   accent: true  },
    { label: 'CPM',    value: liveStats.cpm,   accent: false },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Live stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: 'var(--card-bg)',
              border: `1px solid ${s.accent ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 12,
              padding: '10px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: 22,
              fontWeight: 800,
              color: s.accent ? 'var(--accent)' : 'var(--text)',
              fontFamily: 'DM Mono, monospace',
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: 11,
              color: 'var(--muted)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginTop: 2,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Typing textarea */}
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={
          disabled
            ? 'Configure settings and press Start ↓'
            : language === 'বাংলা'
            ? 'এখানে বাংলায় টাইপ করুন...'
            : 'Start typing here...'
        }
        style={{
          width: '100%',
          minHeight: 220,
          padding: '18px 20px',
          background: 'var(--input-bg)',
          border: '2px solid',
          borderColor: disabled ? 'var(--border)' : 'var(--accent)',
          borderRadius: 16,
          color: 'var(--text)',
          fontSize: 18,
          lineHeight: 1.7,
          resize: 'vertical',
          outline: 'none',
          fontFamily:
            language === 'বাংলা'
              ? "'Noto Sans Bengali', sans-serif"
              : "'DM Mono', monospace",
          transition: 'border-color 0.2s, opacity 0.2s',
          opacity: disabled ? 0.5 : 1,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}
