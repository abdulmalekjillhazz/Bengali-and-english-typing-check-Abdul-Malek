import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

/**
 * Manages dark mode.
 * - Reads preference from localStorage on mount
 * - Applies/removes the "dark" class on <html>
 * - Persists the preference whenever it changes
 */
export function useDarkMode() {
  const [dark, setDark] = useLocalStorage('tst_dark_mode', false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return [dark, setDark]
}
