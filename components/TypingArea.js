'use client'

import { useRef, useEffect } from 'react'

/**
 * TypingArea — main typing interface.
 *
 * নতুন যা যোগ হয়েছে:
 *   - targetText prop: উপরে reference text দেখায় যেটা user টাইপ করবে
 *   - typing করার সময় প্রতিটি অক্ষর correct/incorrect হাইলাইট হয়
 */
export default function TypingArea({ value, onChange, disabled, language, liveStats, targetText }) {
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

  // প্রতিটি character correct না incorrect সেটা বের করি
  const renderTargetText = () => {
    if (!targetText) return null

    return targetText.split('').map((char, i) => {
      let color = 'var(--muted)'       // এখনো টাইপ হয়নি → muted
      if (i < value.length) {
        color = value[i] === char
          ? '#22c55e'   // ✅ সঠিক → সবুজ
          : '#ef4444'   // ❌ ভুল → লাল
      }
      return (
        <span key={i} style={{ color, transition: 'color 0.1s' }}>
          {char}
        </span>
      )
    })
  }

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

      {/* ── Reference text box (টাইপ করার জন্য target) ── */}
      {targetText && (
        <div style={{
          padding: '16px 20px',
          background: 'var(--input-bg)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          fontSize: 18,
          lineHeight: 1.8,
          fontFamily: language === 'বাংলা'
            ? "'Noto Sans Bengali', sans-serif"
            : "'DM Mono', monospace",
          letterSpacing: language === 'বাংলা' ? '0.03em' : '0.02em',
          userSelect: 'none',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            এটি টাইপ করুন
          </p>
          <div>{renderTargetText()}</div>
        </div>
      )}

      {/* Typing textarea */}
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={
          disabled
            ? 'Settings ঠিক করুন এবং Start চাপুন ↓'
            : language === 'বাংলা'
            ? 'এখানে বাংলায় টাইপ করুন...'
            : 'Start typing here...'
        }
        style={{
          width: '100%',
          minHeight: 180,
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
          fontFamily: language === 'বাংলা'
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