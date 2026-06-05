'use client'

/**
 * StatisticsCard — a single metric card.
 * Used in both the results dashboard and the statistics section.
 *
 * Props:
 *   label  — short uppercase label shown at top
 *   value  — main number / text shown large
 *   sub    — optional small subtitle below the value
 *   accent — if true, draws a coloured top border and accent-coloured value
 */
export default function StatisticsCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderTop: accent ? '3px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: 16,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transition: 'transform 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <span style={{
        fontSize: 11,
        color: 'var(--muted)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {label}
      </span>

      <span style={{
        fontSize: 28,
        fontWeight: 800,
        color: accent ? 'var(--accent)' : 'var(--text)',
        lineHeight: 1.1,
        fontFamily: 'DM Mono, monospace',
      }}>
        {value}
      </span>

      {sub && (
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</span>
      )}
    </div>
  )
}
