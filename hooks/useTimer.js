import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * A countdown timer hook.
 *
 * @param {number} duration - total seconds to count down from
 * @param {function} onTick - called every second with (remainingSeconds)
 * @param {function} onComplete - called when the timer reaches zero
 *
 * Returns: { remaining, running, start, stop, reset }
 */
export function useTimer(duration, onTick, onComplete) {
  const [remaining, setRemaining] = useState(duration)
  const [running, setRunning] = useState(false)

  // We store remaining in a ref too so the interval can read the latest value
  // without stale closures
  const remainingRef = useRef(duration)
  const intervalRef = useRef(null)

  // Store callbacks in refs so the interval always calls the latest version
  const onTickRef = useRef(onTick)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onTickRef.current = onTick }, [onTick])
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  const start = useCallback(() => {
    setRunning(true)
    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1
      setRemaining(remainingRef.current)

      if (onTickRef.current) onTickRef.current(remainingRef.current)

      if (remainingRef.current <= 0) {
        clearInterval(intervalRef.current)
        setRunning(false)
        if (onCompleteRef.current) onCompleteRef.current()
      }
    }, 1000)
  }, [])

  const stop = useCallback(() => {
    clearInterval(intervalRef.current)
    setRunning(false)
  }, [])

  const reset = useCallback((newDuration) => {
    clearInterval(intervalRef.current)
    setRunning(false)
    const d = newDuration !== undefined ? newDuration : duration
    remainingRef.current = d
    setRemaining(d)
  }, [duration])

  // Clean up interval when component unmounts
  useEffect(() => () => clearInterval(intervalRef.current), [])

  return { remaining, running, start, stop, reset }
}
