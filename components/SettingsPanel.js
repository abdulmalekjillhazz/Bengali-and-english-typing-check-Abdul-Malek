'use client'

import Pill from './Pill'

const DURATIONS = [
  { label: '1 min', value: 60 },
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
  { label: '15 min', value: 900 },
]

const TARGET_WPMS = [20, 30, 40, 50, 60]
const LANGUAGES = ['English', 'বাংলা']

const sectionLabel = {
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: 10,
}

const customInput = (active) => ({
  width: 100,
  padding: '7px 12px',
  borderRadius: 999,
  border: '1.5px solid',
  borderColor: active ? 'var(--accent)' : 'var(--border)',
  background: 'var(--input-bg)',
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
})

/**
 * SettingsPanel — lets the user pick:
 *   - Language (English / বাংলা)
 *   - Test duration (preset or custom)
 *   - Target WPM (preset or custom)
 *
 * All inputs are disabled while a test is running.
 */
export default function SettingsPanel({
  lang, setLang,
  duration, setDuration,
  targetWPM, setTargetWPM,
  customDuration, setCustomDuration,
  customTarget, setCustomTarget,
  disabled,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Language selector */}
      <div>
        <label style={sectionLabel}>Language</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LANGUAGES.map((l) => (
            <Pill
              key={l}
              active={lang === l}
              onClick={() => setLang(l)}
              disabled={disabled}
            >
              {l}
            </Pill>
          ))}
        </div>
      </div>

      {/* Duration selector */}
      <div>
        <label style={sectionLabel}>Duration</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {DURATIONS.map((d) => (
            <Pill
              key={d.value}
              active={duration === d.value && !customDuration}
              disabled={disabled}
              onClick={() => { setDuration(d.value); setCustomDuration('') }}
            >
              {d.label}
            </Pill>
          ))}
          <input
            type="number"
            placeholder="Custom (s)"
            min="10"
            max="3600"
            disabled={disabled}
            value={customDuration}
            onChange={(e) => {
              setCustomDuration(e.target.value)
              if (e.target.value) setDuration(Number(e.target.value))
            }}
            style={customInput(!!customDuration)}
          />
        </div>
      </div>

      {/* Target WPM selector */}
      <div>
        <label style={sectionLabel}>Target WPM</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {TARGET_WPMS.map((t) => (
            <Pill
              key={t}
              active={targetWPM === t && !customTarget}
              disabled={disabled}
              onClick={() => { setTargetWPM(t); setCustomTarget('') }}
            >
              {t}
            </Pill>
          ))}
          <input
            type="number"
            placeholder="Custom"
            min="1"
            max="300"
            disabled={disabled}
            value={customTarget}
            onChange={(e) => {
              setCustomTarget(e.target.value)
              if (e.target.value) setTargetWPM(Number(e.target.value))
            }}
            style={customInput(!!customTarget)}
          />
        </div>
      </div>

    </div>
  )
}
