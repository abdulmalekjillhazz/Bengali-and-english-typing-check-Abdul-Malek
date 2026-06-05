import { useState, useCallback } from 'react'

let nextId = 0

/**
 * A simple toast notification system.
 * Returns { toasts, add, remove }
 *
 * Usage:
 *   const { toasts, add, remove } = useToast()
 *   add("Test started!", "success", "✅")
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type = 'info', icon = '') => {
    const id = ++nextId
    setToasts((prev) => [...prev, { id, message, type, icon }])
    // Auto-remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, add, remove }
}
