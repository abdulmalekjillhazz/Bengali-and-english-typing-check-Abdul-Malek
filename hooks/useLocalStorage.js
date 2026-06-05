import { useState, useCallback } from 'react'

/**
 * A useState wrapper that persists the value in localStorage.
 * Reads the saved value on first render; writes on every update.
 *
 * @param {string} key - localStorage key
 * @param {*} defaultValue - value to use if nothing is saved yet
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setStoredValue = useCallback(
    (val) => {
      setValue((prev) => {
        const next = typeof val === 'function' ? val(prev) : val
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {}
        return next
      })
    },
    [key]
  )

  return [value, setStoredValue]
}
