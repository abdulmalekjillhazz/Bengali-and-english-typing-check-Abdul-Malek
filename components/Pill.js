'use client'

/**
 * Pill — a rounded toggle button used in the settings panel.
 * Shows as accent-coloured when active, transparent otherwise.
 */
export default function Pill({ children, active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 18px',
        borderRadius: 999,
        border: '1.5px solid',
        borderColor: active ? 'var(--accent)' : 'var(--border)',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : 'var(--text)',
        fontWeight: 600,
        fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.18s',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  )
}
