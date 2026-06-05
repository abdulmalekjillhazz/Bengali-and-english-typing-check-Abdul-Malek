'use client'

/**
 * CountdownTimer — shows remaining time as:
 *   1. A circular SVG progress ring (MM:SS in the centre)
 *   2. A linear progress bar below
 *
 * Color shifts from indigo → amber → red as time runs low.
 */
export default function CountdownTimer({ remaining, total }) {
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const pct = total > 0 ? remaining / total : 1

  // Color: green zone → amber zone → red zone
  const color = pct > 0.5 ? 'var(--accent)' : pct > 0.25 ? '#f59e0b' : '#ef4444'

  // SVG ring math
  const size = 120
  const stroke = 7
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>

      {/* Circular ring with time in centre */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
          {/* Progress arc */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
          />
        </svg>

        {/* Time text centred inside the ring */}
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{
            fontSize: 28,
            fontWeight: 800,
            fontFamily: 'DM Mono, monospace',
            color,
            lineHeight: 1,
            transition: 'color 0.5s',
          }}>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, marginTop: 2 }}>
            remaining
          </div>
        </div>
      </div>

      {/* Linear progress bar */}
      <div style={{ width: '100%', height: 6, background: 'var(--border)', borderRadius: 999 }}>
        <div
          style={{
            height: '100%',
            borderRadius: 999,
            background: color,
            width: `${pct * 100}%`,
            transition: 'width 1s linear, background 0.5s',
          }}
        />
      </div>
    </div>
  )
}
