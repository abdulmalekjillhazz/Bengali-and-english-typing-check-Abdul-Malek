'use client'

/**
 * Toast — renders a stack of notification toasts in the top-right corner.
 * Each toast auto-dismisses after 3.5s (controlled by useToast).
 * Clicking a toast also dismisses it.
 */
export default function Toast({ toasts, removeToast }) {
  if (!toasts.length) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((t) => {
        const bg =
          t.type === 'success'
            ? '#10b981'
            : t.type === 'error'
            ? '#ef4444'
            : 'var(--card-bg)'
        const color =
          t.type === 'success' || t.type === 'error' ? '#fff' : 'var(--text)'

        return (
          <div
            key={t.id}
            onClick={() => removeToast(t.id)}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              cursor: 'pointer',
              background: bg,
              color,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              border: '1px solid var(--border)',
              fontSize: 14,
              fontWeight: 500,
              animation: 'slideIn 0.3s ease',
              maxWidth: 320,
              pointerEvents: 'all',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {t.icon && <span>{t.icon}</span>}
            {t.message}
          </div>
        )
      })}
    </div>
  )
}
